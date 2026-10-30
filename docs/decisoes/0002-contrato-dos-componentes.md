# ADR-0002 — Contrato dos componentes

Status: aceita · Data: 30/10/2026

## Contexto

Os componentes precisam ter o mesmo comportamento no desktop e no mobile,
preservando o tema de cada aplicação e uma organização previsível para manutenção.

## Decisão

- Campos controlados: `value` entra, `onChange` informa o novo valor.
- Props em inglês, textos prontos fornecidos pela aplicação e referência ao elemento de foco.
- Validação de negócio, tradução e chamadas de API ficam no consumidor.
- Pasta e classes `op-<nome>`; componente `Op<Nome>`; tokens `--op-ui-*`.
- Visualização em `Op<Nome>.tsx`, lógica em `Op<Nome>.logic.ts` e tipos em
  `Op<Nome>.interface.ts`. Os hooks e tipos de lógica são internos.
- HTML semântico e estados por atributos como `disabled` e `aria-invalid`.
- CSS próprio, com tokens em `tokens.css`. `:where(:root)` permite ao consumidor sobrescrever o tema.
- Testes verificam comportamento; Storybook apresenta os estados visuais de cada componente.

## Consequências

Cada campo tem uma pasta com implementação, CSS, testes e histórias.
A API pública exporta componentes e tipos de props.
Novas props, tokens e abstrações entram quando houver uso real.
Comentários explicam motivos ou limitações; não exigimos tags ou documentação duplicada em código.

O Storybook é uma ferramenta de desenvolvimento. Seus arquivos não fazem parte do pacote instalado.
