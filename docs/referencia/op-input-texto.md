# `op-input-texto`

> Referência. Decisão: [contrato dos componentes](../decisoes/0002-contrato-dos-componentes.md). Verificado por
> `src/op-input-texto/OpInputTexto.test.tsx`. Na vitrine: `Campos/op-input-texto`
> ([Usar a vitrine](../guias/usar-a-vitrine.md)).

Campo de texto de uma linha, controlado pela tela.

```tsx
import { OpInputTexto } from '@mathvsk/obraprima-ui';

<OpInputTexto
  id="cli-nome"
  ref={nomeRef}
  label={pf ? t('clientes:detalhe.nomeLabelPf') : t('clientes:detalhe.nomeLabelPj')}
  value={form.nome}
  onChange={(valor) => definirCampo('nome', valor)}
  maxLength={100}
  error={erros.nome?.[0]}
/>
```

## Propriedades (`OpInputTextoProps`)

| Propriedade | Tipo | Obrigatória | O que faz |
| --- | --- | --- | --- |
| `id` | `string` | sim | `id` do `<input>`. O rótulo e a mensagem de erro se ligam a ele. |
| `label` | `string` | sim | Texto do `<label>`, já traduzido. |
| `value` | `string` | sim | Valor mostrado no campo. |
| `onChange` | `(value: string) => void` | sim | Chamada a cada alteração, com o texto completo do campo (não com o evento). |
| `placeholder` | `string` | não | Texto de exemplo, já traduzido. |
| `disabled` | `boolean` | não | Desabilita o campo: não recebe foco nem edição. |
| `error` | `string` | não | Mensagem de erro, já traduzida. Com texto, o campo fica inválido. |
| `maxLength` | `number` | não | Limite de caracteres do `<input>`. |
| `ref` | `Ref<HTMLInputElement>` | não | Referência ao `<input>`, para a tela focar o campo. |

## HTML gerado

```html
<div class="op-input-texto">
  <label class="op-input-texto__rotulo" for="cli-nome">Nome</label>
  <input class="op-input-texto__campo" id="cli-nome" type="text" maxlength="100"
         aria-invalid="true" aria-describedby="cli-nome-erro">
  <p class="op-input-texto__erro" id="cli-nome-erro">Informe o nome.</p>
</div>
```

`aria-invalid`, `aria-describedby` e o `<p>` só existem quando `error` tem texto.

## Comportamento

- O campo não guarda estado: mostra `value` e avisa a alteração por `onChange`.
- O campo não valida e não usa `required`. A tela decide quando há erro e onde colocar o foco.
- O bloco ocupa toda a largura do contêiner (`width: 100%`, `min-width: 0`). A posição no formulário é
  do contêiner da tela.
- No Safari do iOS, a fonte do campo é 16px, para a tela não aproximar ao focar. Nos outros aparelhos,
  inclusive Windows com toque, o campo mantém a densidade do desktop, igual aos vizinhos.

## Estados visuais

| Estado | Como é marcado | Aparência |
| --- | --- | --- |
| Foco | `:focus` | Borda e anel de 1px em `--op-ui-foco` |
| Erro | `[aria-invalid='true']` | Borda em `--op-ui-erro`; mensagem abaixo, em `--op-ui-erro` |
| Desabilitado | `:disabled` | Opacidade 0,6 e cursor `not-allowed` |
