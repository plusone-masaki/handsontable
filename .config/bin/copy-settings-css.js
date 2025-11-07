const path = require('path');
const fs = require('fs-extra');

const ROOT = path.resolve(__dirname, '..', '..');
const SRC_FILE = path.join(ROOT, 'src', 'css', 'settings.css');
const DEST_DIR = path.join(ROOT, 'dist');
const DEST_FILE = path.join(DEST_DIR, 'settings.css');

async function copySettingsCss() {
  await fs.ensureDir(DEST_DIR);
  await fs.copy(SRC_FILE, DEST_FILE);
  console.log(`Copied ${path.relative(ROOT, SRC_FILE)} -> ${path.relative(ROOT, DEST_FILE)}`);
}

copySettingsCss().catch((error) => {
  console.error('Failed to copy settings.css', error);
  process.exitCode = 1;
});
