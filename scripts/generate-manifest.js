/**
 * CipherGate - Release Manifest & Checksum Generator
 * Calculates deterministic SHA-256 hashes of all source, contract, and test files.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '..');
const targetDirs = ['contract', 'tests', 'docs'];

console.log('🔒 Generating deterministic integrity checksums...');

const hashes = [];

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', 'dist', 'dist-artifacts', 'coverage'].includes(entry.name)) {
        scanDir(fullPath);
      }
    } else if (entry.isFile() && (entry.name.endsWith('.compact') || entry.name.endsWith('.ts') || entry.name.endsWith('.md'))) {
      const content = fs.readFileSync(fullPath);
      const hash = crypto.createHash('sha256').update(content).digest('hex');
      const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
      hashes.push(`${hash}  ${relPath}`);
    }
  }
}

for (const d of targetDirs) {
  const fullD = path.join(rootDir, d);
  if (fs.existsSync(fullD)) {
    scanDir(fullD);
  }
}

hashes.sort();
const outPath = path.join(rootDir, 'checksums.sha256');
fs.writeFileSync(outPath, hashes.join('\n') + '\n');

console.log(`✅ Generated checksums for ${hashes.length} verified project artifacts in checksums.sha256\n`);
