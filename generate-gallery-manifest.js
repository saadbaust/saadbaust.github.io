// Generates images/gallery-manifest.json by listing whatever image files
// actually exist in images/events/ and images/memories/ right now.
//
// Run by .github/workflows/gallery-manifest.yml whenever those folders change
// (e.g. after a Pages CMS upload/delete commits to the repo). gallery.html
// fetches the resulting JSON file as a normal static asset on GitHub Pages —
// no GitHub API calls, no rate limit, no auth needed at view time.

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..', '..');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

function listImages(relFolder) {
  const dir = path.join(REPO_ROOT, relFolder);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && IMAGE_EXTENSIONS.includes(path.extname(entry.name).toLowerCase()))
    .map(entry => entry.name)
    .sort((a, b) => a.localeCompare(b))
    .map(name => `${relFolder}/${name}`);
}

const manifest = {
  events: listImages('images/events'),
  memories: listImages('images/memories'),
  generatedAt: new Date().toISOString(),
};

const outDir = path.join(REPO_ROOT, 'images');
const outPath = path.join(outDir, 'gallery-manifest.json');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + '\n');

console.log(`Wrote ${outPath}`);
console.log(`  events:   ${manifest.events.length}`);
console.log(`  memories: ${manifest.memories.length}`);
