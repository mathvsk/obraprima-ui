# Obra Prima UI

Biblioteca de componentes React compartilhada entre o desktop e o mobile do Obra Prima.
Pacote: **`@mathvsk/obraprima-ui`**, distribuído pelo GitHub Packages.

Os consumidores usam React 19 com HTML/CSS e React DOM. A biblioteca fornece componentes controlados,
CSS e tipos TypeScript; as aplicações cuidam de validação, tradução, navegação e APIs.
O primeiro componente é o [OpInputTexto](docs/referencia/op-input-texto.md).

## Desenvolver

Use o Node indicado em `.nvmrc`. No nvm-windows: `nvm install 24.22.2` e `nvm use 24.22.2`.

```bash
npm ci
npm run check
npm run storybook
```

- `check`: testes, tipos, lint e instalação do pacote em uma aplicação temporária.
- `build`: JavaScript ESM, tipos e CSS em `dist/`.
- `storybook`: vitrine local em `http://localhost:6006`.
- `build-storybook`: vitrine estática em `storybook-static/`.
- `npm pack`: artefato local para experimentar antes da publicação.

As pastas geradas e os arquivos `.tgz` não são versionados. As ferramentas ficam em
`devDependencies`; o React é uma `peerDependency`, fornecida pelo consumidor.

## Instalar e usar

Depois da primeira publicação e da [configuração de acesso](docs/guias/usar-num-consumidor.md):

```bash
npm install --save-exact @mathvsk/obraprima-ui
```

Importe o CSS uma vez no ponto de entrada da aplicação:

```tsx
import '@mathvsk/obraprima-ui/estilos.css';
import { OpInputTexto } from '@mathvsk/obraprima-ui';

<OpInputTexto id="nome" label="Nome" value={nome} onChange={setNome} />;
```

## Organização

| Pasta/arquivo | Responsabilidade |
| --- | --- |
| `src/index.ts` | API pública dos componentes e tipos |
| `src/op-input-texto/` | Componente, lógica, contrato, CSS, testes e histórias |
| `src/estilos.css`, `src/tokens.css` | Estilos e tema compartilhado |
| `.storybook/` | Configuração da vitrine |
| `tests/consumidor/` | Aplicação que testa o pacote instalado |
| `scripts/` | Preparação da distribuição e verificação do pacote |
| `.github/workflows/` | CI, PR de versão e publicação |
| `docs/decisoes/` | As três decisões de arquitetura vigentes |

## Trabalhar e publicar

**Branch → PR → CI → revisão → squash na main → PR de versão → revisão → publicação.**

O release-please mantém versão, changelog e tags. O merge do PR de versão autoriza a publicação
pela CI; cada aplicação escolhe quando atualizar o pacote. A primeira versão prevista é `0.1.0`.

- [Configurar o GitHub e entender o fluxo de PRs e versões](docs/guias/gerar-uma-versao.md)
- [Instalar e atualizar nas aplicações](docs/guias/usar-num-consumidor.md)
- [Criar um componente](docs/guias/criar-um-campo.md)
- [Usar o Storybook](docs/guias/usar-a-vitrine.md)
- [Contrato do input](docs/referencia/op-input-texto.md) e [tokens de tema](docs/referencia/tokens.md)
- [Decisões atuais](docs/decisoes/README.md)
