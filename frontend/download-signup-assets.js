import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');

fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(iconsDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    http.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        const stats = fs.statSync(dest);
        console.log(`  ✓ ${path.basename(dest)} (${stats.size} bytes)`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

const assets = {
  images: {
    'signup-cat.png': 'http://localhost:3845/assets/308adf86f9507a12ffeda1ebc269d9d753747f3b.png',
  },
  icons: {
    'signup-logo-icon.svg': 'http://localhost:3845/assets/0d09ed191a9b4edf4bcb410003f30081af17d5aa.svg',
    'check-circle-green.svg': 'http://localhost:3845/assets/1c9784884ad460aa336480eb4b31bf359db7734b.svg',
    'arrow-right-signup.svg': 'http://localhost:3845/assets/94394b84bdc80ca7a5eea4d21bcb4ffb4640dff6.svg',
    'check-circle-benefit.svg': 'http://localhost:3845/assets/ea4728b0690045251bda0830e3307b645ebca58d.svg',
  }
};

async function downloadAll() {
  console.log('Downloading signup page images...');
  for (const [name, url] of Object.entries(assets.images)) {
    try { await download(url, path.join(imagesDir, name)); } catch (e) { console.log(`  ✗ Failed: ${name}`); }
  }
  console.log('Downloading signup page icons...');
  for (const [name, url] of Object.entries(assets.icons)) {
    try { await download(url, path.join(iconsDir, name)); } catch (e) { console.log(`  ✗ Failed: ${name}`); }
  }
  console.log('Done!');
}

downloadAll();
