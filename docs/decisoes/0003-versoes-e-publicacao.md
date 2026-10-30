# ADR-0003 — Versões e publicação

Status: aceita · Data: 30/10/2026

## Contexto

As aplicações precisam instalar versões identificáveis e escolher quando atualizar.
O código e a distribuição ficam no GitHub.

## Decisão

- Repositório `mathvsk/obraprima-ui`; pacote `@mathvsk/obraprima-ui` no GitHub Packages.
- `publishConfig.registry` indica o registry de publicação.
- Sem `private: true`: esse campo bloquearia a publicação. A visibilidade é configurada no GitHub.
- PRs de código entram por squash, com título em Conventional Commits conferido pela CI.
- Release-please abre um PR com versão e changelog; o mantenedor revisa e faz o merge.
- Depois do merge, o workflow valida a `main`, cria tag/release e publica o SHA correspondente com
  `GITHUB_TOKEN` e `packages: write`.
- A primeira versão é `0.1.0`: manifesto inicialmente vazio, `initial-version` explícita,
  sem hashes do histórico anterior.
- Em `0.x`: correção incrementa patch; funcionalidade ou quebra incrementa minor.
  A partir de `1.0.0`, quebra incrementa major.

## Consequências

Publicação não atualiza aplicações. Os consumidores mantêm versão exata e lockfile.
Desenvolvedores precisam autenticar a leitura; CIs consumidoras precisam de acesso ao pacote.
O merge do PR de versão é a decisão de publicar, sem aprovação automática pelo bot.

PRs abertos pelo token da automação podem exigir **Approve workflows to run** para executar a CI.
Essa autorização não equivale à aprovação da revisão de código nem ao merge.
A publicação permanece no workflow de release, pois eventos de tags geradas pelo token não devem
ser usados como único gatilho.

## Fontes

- [GitHub Packages para npm](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
- [Release-please](https://github.com/googleapis/release-please-action)
- [Eventos gerados por GITHUB_TOKEN](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow)
- [SemVer](https://semver.org/)
