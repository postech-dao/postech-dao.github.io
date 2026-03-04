/**
 * Build script — assembles the deployable site into dist/.
 *
 * 1. Clean dist/
 * 2. Copy source files
 * 3. Copy vendor libs from node_modules
 * 4. Copy fonts from @fontsource/roboto
 * 5. Fetch external data (Google Sheets, Medium RSS)
 */

import { cpSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fetchData } from './fetch-data.mjs';

const ROOT = join(import.meta.dirname, '..');
const DIST = join(ROOT, 'dist');

const SKIP_DIRS = new Set(['node_modules', '.git', '.github', 'scripts', 'dist', '.claude']);

const SKIP_FILES = new Set([
  'package.json',
  'pnpm-lock.yaml',
  'biome.json',
  'CLAUDE.md',
  'TECHSPEC.md',
  'TECHSPEC_PLAN.md',
  '.gitignore',
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function copySourceFiles() {
  console.log('Copying source files...');

  const entries = readdirSync(ROOT);
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry) || SKIP_FILES.has(entry)) continue;

    const src = join(ROOT, entry);
    const dest = join(DIST, entry);
    const stat = statSync(src);

    if (stat.isDirectory()) {
      cpSync(src, dest, { recursive: true });
    } else {
      cpSync(src, dest);
    }
  }
}

function copyVendor() {
  console.log('Copying vendor libraries...');

  const vendorDir = join(DIST, 'assets', 'vendor');
  mkdirSync(vendorDir, { recursive: true });

  // i18next UMD
  cpSync(
    join(ROOT, 'node_modules', 'i18next', 'dist', 'umd', 'i18next.min.js'),
    join(vendorDir, 'i18next.min.js'),
  );

  // i18next-http-backend UMD
  cpSync(
    join(ROOT, 'node_modules', 'i18next-http-backend', 'i18nextHttpBackend.min.js'),
    join(vendorDir, 'i18nextHttpBackend.min.js'),
  );

  // Three.js
  const threeVendor = join(vendorDir, 'three');
  mkdirSync(threeVendor, { recursive: true });

  cpSync(
    join(ROOT, 'node_modules', 'three', 'build', 'three.module.js'),
    join(threeVendor, 'three.module.js'),
  );

  // Three.js addons (STLLoader + OrbitControls)
  const addonsDir = join(threeVendor, 'addons');
  const loadersDir = join(addonsDir, 'loaders');
  const controlsDir = join(addonsDir, 'controls');
  mkdirSync(loadersDir, { recursive: true });
  mkdirSync(controlsDir, { recursive: true });

  cpSync(
    join(ROOT, 'node_modules', 'three', 'examples', 'jsm', 'loaders', 'STLLoader.js'),
    join(loadersDir, 'STLLoader.js'),
  );
  cpSync(
    join(ROOT, 'node_modules', 'three', 'examples', 'jsm', 'controls', 'OrbitControls.js'),
    join(controlsDir, 'OrbitControls.js'),
  );
}

function copyFonts() {
  console.log('Copying fonts...');

  const fontsDir = join(DIST, 'assets', 'fonts');
  const filesDir = join(fontsDir, 'files');
  mkdirSync(filesDir, { recursive: true });

  const robotoDir = join(ROOT, 'node_modules', '@fontsource', 'roboto');

  // Copy latin subset CSS for weights we use: 300, 400, 500, 700, 900
  const weights = [300, 400, 500, 700, 900];
  for (const w of weights) {
    cpSync(join(robotoDir, `latin-${w}.css`), join(fontsDir, `latin-${w}.css`));
  }

  // Copy woff2 font files for latin weights
  const robotoFiles = readdirSync(join(robotoDir, 'files'));
  for (const file of robotoFiles) {
    if (file.startsWith('roboto-latin-') && file.endsWith('.woff2')) {
      const weight = file.match(/(\d+)/)?.[1];
      if (weight && weights.includes(Number(weight))) {
        cpSync(join(robotoDir, 'files', file), join(filesDir, file));
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function build() {
  console.log('Building site into dist/...\n');

  // 1. Clean
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(DIST, { recursive: true });

  // 2. Copy source
  copySourceFiles();

  // 3. Vendor
  copyVendor();

  // 4. Fonts
  copyFonts();

  // 5. Fetch data
  await fetchData();

  console.log('\nBuild complete.');
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
