import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import { pipeline } from '@xenova/transformers'

// Charger .env.local explicitement
config({ path: resolve(process.cwd(), '.env.local') })

// ── Configuration ───────────────────────────────────────────────────
const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables manquantes dans .env.local :')
  if (!supabaseUrl) console.error('   - VITE_SUPABASE_URL')
  if (!supabaseKey) console.error('   - VITE_SUPABASE_PUBLISHABLE_KEY')
  process.exit(1)
}

console.log('✅ Variables chargées OK')

const supabase = createClient(supabaseUrl, supabaseKey)

// ── Données à indexer ───────────────────────────────────────────────
const KNOWLEDGE_DATA = [
  {
    category: 'CAISSE',
    content: "Le montant de l'indemnité journalière représente 80% du gain assuré si l'assuré a des obligations d'entretien envers des enfants de moins de 25 ans, si son gain assuré n'excède pas 3797 CHF, ou s'il est invalide à 40%. Dans les autres cas, l'indemnité est de 70%.",
    source: 'LACI Art. 22'
  },
  {
    category: 'CAISSE',
    content: "Le gain assuré maximum pris en compte par la caisse de chômage est de 12350 CHF par mois (148200 CHF par an). Les revenus au-delà de ce plafond ne sont pas couverts par l'assurance-chômage obligatoire.",
    source: 'LACI Art. 18'
  },
  {
    category: 'CAISSE',
    content: "Le délai d'attente général avant de percevoir des indemnités dépend du gain assuré : 0 jour si le gain est inférieur à 3000 CHF, 5 jours entre 3001 et 5000 CHF, 10 jours entre 5001 et 7500 CHF, 15 jours entre 7501 et 10000 CHF, et 20 jours au-delà de 10000 CHF.",
    source: 'LACI Art. 18 al. 1'
  },
  {
    category: 'ORP',
    content: "L'assuré doit prouver qu'il a fait des recherches d'emploi durant le délai de congé (avant le chômage). Le nombre habituel de recherches demandées par les conseillers ORP se situe entre 8 et 12 par mois, de manière ciblée et variée.",
    source: 'Directives SECO / MMT'
  },
  {
    category: 'ORP',
    content: "Le refus d'un emploi réputé convenable peut entraîner une suspension du droit aux indemnités (jours-amendes). Un emploi est jugé convenable s'il respecte les conditions de travail usuelles et ne compromet pas la santé de l'assuré.",
    source: 'LACI Art. 16'
  },
  {
    category: 'ORP',
    content: "Pour s'inscrire au chômage à Genève, il faut se présenter à l'ORP de son lieu de domicile muni d'une pièce d'identité, du certificat de travail, des fiches de salaire des 6 derniers mois et du formulaire IPA rempli.",
    source: 'OCE Genève'
  },
  {
    category: 'SOCIAL',
    content: "L'aide sociale (Hospice Général ou CSR) intervient uniquement lorsque toutes les autres prestations (chômage LACI, fortune personnelle, aide de la famille proche) sont épuisées. C'est une prestation dite subsidiaire qui garantit le minimum vital selon les normes COSAS.",
    source: 'Normes COSAS / Aide Sociale'
  },
  {
    category: 'SOCIAL',
    content: "En cas de fin de droit au chômage (après 400 ou 520 indemnités), l'assuré doit déposer une demande d'aide sociale au moins un mois avant la fin de ses indemnités pour éviter une rupture de revenu.",
    source: 'Procédure Fin de Droit Suisse'
  },
  {
    category: 'CAISSE',
    content: "Le délai-cadre d'indemnisation est de 2 ans. Pour en bénéficier, il faut avoir cotisé au moins 12 mois durant les 2 ans précédant l'inscription au chômage.",
    source: 'LACI Art. 9'
  },
]

// ── Embeddings locaux (gratuit, sans API) ───────────────────────────
// Modèle local 768D (compatible avec une colonne pgvector en 768 dimensions).
// Téléchargé une seule fois puis mis en cache local.
const LOCAL_EMBED_MODEL = process.env.LOCAL_EMBED_MODEL || 'Xenova/all-mpnet-base-v2'
const EXPECTED_EMBED_DIM = Number(process.env.EXPECTED_EMBED_DIM || 768)

let embedderPromise = null
async function getEmbedder() {
  if (!embedderPromise) {
    embedderPromise = pipeline('feature-extraction', LOCAL_EMBED_MODEL)
  }
  return embedderPromise
}

function toVectorString(values) {
  // Supabase/pgvector est souvent exposé comme string côté JS (cf. types.ts).
  // On encode en "[...]" pour que Postgres puisse le caster en vector.
  return `[${values.join(',')}]`
}

async function generateEmbedding(text) {
  const embedder = await getEmbedder()
  // output: Tensor-like. We request pooled embedding + normalization for cosine similarity.
  const out = await embedder(text, { pooling: 'mean', normalize: true })

  // `out.data` is typically a Float32Array.
  const arr = Array.from(out.data, (x) => Number(x))
  if (arr.length !== EXPECTED_EMBED_DIM) {
    throw new Error(
      `Embedding dimension mismatch: got ${arr.length}, expected ${EXPECTED_EMBED_DIM}. ` +
      `Model used: ${LOCAL_EMBED_MODEL}`
    )
  }
  return toVectorString(arr)
}

// ── Upload principal ────────────────────────────────────────────────
async function uploadKnowledge() {
  console.log('🚀 Début de l\'importation...\n')
  console.log(`   Supabase: ${supabaseUrl}`)
  console.log(`   Documents à indexer: ${KNOWLEDGE_DATA.length}\n`)
  console.log(`   Embeddings (local): ${LOCAL_EMBED_MODEL}\n`)
  console.log(`   Dimension attendue: ${EXPECTED_EMBED_DIM}\n`)

  let success = 0
  let errors = 0

  for (const item of KNOWLEDGE_DATA) {
    try {
      process.stdout.write(`⏳ [${item.category}] ${item.source}... `)
      const embedding = await generateEmbedding(item.content)

      const { error } = await supabase
        .from('documents')
        .insert({
          content: item.content,
          category: item.category,
          metadata: { source: item.source },
          embedding: embedding,
        })

      if (error) {
        console.log(`❌ ${error.message}`)
        errors++
      } else {
        console.log('✅')
        success++
      }

    } catch (err) {
      const message = err instanceof Error ? err.message : JSON.stringify(err)
      console.log(`❌ ${message}`)
      errors++
    }
  }

  console.log(`\n✨ Terminé ! ${success} ajoutés, ${errors} erreurs.`)
}

uploadKnowledge()
