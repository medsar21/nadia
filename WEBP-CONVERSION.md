# Guide de conversion WebP

## 🚀 Conversion automatique

### Étape 1 : Installer les dépendances

```bash
npm install
```

### Étape 2 : Convertir toutes les images

```bash
npm run convert:webp
```

Ce script va :
- Parcourir récursivement le dossier `public/`
- Convertir toutes les images (JPG, PNG) en WebP
- Conserver les fichiers originaux comme fallback
- Afficher les économies de taille pour chaque image

### Étape 3 : Vérifier les résultats

Les fichiers WebP seront créés à côté des originaux :
```
public/
  ├── cover.png          (original)
  ├── cover.webp         (nouveau)
  ├── meeting.jpg        (original)
  ├── meeting.webp       (nouveau)
  └── icones/
      ├── loupe.png      (original)
      └── loupe.webp     (nouveau)
```

## 📝 Mise à jour du code

### Option 1 : Utiliser le composant OptimizedImage (Recommandé)

Le composant `OptimizedImage` utilise automatiquement WebP avec fallback :

```tsx
import { OptimizedImage } from './components/OptimizedImage';

// Au lieu de :
<motion.img src={NADIA_HERO_IMAGE} alt="..." />

// Utiliser :
<OptimizedImage 
  src={NADIA_HERO_IMAGE} 
  alt="..."
  width={400}
  height={400}
  fetchPriority="high"
  whileHover={{ scale: 1.02 }}
  transition={{ duration: 0.3 }}
/>
```

### Option 2 : Utiliser <picture> manuellement

Pour les images critiques, utiliser `<picture>` avec `<source>` :

```tsx
<picture>
  <source srcSet="/MEITU_20250529_1011357914.webp" type="image/webp" />
  <motion.img
    src={NADIA_HERO_IMAGE}
    alt="Nadia Lakzir"
    width="400"
    height="400"
    fetchPriority="high"
  />
</picture>
```

### Option 3 : Mise à jour automatique (à venir)

Un script de migration automatique sera ajouté pour remplacer toutes les balises `<img>` par `<picture>` avec WebP.

## 🎯 Images critiques (Above the fold)

Ces images doivent être converties en priorité :
- `MEITU_20250529_1011357914.png` (Hero image)
- `cover.png` (Cover image)

## 📊 Bénéfices attendus

- **Réduction de taille** : 25-35% en moyenne
- **Temps de chargement** : Amélioration de 20-30%
- **Lighthouse Performance** : +5-10 points
- **LCP (Largest Contentful Paint)** : Amélioration significative

## ⚠️ Notes importantes

1. **Fallback automatique** : Les navigateurs qui ne supportent pas WebP chargeront automatiquement l'image originale
2. **Conserver les originaux** : Ne pas supprimer les fichiers PNG/JPG originaux
3. **Qualité** : Le script utilise une qualité de 85% (bon compromis taille/qualité)
4. **Compatibilité** : WebP est supporté par 95%+ des navigateurs modernes

## 🔍 Vérification

Après conversion, vérifier que :
- Tous les fichiers WebP sont créés
- Les images s'affichent correctement dans le navigateur
- Le fallback fonctionne (tester avec un navigateur ancien ou désactiver WebP)

## 📦 Déploiement

Les fichiers WebP seront automatiquement inclus dans le build :
```bash
npm run build
```

Vérifier dans `dist/` que les fichiers WebP sont présents.

