# Salom Beauty - Mobile Service Site (Vue.js)

Bem-vindo ao repositório oficial da versão Vue.js do site mobile da Salom Beauty. Este projeto foi migrado de React/Next.js para Vue 3 + Vite para oferecer uma experiência ainda mais performática e leve.

## 🚀 Tecnologias

- **Vue 3** (Composition API)
- **Vite** (Build tool ultrarrápido)
- **TypeScript** (Segurança de tipos)
- **Tailwind CSS** (Estilização utilitária)
- **Vue Router** (Navegação SPA)
- **Lucide Vue Next** (Ícones modernos)
- **Zod** (Validação de esquemas)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js v20.20.0 (recomendado usar `nvm`)

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/rogachdev/project-salom-service-site-mobile_vuejs.git
   cd project-salom-service-site-mobile_vuejs
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O projeto estará disponível em `http://localhost:5173`.

## 📦 Build e Deploy

Para gerar a versão de produção:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist`.

### GitHub Pages
Este projeto está configurado para deploy automático no GitHub Pages através do GitHub Actions. Qualquer push na branch `main` disparará o processo de build e deploy.

## 📂 Estrutura do Projeto

```
src/
├── assets/          # Estilos globais e recursos estáticos
├── components/      # Componentes Vue reutilizáveis
├── composables/     # Lógica reativa compartilhada (Hooks)
├── router/          # Configuração de rotas
├── services/        # Integração com APIs e lógica de negócios
├── types/           # Definições de tipos TypeScript
├── views/           # Páginas da aplicação
├── App.vue          # Componente raiz
└── main.ts          # Ponto de entrada
```

## 🎨 Funcionalidades

- **Design Responsivo Mobile-First**: Otimizado para qualquer dispositivo.
- **Dark Mode**: Suporte nativo a tema escuro com persistência.
- **Catálogo de Serviços**: Visualização detalhada com carrossel de imagens.
- **Agendamento**: Interface intuitiva para marcar horários.
- **Contato**: Formulário integrado e links para redes sociais.

---
Desenvolvido com excelência técnica e foco na experiência do usuário.
