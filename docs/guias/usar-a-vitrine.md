# Usar a vitrine

> Guia. Decisão: [contrato dos componentes](../decisoes/0002-contrato-dos-componentes.md).

A vitrine é o Storybook do Obra Prima UI: mostra cada campo em todos os estados, com o CSS do pacote, sem subir
um consumidor.

## Abrir

Na raiz do projeto:

```bash
npm run storybook
```

Abre em `http://localhost:6006`. Cada campo fica em **Campos**, com uma página **Docs** e uma história por
estado. Nos painéis de baixo:

- **Controls**: muda as propriedades na hora.
- **Actions**: mostra cada chamada de `onChange`.
- **Accessibility**: lista o que o axe encontrou (rótulo, contraste, ARIA).

## Escrever as histórias de um campo novo

Ao [criar um campo](criar-um-campo.md), crie `src/<campo>/Op<Nome>.stories.tsx` no formato de
`src/op-input-texto/OpInputTexto.stories.tsx`:

- `title: 'Campos/<campo>'` e `component: Op<Nome>`.
- Em `args`, os obrigatórios com valores de exemplo e `onChange: fn()`.
- O `render` com `useArgs`, que devolve o novo valor aos args. Sem isso, o campo controlado não muda ao
  digitar. Use `function Render(args)`, com nome em PascalCase, para a regra de hooks aceitar o
  `useArgs`.
- Uma história por estado da tabela *Estados visuais* da referência do campo. Estados de interação, como
  o foco, usam `play`.

O `src/regras.test.ts` falha se um campo não tiver histórias.

## Gerar a vitrine estática

```bash
npm run build-storybook
```

Gera `storybook-static/`, um site estático que qualquer servidor de arquivos serve. A pasta é ignorada
pelo Git e não entra no `.tgz`.
