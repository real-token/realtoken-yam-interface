import * as esbuild from 'esbuild';
import { readdirSync, statSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

// Find all .ts files in api-src/ directory recursively
function findApiFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    if (statSync(fullPath).isDirectory()) {
      findApiFiles(fullPath, files);
    } else if (item.endsWith('.ts')) {
      files.push(fullPath);
    }
  }
  return files;
}

// Get all dependencies from package.json
const pkg = JSON.parse(readFileSync(join(rootDir, 'package.json'), 'utf-8'));
const allDeps = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.devDependencies || {}),
];

const apiSrcDir = join(rootDir, 'api-src');
const apiOutDir = join(rootDir, 'api');
const entryPoints = findApiFiles(apiSrcDir);

console.log('Building API functions:', entryPoints);

await esbuild.build({
  entryPoints,
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outdir: apiOutDir,
  outExtension: { '.js': '.js' },
  allowOverwrite: true,
  // Mark all node_modules as external - Vercel will resolve them at runtime
  external: allDeps,
  alias: {
    'src': join(rootDir, 'src'),
  },
  outbase: apiSrcDir,
  // Add banner to handle ESM/CJS interop
  banner: {
    js: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`,
  },
});

console.log('API functions built successfully!');
