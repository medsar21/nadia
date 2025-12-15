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

## 🔧 Résolution des problèmes de déploiement

### Erreur : "Build failed" sur Vercel

**Causes communes :**

1. **Erreurs TypeScript** : Variables déclarées mais non utilisées
   ```bash
   # Vérifier localement avant de push
   npm run build
   ```
   - Si erreur : `error TS6133: 'VARIABLE' is declared but its value is never read`
   - **Solution** : Supprimer la variable inutilisée ou l'utiliser

2. **Erreurs de linting**
   ```bash
   # Vérifier les erreurs de lint
   npm run lint
   ```

3. **Dépendances manquantes**
   - Vérifier que toutes les dépendances sont dans `package.json`
   - Vérifier que `package-lock.json` est commité

4. **Variables d'environnement manquantes**
   - Vérifier dans Vercel Dashboard → Settings → Environment Variables

### ✅ Checklist avant chaque push

- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run lint` ne montre pas d'erreurs critiques
- [ ] Toutes les variables inutilisées sont supprimées
- [ ] Les imports sont corrects
- [ ] Les fichiers de configuration sont à jour

### 🚀 Commandes utiles

```bash
# Build local pour tester
npm run build

# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Vérifier les erreurs de lint
npm run lint

# Preview du build local
npm run preview
```

### 📝 Configuration Vercel recommandée

Dans Vercel Dashboard → Project Settings → Build & Development Settings :

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: 18.x ou 20.x (recommandé)













