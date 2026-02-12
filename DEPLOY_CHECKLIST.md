# Checklist de Validação de Deploy (GitHub Pages)

Este documento serve como um guia para garantir que o deploy automático via GitHub Actions funcione corretamente.

## 1. Configurações do Repositório (Crítico)
Acesse as configurações do seu repositório no GitHub (`Settings` > `Pages`):

- [ ] **Source (Origem)**: Deve estar definido como **"GitHub Actions"** (Beta/Stable).
  - *Nota*: Se estiver como "Deploy from a branch", altere para "GitHub Actions". Isso é fundamental para que o workflow `deploy.yml` funcione.
- [ ] **Custom Domain (Opcional)**: Se estiver usando, verifique se o CNAME está correto e se o HTTPS está habilitado.

## 2. Configurações de Permissões (Actions)
Acesse `Settings` > `Actions` > `General` > `Workflow permissions`:

- [ ] **Read and write permissions**: Certifique-se de que esta opção esteja marcada.
- [ ] **Allow GitHub Actions to create and approve pull requests**: Opcional, mas recomendado para automações futuras.

## 3. Validação do Código Fonte
Verifique os seguintes arquivos no seu projeto local:

- [ ] **`vite.config.ts`**:
  - A propriedade `base` deve corresponder exatamente ao nome do repositório (ex: `/project-salom-service-site-mobile_vuejs/`).
  - Se o repositório for renomeado, este valor deve ser atualizado.

- [ ] **`package.json`**:
  - O script `build` deve gerar a pasta `dist` (ex: `"build": "vue-tsc -b && vite build"`).
  - O script `test` deve rodar sem erros (ex: `"test": "vitest"`).

## 4. Diagnóstico de Falhas Comuns

### Erro: "Action failed with exit code 1" no passo Build
- **Causa**: Erro de TypeScript ou falha no build do Vite.
- **Solução**: Rode `npm run build` localmente e corrija os erros apontados.

### Erro: "Permission denied" ou "403" no passo Deploy
- **Causa**: O token do GitHub Actions não tem permissão de escrita no ambiente Pages.
- **Solução**: Verifique o item 2 (Permissões) e certifique-se de que o arquivo `.github/workflows/deploy.yml` contém:
  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```

### Tela Branca (404) após Deploy
- **Causa**: Caminho base incorreto no `vite.config.ts` ou roteamento mal configurado.
- **Solução**:
  1. Verifique se `base` no `vite.config.ts` começa e termina com `/`.
  2. Verifique se o repositório é público (Pages gratuito) ou privado (Pages Pro).
  3. Verifique o console do navegador (F12) para erros de carregamento de recursos (JS/CSS).

## 5. Procedimento de Rollback (Emergência)
Caso um deploy quebre o site em produção:

1. Identifique o último commit estável na branch `main`.
2. Reverter o commit problemático localmente:
   ```bash
   git revert HEAD
   git push origin main
   ```
3. O GitHub Actions iniciará automaticamente um novo deploy com a versão anterior.
