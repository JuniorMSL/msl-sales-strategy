const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Script d'optimisation des images
 * Convertit les PNG en WebP et optimise les images existantes
 */

const ASSETS_DIR = path.join(__dirname, "src", "assets", "images");
const SUPPORTED_FORMATS = [".webp", ".webp", ".jpeg"];

function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

function convertToWebP(imagePath) {
  const ext = path.extname(imagePath);
  const webpPath = imagePath.replace(ext, ".webp");

  // Vérifier si le fichier WebP existe déjà
  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  Déjà converti: ${path.basename(webpPath)}`);
    return;
  }

  try {
    // Utiliser cwebp (installer avec: brew install webp sur macOS)
    const quality = 85; // Qualité de compression (0-100)
    execSync(`cwebp -q ${quality} "${imagePath}" -o "${webpPath}"`, {
      stdio: "pipe",
    });

    const originalSize = fs.statSync(imagePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const reduction = ((1 - webpSize / originalSize) * 100).toFixed(1);

    console.log(
      `✅ ${path.basename(imagePath)} → ${path.basename(
        webpPath
      )} (${reduction}% plus petit)`
    );
  } catch (error) {
    console.error(
      `❌ Erreur lors de la conversion de ${imagePath}:`,
      error.message
    );
  }
}

function main() {
  console.log("🚀 Démarrage de l'optimisation des images...\n");

  // Vérifier si cwebp est installé
  try {
    execSync("which cwebp", { stdio: "pipe" });
  } catch (error) {
    console.error("❌ cwebp n'est pas installé.");
    console.error("Installation:");
    console.error("  macOS: brew install webp");
    console.error("  Linux: sudo apt-get install webp");
    console.error(
      "  Windows: télécharger depuis https://developers.google.com/speed/webp/download"
    );
    process.exit(1);
  }

  const imageFiles = getAllImageFiles(ASSETS_DIR);
  console.log(`📁 ${imageFiles.length} images trouvées\n`);

  imageFiles.forEach(convertToWebP);

  console.log("\n✨ Optimisation terminée !");
  console.log(
    "\n💡 Conseil: Utilisez la directive appLazyLoad sur vos balises <img> pour le lazy loading"
  );
}

main();
