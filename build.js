#!/usr/bin/env node
/* Bundle the app into one self-contained HTML file.
 *
 * Why this exists: browsers block `<script type="module" src="...">` over the
 * file:// protocol (the origin is "null", so the module fetch fails CORS). The
 * modular source is the thing to edit and read; this produces a single file that
 * opens by double-click on any machine with no server and no install.
 *
 * Inline module scripts are never fetched, so the CORS restriction does not
 * apply to the bundled output.
 *
 *   node build.js   ->   askrosie-standalone.html
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8');

/* Dependency order. Modules here import from each other in cycles (app <-> the
 * views), which ESM resolves by hoisting; flattening preserves that because
 * nothing calls across a cycle until DOMContentLoaded. What DOES matter is that
 * anything executing at module-eval time -- state.js builds its initial object
 * immediately -- comes after what it reads. */
const ORDER = [
  'data/artworks.js',
  'data/artworks.es.js',
  'data/curriculum.js',
  'data/i18n.js',
  'js/state.js',
  'js/i18n.js',
  'js/artframe.js',
  'js/rosie.js',
  'js/auth.js',
  'js/history.js',
  'js/chat.js',
  'js/teacher.js',
  'js/quiz.js',
  'js/app.js',
];

/** Strip ESM syntax so the modules can share one scope. */
function flatten(src, name) {
  let out = src
    // import { a, b } from '...';  /  import x from '...';  (may span lines)
    .replace(/^import\s+[\s\S]*?\s+from\s+['"][^'"]+['"];?\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"];?\s*$/gm, '')
    // export { a, b };  -- re-exports are redundant once everything shares a scope
    .replace(/^export\s*\{[^}]*\}\s*;?\s*$/gm, '')
    // export const/let/function/class  ->  drop the keyword
    .replace(/^export\s+(const|let|var|function|class|async)\b/gm, '$1');

  if (/^\s*export\b/m.test(out)) {
    throw new Error(`${name}: unhandled export syntax survived flattening`);
  }
  if (/^\s*import\b/m.test(out)) {
    throw new Error(`${name}: unhandled import syntax survived flattening`);
  }
  return `\n/* ══════ ${name} ══════ */\n${out.trim()}\n`;
}

/* Module scope keeps same-named top-level bindings apart; a flat bundle does not.
 * Catch that here rather than shipping a file that dies on a SyntaxError. */
function assertNoCollisions(sources) {
  const seen = new Map();
  const decl = /^(?:export\s+)?(?:const|let|var|function|class|async function)\s+([A-Za-z_$][\w$]*)/gm;
  const clashes = [];
  for (const [name, src] of sources) {
    for (const m of src.matchAll(decl)) {
      const id = m[1];
      if (seen.has(id) && seen.get(id) !== name) clashes.push(`${id} (${seen.get(id)} + ${name})`);
      else seen.set(id, name);
    }
  }
  if (clashes.length) {
    throw new Error('top-level name collisions would break the bundle:\n  ' + clashes.join('\n  '));
  }
}

const sources = ORDER.map((f) => [f, read(f)]);
assertNoCollisions(sources);
const bundle = sources.map(([f, src]) => flatten(src, f)).join('\n');

let html = read('index.html');

// Inline the stylesheet.
// Replacer FUNCTIONS, not strings: in a string replacement `$$`, `$&` and `$1`
// are special, and the bundle really does contain `$$` (the querySelectorAll
// helper). A function replacement is inserted verbatim.
html = html.replace(
  /<link rel="stylesheet" href="styles\.css">/,
  () => '<style>\n' + read('styles.css') + '\n</style>'
);

// Replace the module entry point with the flattened bundle.
html = html.replace(
  /<script type="module" src="js\/app\.js"><\/script>/,
  () => '<script type="module">\n' + bundle + '\n</script>'
);

// Check for real external references, not the section-header comments the
// bundle itself contains (those legitimately name the source files).
if (/href="styles\.css"/.test(html) || /src="js\/app\.js"/.test(html)) {
  throw new Error('bundling failed: external references remain in the output');
}

const outFile = 'askrosie-standalone.html';
writeFileSync(join(root, outFile), html);

const kb = (Buffer.byteLength(html) / 1024).toFixed(0);
console.log(`${outFile}  ${kb} KB  (${ORDER.length} modules + stylesheet inlined)`);
