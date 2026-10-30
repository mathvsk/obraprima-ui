import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as apiPublica from './index.js';

const src = dirname(fileURLToPath(import.meta.url));
const campos = readdirSync(src, { withFileTypes: true })
  .filter((entrada) => entrada.isDirectory()).map((entrada) => entrada.name).sort();

const ler = (arquivo: string) => readFileSync(resolve(src, arquivo), 'utf8');
const componente = (campo: string) => campo.split('-')
  .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1)).join('');
const capturas = (texto: string, padrao: RegExp) =>
  [...texto.matchAll(padrao)].map((resultado) => resultado[1]!);

describe('contrato de distribuição dos componentes', () => {
  it('mantém nomes e arquivos necessários para cada campo', () => {
    expect(campos.length).toBeGreaterThan(0);
    for (const campo of campos) {
      expect(campo).toMatch(/^op-[a-z0-9]+(-[a-z0-9]+)*$/);
      const nome = componente(campo);
      for (const arquivo of [
        `${nome}.tsx`, `${nome}.logic.ts`, `${nome}.interface.ts`,
        `${nome}.test.tsx`, `${nome}.stories.tsx`, `${campo}.css`,
      ]) {
        expect(existsSync(resolve(src, campo, arquivo)), `${campo}/${arquivo}`).toBe(true);
      }
    }
  });

  it('expõe somente os componentes na API JavaScript', () => {
    expect(Object.keys(apiPublica).sort()).toEqual(campos.map(componente).sort());
  });

  it('inclui os tokens e o CSS de todos os campos', () => {
    const importados = capturas(ler('estilos.css'), /@import '\.\/([^']+)';/g);
    expect(importados).toEqual(['tokens.css', ...campos.map((campo) => `${campo}/${campo}.css`)]);
  });

  it('isola as classes CSS de cada campo', () => {
    for (const campo of campos) {
      const css = ler(`${campo}/${campo}.css`).replace(/\/\*[\s\S]*?\*\//g, '');
      const classes = capturas(css, /\.(-?[_a-zA-Z][\w-]*)/g);
      expect(classes.every((classe) => classe === campo || classe.startsWith(`${campo}__`))).toBe(true);
    }
  });

  it('centraliza os tokens e não deixa referências de tema quebradas', () => {
    const declarados = capturas(ler('tokens.css'), /(--[\w-]+)\s*:/g);
    const estilos = campos.map((campo) => ler(`${campo}/${campo}.css`)).join('\n');
    const usados = [...new Set(capturas(estilos, /var\(\s*(--[\w-]+)/g))];
    expect(declarados.length).toBeGreaterThan(0);
    expect(declarados.every((token) => token.startsWith('--op-ui-'))).toBe(true);
    expect(capturas(estilos, /(--[\w-]+)\s*:/g)).toEqual([]);
    expect(usados.sort()).toEqual(declarados.sort());
  });
});
