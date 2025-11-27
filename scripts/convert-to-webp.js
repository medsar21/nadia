import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '../public');
const imageExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

// Fonction récursive pour trouver toutes les images
function findImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Ignorer node_modules et autres dossiers système
      if (!file.startsWith('.') && file !== 'node_modules') {
        findImages(filePath, fileList);
      }
    } else {
      const ext = path.extname(file);
      if (imageExtensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Convertir une image en WebP
async function convertToWebP(inputPath) {
  try {
    const ext = path.extname(inputPath);
    const baseName = path.basename(inputPath, ext);
    const dir = path.dirname(inputPath);
    const outputPath = path.join(dir, `${baseName}.webp`);
    
    // Vérifier si le fichier WebP existe déjà
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  WebP existe déjà: ${path.relative(publicDir, outputPath)}`);
      return;
    }
    
    console.log(`🔄 Conversion: ${path.relative(publicDir, inputPath)} -> ${path.relative(publicDir, outputPath)}`);
    
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ Converti: ${(originalSize / 1024).toFixed(2)} KB -> ${(webpSize / 1024).toFixed(2)} KB (${savings}% économisé)`);
  } catch (error) {
    console.error(`❌ Erreur lors de la conversion de ${inputPath}:`, error.message);
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Début de la conversion des images en WebP...\n');
  
  const images = findImages(publicDir);
  console.log(`📸 ${images.length} images trouvées\n`);
  
  // Convertir toutes les images en parallèle (max 5 à la fois)
  const batchSize = 5;
  for (let i = 0; i < images.length; i += batchSize) {
    const batch = images.slice(i, i + batchSize);
    await Promise.all(batch.map(convertToWebP));
  }
  
  console.log('\n✨ Conversion terminée !');
  console.log(`📊 ${images.length} images traitées`);
}

main().catch(console.error);

