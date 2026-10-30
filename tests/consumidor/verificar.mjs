import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { OpInputTexto } from '@mathvsk/obraprima-ui';

const html = renderToStaticMarkup(createElement(OpInputTexto, {
  id: 'nome', label: 'Nome', value: 'Obra Prima', onChange: () => {}, error: 'Confira o nome',
}));
assert.match(html, /<label[^>]*for="nome"[^>]*>Nome<\/label>/);
assert.match(html, /<input[^>]*value="Obra Prima"/);
assert.match(html, /aria-describedby="nome-erro"/);
assert.match(html, /Confira o nome/);

const arquivosCss = readdirSync('dist/assets').filter((arquivo) => arquivo.endsWith('.css'));
assert.ok(arquivosCss.length > 0, 'O build do consumidor precisa emitir CSS.');
const css = arquivosCss.map((arquivo) => readFileSync(`dist/assets/${arquivo}`, 'utf8')).join('\n');
assert.match(css, /\.op-input-texto__campo/);
assert.match(css, /--op-ui-/);
assert.doesNotMatch(css, /@import\s/, 'Os imports locais de CSS precisam ser resolvidos.');

await assert.rejects(import('@mathvsk/obraprima-ui/dist/index.js'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
