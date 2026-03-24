// scripts/upload-knowledge.ts
import { createClient } from '@supabase/supabase-js'
import 'dotenv/config'

// 1. Initialisation de Supabase (utilise tes variables .env.local)
const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Remplace ceci par le texte de tes guides officiels (LACI, Directives, etc.)
const KNOWLEDGE_DATA = [
  // --- PILIER 1 : LA CAISSE (ARGENT) ---
  {
    category: 'CAISSE',
    content: "Le montant de l'indemnité journalière représente 80% du gain assuré si l'assuré a des obligations d'entretien envers des enfants de moins de 25 ans, si son gain assuré n'excède pas 3797 CHF, ou s'il est invalide à 40%. Dans les autres cas, l'indemnité est de 70%.",
    source: 'LACI Art. 22'
  },
  {
    category: 'CAISSE',
    content: "Le gain assuré maximum pris en compte par la caisse de chômage est de 12'350 CHF par mois (148'200 CHF par an). Les revenus au-delà de ce plafond ne sont pas couverts par l'assurance-chômage obligatoire.",
    source: 'LACI Art. 18'
  },
  {
    category: 'CAISSE',
    content: "Le délai d'attente général avant de percevoir des indemnités dépend du gain assuré : 0 jour si le gain est < 3000 CHF, 5 jours entre 3001 et 5000 CHF, 10 jours entre 5001 et 7500 CHF, 15 jours entre 7501 et 10000 CHF, et 20 jours au-delà de 10000 CHF.",
    source: 'LACI Art. 18 al. 1'
  },

  // --- PILIER 2 : L'ORP (CONSEIL & DEVOIRS) ---
  {
    category: 'ORP',
    content: "L'assuré doit prouver qu'il a fait des recherches d'emploi durant le délai de congé (avant le chômage). Le nombre habituel de recherches demandées par les conseillers ORP se situe entre 8 et 12 par mois, de manière ciblée et variée.",
    source: 'Directives SECO / MMT'
  },
  {
    category: 'ORP',
    content: "Le refus d'un emploi réputé 'convenable' peut entraîner une suspension du droit aux indemnités (jours-amendes). Un emploi est jugé convenable s'il respecte les conditions de travail usuelles et ne compromet pas la santé de l'assuré.",
    source: 'LACI Art. 16'
  },

  // --- PILIER 3 : LE SOCIAL (AIDE SUBSIDIAIRE) ---
  {
    category: 'SOCIAL',
    content: "L'aide sociale (Hospice Général ou CSR) intervient uniquement lorsque toutes les autres prestations (chômage LACI, fortune personnelle, aide de la famille proche) sont épuisées. C'est une prestation dite subsidiaire qui garantit le minimum vital selon les normes COSAS.",
    source: 'Normes COSAS / Aide Sociale'
  },
  {
    category: 'SOCIAL',
    content: "En cas de fin de droit au chômage (après 400 ou 520 indemnités), l'assuré doit déposer une demande d'aide sociale au moins un mois avant la fin de ses indemnités pour éviter une rupture de revenu.",
    source: 'Procédure Fin de Droit Suisse'
  }
];
async function uploadKnowledge() {
  console.log("🚀 Début de l'importation du savoir suisse...");

  for (const item of KNOWLEDGE_DATA) {
    // Note : Normalement on génère un 'embedding' ici via l'API OpenAI.
    // Pour ce test, nous insérons le contenu. Cursor t'aidera à ajouter l'étape 'embedding' OpenAI.
    const { error } = await supabase
      .from('documents')
      .insert([
        { 
          content: item.content, 
          category: item.category, 
          metadata: { source: item.source } 
        }
      ]);

    if (error) {
      console.error(`❌ Erreur pour ${item.category}:`, error.message);
    } else {
      console.log(`✅ Ajouté : [${item.category}] - ${item.source}`);
    }
  }
  console.log("✨ Importation terminée !");
}

uploadKnowledge();