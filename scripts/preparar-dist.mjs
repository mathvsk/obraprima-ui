import { cpSync, rmSync, statSync } from 'node:fs';

const ehPastaOuArquivoEstatico = (caminho) => statSync(caminho).isDirectory()
  || caminho.endsWith('.css') || caminho.endsWith('.d.ts');

rmSync('dist', { recursive: true, force: true });
cpSync('src', 'dist', { recursive: true, filter: ehPastaOuArquivoEstatico });
