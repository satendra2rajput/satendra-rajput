// Runs before `npm start` / `npm run build` (see "prestart"/"prebuild" in package.json).
// Turns "TS2307: Cannot find module '@angular/router'" + a wall of NG1010 errors into one clear message.
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'));
const wanted = { ...pkg.dependencies, ...pkg.devDependencies };
const problems = [];

// 1) Node version (Angular 22 needs ^22.12 or >=24)
const [major, minor] = process.versions.node.split('.').map(Number);
if (!(major >= 24 || (major === 22 && minor >= 12))) {
  problems.push(`Node ${process.versions.node} is too old — Angular 22 needs Node 22.12+ or 24+.`);
}

// 2) every package from package.json is actually installed
const missing = Object.keys(wanted).filter((name) => !existsSync(new URL(`node_modules/${name}/package.json`, root)));
if (missing.length) {
  problems.push(`Not installed in node_modules: ${missing.join(', ')}`);
} else {
  // 3) every @angular/* package must be on Angular 22
  const version = (name) => JSON.parse(readFileSync(new URL(`node_modules/${name}/package.json`, root), 'utf8')).version;
  const off = Object.keys(wanted).filter((n) => n.startsWith('@angular/') && version(n).split('.')[0] !== '22');
  if (off.length) problems.push(`Not on Angular 22 yet: ${off.map((n) => `${n}@${version(n)}`).join(', ')}`);
}

if (problems.length) {
  console.error('\n✖ Project dependencies are not set up correctly:\n');
  for (const p of problems) console.error('  • ' + p);
  console.error('\nFix: in this folder run\n\n    rm -rf node_modules package-lock.json   (Windows: rmdir /s /q node_modules & del package-lock.json)\n    npm install\n');
  console.error('Make sure you are using the package.json from this project (it lists @angular/router) — do not copy only `src/` into another project.\n');
  process.exit(1);
}
