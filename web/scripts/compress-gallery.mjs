import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS_DIR = path.join(process.cwd(), "public", "assets");
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
/** Skip files already at or below this size (bytes) */
const SKIP_BELOW_BYTES = 600 * 1024;

async function compressGallery() {
  const entries = await fs.readdir(ASSETS_DIR);
  const images = entries.filter((name) => /\.jpe?g$/i.test(name)).sort();

  if (images.length === 0) {
    console.log("No JPEG files found in public/assets/");
    return;
  }

  console.log(`Compressing gallery images in ${ASSETS_DIR}\n`);

  for (const name of images) {
    const filePath = path.join(ASSETS_DIR, name);
    const before = (await fs.stat(filePath)).size;

    if (before <= SKIP_BELOW_BYTES) {
      console.log(`${name}: skipped (already ${(before / 1024).toFixed(0)}KB)`);
      continue;
    }

    const buffer = await sharp(filePath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    const tmpPath = `${filePath}.tmp`;
    await fs.writeFile(tmpPath, buffer);
    await fs.rm(filePath, { force: true });
    await fs.rename(tmpPath, filePath);

    console.log(
      `${name}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(buffer.length / 1024 / 1024).toFixed(1)}MB`
    );
  }

  console.log("\nDone. Commit web/public/assets/ so Vercel can serve them.");
}

compressGallery().catch((error) => {
  console.error(error);
  console.error(
    "\nIf you see a file lock error, stop `npm run dev` and run this again."
  );
  process.exit(1);
});
