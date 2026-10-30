# Tokens

> Referência. Decisão: [contrato dos componentes](../decisoes/0002-contrato-dos-componentes.md). Fonte única:
> `src/tokens.css`. Verificado por `src/regras.test.ts`.

Variáveis CSS que os campos usam. O pacote declara os valores padrão (tema claro do desktop) em
`:where(:root)`, com especificidade zero; qualquer declaração do consumidor vence.

| Token | Padrão | Uso | No tema do Clientes (`opweb`) |
| --- | --- | --- | --- |
| `--op-ui-superficie` | `#ffffff` | fundo do campo | `--surface` |
| `--op-ui-texto` | `#172033` | texto digitado | `--ink` |
| `--op-ui-texto-suave` | `#647386` | rótulo | `--muted` |
| `--op-ui-borda` | `#d9e1e9` | borda em repouso | `--line` |
| `--op-ui-foco` | `#225c86` | borda e anel no foco | `--brand-2` |
| `--op-ui-erro` | `#c9424d` | borda e mensagem de erro | `--crit` |
| `--op-ui-raio` | `9px` | arredondamento | `--r-sm` |

## Ligar ao tema do consumidor

Uma vez, no CSS de tema da aplicação:

```css
:root {
  --op-ui-superficie: var(--surface);
  --op-ui-texto: var(--ink);
  --op-ui-texto-suave: var(--muted);
  --op-ui-borda: var(--line);
  --op-ui-foco: var(--brand-2);
  --op-ui-erro: var(--crit);
  --op-ui-raio: var(--r-sm);
}
```

Como os tokens apontam para as variáveis do tema, o tema escuro passa a valer nos campos sem CSS extra.
Também dá para sobrescrever num contêiner (`.minha-tela { --op-ui-borda: … }`), e o valor vale só ali.

## Regras

- Todo token começa com `--op-ui-` e é declarado só em `src/tokens.css`.
- Todo token declarado é usado por algum campo, e todo token usado está declarado.
- Medidas que não variam por tema (altura, espaçamento, tamanho de fonte) ficam no CSS do campo, não
  viram token.
