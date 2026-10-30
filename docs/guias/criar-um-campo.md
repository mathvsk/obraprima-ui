# Criar um campo

Crie um componente quando uma tela precisar dele. Siga o
[contrato dos componentes](../decisoes/0002-contrato-dos-componentes.md).

## Estrutura

Para um campo de data:

```text
src/op-input-data/
├── OpInputData.tsx
├── OpInputData.logic.ts
├── OpInputData.interface.ts
├── OpInputData.test.tsx
├── OpInputData.stories.tsx
└── op-input-data.css
```

A visualização chama `useOpInputData(props)` e devolve JSX; o hook cuida da lógica de apresentação.
Props e tipos ficam no arquivo de interfaces. Use props em inglês, `value`, `onChange`, textos
fornecidos pela tela e `ref` para o elemento de foco. Regras de negócio ficam na aplicação.

Classes começam com `op-input-data`; partes internas usam `__parte`. Estados usam atributos HTML.
Reaproveite os tokens `--op-ui-*`; declare e documente tokens novos somente quando necessários.

## API pública

Em `src/index.ts`:

```ts
export { OpInputData } from './op-input-data/OpInputData.js';
export type { OpInputDataProps } from './op-input-data/OpInputData.interface.js';
```

Em `src/estilos.css`, depois dos tokens:

```css
@import './op-input-data/op-input-data.css';
```

## Conferir

Teste comportamento observável: edição, props controladas, foco, erro, desabilitado e associações
acessíveis. Escreva histórias para os estados visuais e confira o painel Accessibility.
Não crie testes apenas para reproduzir a implementação.

Documente a API em `docs/referencia/`, seguindo o
[input de texto](../referencia/op-input-texto.md), e atualize o README.

```bash
npm run check
npm run build-storybook
```

Abra o PR com título `feat: ...` e siga o [fluxo de publicação](gerar-uma-versao.md).
