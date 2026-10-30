import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('../', import.meta.url));
const pacote = JSON.parse(readFileSync(join(raiz, 'package.json'), 'utf8'));
const npm = process.env.npm_execpath;
assert.ok(npm, 'Execute com npm run check:package.');

const pastaTemporaria = realpathSync(tmpdir());
const consumidor = mkdtempSync(join(pastaTemporaria, 'obraprima-ui-consumidor-'));
const caminhoRelativo = relative(pastaTemporaria, realpathSync(consumidor));
assert.ok(caminhoRelativo && !caminhoRelativo.startsWith('..') && !isAbsolute(caminhoRelativo));
assert.equal(dirname(realpathSync(consumidor)), pastaTemporaria);

function executarNpm(argumentos, cwd = consumidor, capturar = false) {
  return execFileSync(process.execPath, [npm, ...argumentos], {
    cwd,
    encoding: 'utf8',
    stdio: capturar ? ['ignore', 'pipe', 'inherit'] : 'inherit',
  });
}

try {
  console.log('Gerando e instalando o pacote em um consumidor temporário...');
  const [artefato] = JSON.parse(executarNpm([
    'pack', '--json', '--silent', '--pack-destination', consumidor,
  ], raiz, true));
  const arquivos = artefato.files.map((arquivo) => arquivo.path);
  for (const obrigatorio of ['dist/index.js', 'dist/index.d.ts', 'dist/estilos.css', 'dist/estilos.css.d.ts', 'dist/tokens.css']) {
    assert.ok(arquivos.includes(obrigatorio), `Arquivo ausente: ${obrigatorio}`);
  }
  assert.ok(arquivos.every((arquivo) => ['package.json', 'README.md'].includes(arquivo)
    || (arquivo.startsWith('dist/') && !/\.(test|stories)\./.test(arquivo))),
  'O pacote deve conter apenas arquivos de distribuição e metadados.');

  cpSync(join(raiz, 'tests/consumidor'), consumidor, { recursive: true });
  const nomes = ['react', 'react-dom', '@types/react', '@types/react-dom', 'typescript', 'vite'];
  const dependencias = Object.fromEntries(nomes.map((nome) => [nome, pacote.devDependencies[nome]]));
  writeFileSync(join(consumidor, 'package.json'), JSON.stringify({
    name: 'verificacao-obraprima-ui',
    private: true,
    type: 'module',
    dependencies: { ...dependencias, [pacote.name]: `file:./${artefato.filename}` },
  }, null, 2));

  executarNpm(['install', '--ignore-scripts', '--no-audit', '--no-fund']);
  executarNpm(['ls', 'react', 'react-dom']);
  executarNpm(['exec', '--', 'tsc', '--project', 'tsconfig.json']);
  executarNpm(['exec', '--', 'vite', 'build']);
  execFileSync(process.execPath, ['verificar.mjs'], { cwd: consumidor, stdio: 'inherit' });
  console.log(`Pacote ${pacote.name}@${pacote.version} validado: instalação, ESM, tipos e CSS.`);
} finally {
  assert.equal(dirname(realpathSync(consumidor)), pastaTemporaria);
  rmSync(resolve(consumidor), { recursive: true, force: true });
}
