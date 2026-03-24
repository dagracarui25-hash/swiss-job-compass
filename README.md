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
