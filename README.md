# Obra Prima UI

Base arquitetural da biblioteca React compartilhada entre desktop e mobile do Obra Prima.
Pacote: `@mathvsk/obraprima-ui`. Repositório: `mathvsk/obraprima-ui`.

## Desenvolvimento

Use o Node da `.nvmrc`.

```bash
npm ci
npm run check
npm pack
```

O check valida tipos, lint e build. TypeScript gera ESM e declarações; CSS é copiado para `dist/`.
O React 19 é fornecido pelo consumidor. Esta base ainda não exporta componentes.
Testes de comportamento, consumo do pacote e Storybook entram junto com a primeira entrega visual.

## Decisões e fluxo

- [Arquitetura, contrato e publicação](docs/decisoes/README.md)
- [Configurar o GitHub, revisar PRs e publicar versões](docs/guias/gerar-uma-versao.md)

O fluxo usa PRs com squash, Conventional Commits e release-please. O primeiro componente
será entregue em um commit `feat`, permitindo propor a primeira versão `0.1.0`.
