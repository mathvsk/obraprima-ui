# ADR-0001 — Arquitetura do pacote

Status: aceita · Data: 30/10/2026

## Contexto

Desktop e mobile usam React com HTML/CSS e precisam compartilhar UI sem copiar código
ou importar a pasta de outro repositório.

## Decisão

Manter um único pacote, `@mathvsk/obraprima-ui`, em repositório próprio.

- TypeScript compila ESM e declarações em `dist/`, com imports relativos terminados em `.js`.
- CSS é copiado para `dist/` e importado uma vez pela aplicação.
- `exports` expõe apenas a raiz do pacote e `./estilos.css`, ambos com tipos.
- `files` distribui `dist/`; `sideEffects` preserva CSS.
- React 19 é peer: usamos o React do consumidor, inclusive `ref` como prop.
- Ferramentas de build, testes e documentação são dependências de desenvolvimento.
- `npm pack` serve para desenvolvimento e verificação do artefato, sem publicação.

## Consequências

O consumidor precisa de React DOM compatível e processamento de CSS, como Vite.
React Native não é atendido por esta implementação.
Não precisamos de monorepo, bundler de biblioteca ou CommonJS para os consumidores atuais.

A CI valida código e distribuição. Testar o pacote instalado é necessário para detectar
exports, tipos ou estilos ausentes, mesmo quando os testes do código-fonte passam.

## Fontes

- [Manifesto npm](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/)
- [Opções TypeScript para bibliotecas](https://www.typescriptlang.org/docs/handbook/modules/guides/choosing-compiler-options#im-writing-a-library)
