// Download all Figma assets to local directories
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'src', 'assets', 'images');
const iconsDir = path.join(__dirname, 'src', 'assets', 'icons');

// Ensure directories exist
fs.mkdirSync(imagesDir, { recursive: true });
fs.mkdirSync(iconsDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);
    client.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
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
    // Hero section
    'hero-dog.png': 'http://127.0.0.1:3845/assets/91f6d2c4470adbdd2fa041fbb2c39ed40e28d496.png',
    // Category section
    'dog-food.png': 'http://127.0.0.1:3845/assets/a443f570a1085bf0d3793d2be4f22df1b240a7d4.png',
    'cat-food.png': 'http://127.0.0.1:3845/assets/53b22969afd959032b55392f5f1ac1cf1fad6ad4.png',
    'toys.png': 'http://127.0.0.1:3845/assets/54e48d24fabfabc2ef2800b79ef17b3c0eb09162.png',
    'health-care.png': 'http://127.0.0.1:3845/assets/0ba8da34e20780e02fc05260ccb1c06678da71f7.png',
    // Featured products section
    'product-salmon.png': 'http://127.0.0.1:3845/assets/318cd44bc70ee74c1e6dbfe9661ea09dacdbbaa7.png',
    'product-cat-chicken.png': 'http://127.0.0.1:3845/assets/3f37f8d651426ec1397214fd33280b580f135455.png',
    'product-lamb-toy.png': 'http://127.0.0.1:3845/assets/d2e757bdcd732ffcc5dd3058d5b6a5bcbdeb2f4d.png',
    'product-puppy-food.png': 'http://127.0.0.1:3845/assets/541c008c46cfd5c30bed44757c405b4c20177f13.png',
  },
  icons: {
    // Navbar
    'logo.svg': 'http://127.0.0.1:3845/assets/509e5c61606c3c0c3a1e7fac5f4a5c47c39f152e.svg',
    'search.svg': 'http://127.0.0.1:3845/assets/5468899217a46d8fc86eb65621f2ac5a308c49b3.svg',
    // Hero
    'sparkle.svg': 'http://127.0.0.1:3845/assets/37504bc1a484e5d79ec9042b9483aa32c082b5a4.svg',
    'arrow-right-white.svg': 'http://127.0.0.1:3845/assets/12f9991066536aad1f2a79b6413e1d6d41108267.svg',
    'shield-check.svg': 'http://127.0.0.1:3845/assets/a676867faaf3dd25e7f0c20a0ec3c026a4baa76c.svg',
    'truck.svg': 'http://127.0.0.1:3845/assets/549e1ae933b4bbab04233e886de18375fe9fa3da.svg',
    'star-badge.svg': 'http://127.0.0.1:3845/assets/cd048ac23dbb20f8043874332234299c0913fb73.svg',
    'paw.svg': 'http://127.0.0.1:3845/assets/8cbc6c5a6f7b7d9a5d3421af4ed63678a0f946dd.svg',
    'arrow-right-sm.svg': 'http://127.0.0.1:3845/assets/4f95c2ee05669125d263bfe42721a334d64b5cbd.svg',
    'bell-ring.svg': 'http://127.0.0.1:3845/assets/65561c0bbf478d07ad41da4b6ae3035191699ce4.svg',
    // Category & Featured sections
    'arrow-right-teal.svg': 'http://127.0.0.1:3845/assets/cf18b4803530dd2c6f6bcb59271b04634e1b038d.svg',
    'star-filled.svg': 'http://127.0.0.1:3845/assets/06259d2ef2dd948c9954c0c5c8ae47f323e57cca.svg',
    'plus.svg': 'http://127.0.0.1:3845/assets/045738f464b20b51d805cee1b564c3d705efd3ed.svg',
    // Footer
    'logo-footer.svg': 'http://127.0.0.1:3845/assets/911b1e2ea22e0b4620c5686283db2ed4acd64fcb.svg',
    // Why Zootopia icons
    'pet-profile.svg': 'http://127.0.0.1:3845/assets/7b452601126fe6dab09abe9130f3ec92e10fda55.svg',
    'smart-filter.svg': 'http://127.0.0.1:3845/assets/745856ff738437fc6a8ab8e65ac065aa9baff19b.svg',
    'subscription.svg': 'http://127.0.0.1:3845/assets/acde09fc12a70092e86ef81122b38cf2b6e9ed50.svg',
    'reorder.svg': 'http://127.0.0.1:3845/assets/45d636b921fb04ac2fd48eb17c55b2f497ab3ba0.svg',
    'arrow-right-small-teal.svg': 'http://127.0.0.1:3845/assets/b24daccc9fae7a3394db8371515fe9a3246c089c.svg',
    // Bundle builder
    'package.svg': 'http://127.0.0.1:3845/assets/7d9d4fc24e389bdc4b6070a2bbb4bb1a528815c5.svg',
    'arrow-right-bundle.svg': 'http://127.0.0.1:3845/assets/7e771fe5fc6326b265155c3a238352376d86dc56.svg',
    // Testimonials star
    'star-testimonial.svg': 'http://127.0.0.1:3845/assets/fb7d654c3cc82b13ab58b3679e37e9ec69e75475.svg',
    // FAQ
    'chevron-down.svg': 'http://127.0.0.1:3845/assets/de0e3cae7aa60861c307d3bce3c547af1ad7cde3.svg',
  }
};

async function downloadAll() {
  console.log('Downloading images...');
  for (const [name, url] of Object.entries(assets.images)) {
    const dest = path.join(imagesDir, name);
    try {
      await download(url, dest);
    } catch (e) {
      console.log(`  ✗ Failed: ${name} - ${e.message}`);
    }
  }

  console.log('\nDownloading icons...');
  for (const [name, url] of Object.entries(assets.icons)) {
    const dest = path.join(iconsDir, name);
    try {
      await download(url, dest);
    } catch (e) {
      console.log(`  ✗ Failed: ${name} - ${e.message}`);
    }
  }

  console.log('\nDone!');
}

downloadAll();
