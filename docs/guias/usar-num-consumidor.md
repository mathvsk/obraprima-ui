# Usar o `@mathvsk/obraprima-ui` numa aplicação

> Guia para desktop e mobile React com HTML/CSS.
> Decisão: [versões e publicação](../decisoes/0003-versoes-e-publicacao.md).

## 1. Conferir compatibilidade e acesso

A aplicação precisa de React 19, React DOM compatível e processamento de CSS, como Vite.
Em TypeScript, mantenha `@types/react` e `@types/react-dom` compatíveis com React 19.
O pacote não inclui uma cópia própria do React.

As instruções de registry valem após a primeira publicação. No `.npmrc` da raiz do consumidor,
adicione e versione apenas o mapeamento:

```ini
@mathvsk:registry=https://npm.pkg.github.com
```

Na máquina de desenvolvimento, autentique com seu usuário GitHub e um **PAT clássico** com
`read:packages`, pertencente a uma conta que possa ler o pacote:

```bash
npm login --scope=@mathvsk --auth-type=legacy --registry=https://npm.pkg.github.com
```

Informe o token no prompt de senha, sem colocá-lo em comandos versionados. A autenticação fica na
configuração do usuário. GitHub Packages exige autenticação para npm mesmo com pacote público.
[Documentação oficial](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

## 2. Instalar a versão escolhida

Para escolher a versão mais recente no momento da instalação e salvá-la exatamente:

```bash
npm install --save-exact @mathvsk/obraprima-ui
```

No `opweb`, use o workspace que consome o campo:

```bash
npm install --save-exact @mathvsk/obraprima-ui --workspace=op-clientes-web
```

Para escolher outra versão, use `@mathvsk/obraprima-ui@X.Y.Z`, substituindo `X.Y.Z` por uma versão publicada.
Versione `package.json` e `package-lock.json`. Na CI, use `npm ci`.

## 3. Importar o componente e o CSS

Importe o componente onde for usar e o CSS no ponto de entrada da aplicação:

```tsx
import { OpInputTexto } from '@mathvsk/obraprima-ui';
import '@mathvsk/obraprima-ui/estilos.css';
```

O CSS entra uma única vez, no `main.tsx`. Não crie aliases para `src/` nem para `dist/`.
Se estiver substituindo um pacote piloto instalado por arquivo, remova a dependência antiga e
atualize os imports; remova o `.tgz` apenas quando nenhum workspace depender dele.

## 4. Ligar tema e estado

Mapeie os tokens no CSS de tema conforme [Tokens](../referencia/tokens.md#ligar-ao-tema-do-consumidor).
Sem isso, o campo usa as cores padrão do tema claro.

```tsx
import { OpInputTexto } from '@mathvsk/obraprima-ui';

<OpInputTexto id="cli-nome" ref={nomeRef} label={rotuloNome} value={form.nome}
  onChange={(valor) => definirCampo('nome', valor)} maxLength={100} error={erros.nome?.[0]} />;
```

O contêiner da tela cuida da posição. Validação, foco, tradução e chamadas de API ficam na aplicação.

## 5. Configurar a CI do consumidor

Em **Packages → obraprima-ui → Package settings → Manage Actions access**, conceda leitura ao repositório
consumidor. Configure o job dele com `contents: read` e `packages: read`. No step
`actions/setup-node` existente, acrescente:

```yaml
with:
  registry-url: https://npm.pkg.github.com
  scope: '@mathvsk'
```

No step de instalação:

```yaml
- run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Fora do GitHub Actions, use um secret de leitura apropriado para o registry.

## 6. Conferir e atualizar

Rode os checks da aplicação e confira repouso, foco, erro e desabilitado no desktop e numa tela pequena.
Publicar a biblioteca não atualiza automaticamente nenhuma aplicação. Para atualizar, repita a
instalação com a versão escolhida, confira o changelog e faça a entrega normal do consumidor.

## Testar uma alteração local

Gere o `.tgz` com `npm pack` na biblioteca, copie para uma pasta local do consumidor e instale pelo
caminho do arquivo (`npm install ./pacotes/mathvsk-obraprima-ui-<versão>.tgz`). Isso não exige autenticação
no GitHub Packages. Volte à dependência por versão antes de entregar a aplicação.
