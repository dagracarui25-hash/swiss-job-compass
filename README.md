## Swiss Job Compass

### Prérequis
- **Node.js 20 LTS** (recommandé)  
  Le projet déclare `engines.node: ">=20 <21"` et un `/.nvmrc` à `20`.
- **npm** (ou un autre gestionnaire, selon ton environnement)

### Setup Node 20 (WSL / Linux)
Si tu as `nvm` :

```bash
nvm install 20
nvm use 20
node -v
```

Tu dois voir `v20.x.x`.

Si tu n’as pas `nvm`, installe Node 20 LTS via ton gestionnaire système ou un installateur Node officiel, puis vérifie :

```bash
node -v
```

### Installer les dépendances

```bash
npm install
```

### Importer le knowledge (embeddings locaux, gratuit)
Le script `scripts/upload-knowledge.mjs` :
- génère des **embeddings en local** (pas d’API Gemini/OpenAI)
- utilise un modèle **768 dimensions** (compatible avec la colonne `documents.embedding`)
- insère les documents dans Supabase

Exécution :

```bash
node scripts/upload-knowledge.mjs
```

Variables utiles (optionnelles) dans `.env.local` :
- `LOCAL_EMBED_MODEL` (défaut: `Xenova/all-mpnet-base-v2`)
- `EXPECTED_EMBED_DIM` (défaut: `768`)

### Chat RAG + reponse naturelle (Lovable)
Le chat fait maintenant:
1. embedding local de la question
2. recherche vectorielle Supabase (`match_documents`)
3. generation finale LLM sur les passages recuperes
4. affichage des sources

Variable requise pour la generation naturelle:
- `VITE_GEMINI_API_KEY`

Exemple `.env.local`:

```env
VITE_GEMINI_API_KEY=ta_cle_gemini
```

Si la cle est absente/invalide, le chat garde un fallback RAG "template" (sans LLM), donc le service reste fonctionnel.

Pour Lovable:
- ajoute `VITE_GEMINI_API_KEY` dans les variables d'environnement du projet
- redeploie/restart l'app pour charger la nouvelle variable

### Liens PDF avec page (sources cliquables)
Le chat peut maintenant afficher des liens de source au format:
- `https://.../document.pdf#page=12`

Pour activer l'ouverture directe sur la bonne page:
1. Renseigne `pdfUrl` et `pdfPage` dans chaque entree de `scripts/upload-knowledge.mjs`
2. Relance l'ingestion

```bash
node scripts/upload-knowledge.mjs
```

Ensuite, dans les reponses du chat, la section "Sources" affichera des liens cliquables qui ouvrent le PDF a la page indiquee.

### Admin: gestion ingestion RAG
La page Admin contient maintenant un onglet **Knowledge** pour gerer l'ingestion manuelle:
- ajouter un document (categorie, contenu, source, PDF URL, page)
- indexer directement (embedding local + insert Supabase)
- lister les 50 derniers documents indexes
- supprimer un document

Mode actuel:
- **manuel valide** (pas de scraping automatique des sites officiels)
- recommande pour garder la qualite juridique/editoriale

### Rollback (si Node 20 ou les changements posent problème)

#### 1) Revenir à l’ancien script (archive)
Une version archivée “connue fonctionnelle” est disponible :
- `scripts/archive/upload-knowledge.local-768d.2026-03-23.mjs`

Pour l’utiliser :

```bash
node scripts/archive/upload-knowledge.local-768d.2026-03-23.mjs
```

#### 2) Revenir à une version Node précédente
Avec `nvm` :

```bash
nvm use 18
node -v
```

#### 3) Revenir en arrière via git
Si tu veux annuler toutes les modifs du repo et revenir à `main` tel qu’il était avant :

```bash
git status
git restore .
```

Ou checkout d’un commit précédent (si tu as commit tes changements) :

```bash
git log --oneline --max-count=10
git checkout <commit_sha>
```
