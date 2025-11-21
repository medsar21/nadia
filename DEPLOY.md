# Instructions de déploiement sur Vercel

## Fichiers nécessaires pour Vercel

Tous les fichiers nécessaires sont maintenant en place :

- ✅ `package.json` - Configuration des dépendances et scripts
- ✅ `vercel.json` - Configuration Vercel pour Vite
- ✅ `vite.config.ts` - Configuration Vite
- ✅ `tsconfig.json` - Configuration TypeScript
- ✅ `tailwind.config.js` - Configuration Tailwind CSS
- ✅ `postcss.config.js` - Configuration PostCSS
- ✅ `.npmrc` - Configuration npm

## Déploiement

### Option 1 : Via l'interface Vercel

1. Connectez votre repository GitHub à Vercel
2. Vercel détectera automatiquement que c'est un projet Vite
3. Les paramètres suivants seront utilisés automatiquement :
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Option 2 : Via Vercel CLI

```bash
npm i -g vercel
vercel
```

## Configuration Vercel

Le fichier `vercel.json` configure :
- Le framework Vite
- Les rewrites pour le routing SPA (toutes les routes pointent vers `index.html`)
- Les commandes de build et d'installation

## Variables d'environnement (si nécessaire)

Si vous avez besoin de variables d'environnement (comme l'URL du Google Script), ajoutez-les dans :
- Settings → Environment Variables dans le dashboard Vercel

## Notes importantes

- Le dossier `public/` contient les assets statiques (comme `nadia.jpg`)
- Vercel déploiera automatiquement à chaque push sur la branche principale
- Les preview deployments sont créés pour chaque pull request





