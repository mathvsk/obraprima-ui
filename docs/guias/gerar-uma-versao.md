# PRs, versões e publicação

## Preparar o repositório novo

Crie no GitHub o repositório vazio **mathvsk/obraprima-ui**, sem README, licença ou gitignore gerados.
A branch principal é `main`. O `origin` local já aponta para esse endereço.

Antes do primeiro push, em **Settings → Actions → General**, permita as Actions usadas e habilite
**Allow GitHub Actions to create and approve pull requests**. O workflow tem permissões próprias;
não é necessário liberar escrita global. Essa opção permite ao bot criar PRs, mas nosso workflow
não aprova nem mescla PRs automaticamente.

Depois, envie o histórico local:

```bash
git push -u origin main
```

O primeiro push executa os checks e propõe o PR da versão `0.1.0`; não publica o pacote imediatamente.
Se a criação do PR falhar por configuração do GitHub, ajuste a permissão e execute
**Gerar e publicar versão → Run workflow → main**.

## Configurar a revisão

Em **Settings → General → Pull Requests**, habilite squash merge. Use o título do PR como mensagem
do commit e evite outras formas de merge para manter o histórico simples.

Após a primeira execução da CI, configure a proteção de `main`:

- Exigir PR para alterar a branch, inclusive para administradores, e resolver as conversas antes
  do merge.
- Exigir os checks **Qualidade do pacote** e **Título do PR**, escolhendo os resultados da CI de PR.
- Exigir branch atualizada antes do merge; bloquear force push e exclusão.
- Não exigir aprovação. O GitHub não deixa o autor aprovar o próprio PR, e cada mantenedor precisa
  mesclar sozinho quando o outro estiver ausente. Revise o diff e os checks antes de mesclar; peça
  a revisão do outro mantenedor quando ele estiver disponível.

A disponibilidade de proteção depende do plano e da visibilidade do repositório.
[Documentação de branches protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).

## Entregar uma mudança

1. Crie uma branch, por exemplo `feat/campo-data` ou `fix/foco-input`.
2. Altere o componente, testes, histórias e referência quando necessário.
3. Rode `npm run check` e `npm run build-storybook`.
4. Faça push da branch e abra o PR para `main`. Descreva comportamento, impacto e validação.
5. Aguarde a CI, revise o diff e confira os estados no Storybook.
6. Faça **Squash and merge**. A mensagem final precisa seguir a tabela abaixo.

| Impacto | Título do PR | Em 0.x | Em 1.x ou superior |
| --- | --- | --- | --- |
| Correção compatível | `fix: corrigir foco do input` | patch | patch |
| Funcionalidade compatível | `feat: adicionar campo de data` | minor | minor |
| Quebra do contrato | `feat!: remover uma propriedade` | minor | major |
| Só docs ou manutenção | `docs: explicar os tokens` / `chore: atualizar ferramentas` | sem release isolada | sem release isolada |

Quebras também podem ser descritas por `BREAKING CHANGE:` no corpo do commit.
A regra de 0.x é a política explícita deste projeto.

## Aprovar a versão

Após o merge do código, a automação abre ou atualiza **um PR de release**, agrupando as mudanças
ainda não publicadas. Ele atualiza `package.json`, lockfile, manifesto e `CHANGELOG.md`.

No PR do bot, o GitHub pode exibir **Approve workflows to run**. Um usuário com escrita autoriza a
execução da CI. Isso é diferente de **Review changes → Approve**, que registra a revisão, e de
**Merge**, que efetiva a versão. O workflow **Verificar pacote** também pode ser disparado manualmente
no branch do PR para verificar o mesmo commit, se necessário.
[Comportamento de GITHUB_TOKEN](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow).

Confira a versão proposta, as notas e os checks. Quando estiver pronto para disponibilizar,
mescle o PR de release preservando sua mensagem gerada. A automação:

1. Valida a `main` e cria a tag `vX.Y.Z` e a GitHub Release.
2. Faz checkout do SHA da release, gera o pacote e publica no GitHub Packages.

Não use `npm version` nem crie tags manualmente no fluxo normal.
Para adotar `1.0.0`, revise o contrato estável e use o
[procedimento de versão explícita](https://github.com/googleapis/release-please#how-do-i-change-the-version-number).

## Acesso e atualização das aplicações

Depois da primeira publicação, confira o pacote em **Packages**. A visibilidade inicial é privada;
configure quem pode instalar e conceda leitura às CIs consumidoras em **Manage Actions access**.
A publicação usa o token automático do workflow; o acesso de leitura segue o
[guia do consumidor](usar-num-consumidor.md).

Cada aplicação instala a versão escolhida, versiona o lockfile, executa seus checks e faz sua entrega.
A lib publicar uma versão não atualiza automaticamente desktop ou mobile.

## Quando algo falhar

- **CI do código falhou:** corrija na mesma branch; não mescle até passar.
- **Título do PR falhou:** edite o título seguindo a tabela; o check roda de novo.
- **PR do bot aguarda CI:** autorize os workflows no banner do PR; confira proteção e permissões.
- **Publicação falhou depois da release:** resolva a causa e use **Re-run failed jobs** na mesma
  execução. Isso preserva os outputs do job de release; repetir tudo pode pular a publicação
  porque a release já existe.
- **Versão já publicada:** não tente substituir seu conteúdo. Uma correção recebe nova versão.
- **Instalação retorna 401/403:** confira login e acesso de leitura ao pacote.

`npm view @mathvsk/obraprima-ui versions --registry=https://npm.pkg.github.com` lista as versões
com autenticação válida. Uma GitHub Release sem publicação bem-sucedida não comprova que o pacote
está disponível no registry.
