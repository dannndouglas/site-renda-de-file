# Portal da Renda de Filé de Jaguaribe

![Portal da Renda de Filé](https://img.shields.io/badge/Status-Completo-success)
![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black)
![Strapi](https://img.shields.io/badge/Strapi-5.15.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC)

Sistema web completo para o portal oficial da Renda de Filé de Jaguaribe, composto por um site público (frontend) e um painel de gerenciamento de conteúdo (backend). O objetivo é preservar a cultura, dar visibilidade e gerar oportunidades para as associações de artesãos do município.

## 🎯 Funcionalidades

### Site Público (Frontend)
- ✅ **Página Inicial**: Hero section, destaques das associações e últimas notícias
- ✅ **Sobre a Renda de Filé**: História e processo de criação da arte tradicional
- ✅ **Associações**: Lista e páginas detalhadas de cada associação
- ✅ **Produtos**: Galeria de produtos organizados por categoria
- ✅ **Notícias e Eventos**: Sistema de publicação de conteúdo
- ✅ **Contato**: Formulário de contato e informações
- ✅ **Integração Google Maps**: Localização das associações
- ✅ **Design Responsivo**: Otimizado para mobile, tablet e desktop
- ✅ **SEO Otimizado**: Meta tags, estrutura semântica

### Painel Administrativo (Backend)
- ✅ **CMS Headless**: Interface intuitiva para gerenciar conteúdo
- ✅ **Gestão de Associações**: CRUD completo com upload de imagens
- ✅ **Gestão de Produtos**: Categorização e galeria de fotos
- ✅ **Sistema de Notícias**: Editor rich text para conteúdo
- ✅ **Upload de Mídia**: Gerenciamento de imagens e arquivos
- ✅ **API REST**: Endpoints para consumo do frontend
- ✅ **Permissões**: Sistema de roles e permissões

## 🏗️ Arquitetura

### Frontend
- **Framework**: Next.js 15.3.3 (React 18)
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **Deploy**: Vercel
- **Funcionalidades**: SSR, SSG, Image Optimization

### Backend
- **CMS**: Strapi 5.15.0 (Headless)
- **Linguagem**: TypeScript/Node.js
- **Banco de Dados**: SQLite (dev) / PostgreSQL (prod)
- **Deploy**: Render/Heroku
- **API**: REST com autenticação JWT

### Integrações
- **Google Maps API**: Mapas interativos
- **Upload**: Local (dev) / AWS S3 (prod)
- **Email**: Formulário de contato

## 📁 Estrutura do Projeto

```
site-renda-de-file/
├── frontend/                 # Aplicação Next.js
│   ├── src/
│   │   ├── app/             # App Router (Next.js 13+)
│   │   ├── components/      # Componentes reutilizáveis
│   │   └── lib/            # Utilitários e configurações
│   ├── public/             # Arquivos estáticos
│   └── package.json
├── backend/                 # CMS Strapi
│   ├── src/
│   │   ├── api/            # Content Types e Controllers
│   │   └── components/     # Componentes reutilizáveis
│   ├── config/             # Configurações do Strapi
│   ├── scripts/            # Scripts utilitários
│   └── package.json
├── docs/                   # Documentação
├── docker-compose.yml      # Configuração Docker
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/site-renda-de-file.git
cd site-renda-de-file
```

### 2. Configure o Backend (Strapi)
```bash
cd backend
npm install
npm run develop
```

O Strapi estará disponível em: http://localhost:1337

### 3. Configure o Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

O site estará disponível em: http://localhost:3000

### 4. Configuração Inicial

1. **Acesse o painel do Strapi**: http://localhost:1337/admin
2. **Crie um usuário administrador**
3. **Configure os Content Types** (se necessário)
4. **Configure as permissões da API**:
   - Settings > Users & Permissions > Roles > Public
   - Habilite as permissões de leitura para todos os content types

## 📊 Modelos de Dados

### Associacao
```typescript
{
  nome: string
  historia: richtext
  logo: media
  endereco_completo: string
  slug: uid
  contatos: {
    telefone?: string
    email?: string
    whatsapp?: string
    instagram?: string
    facebook?: string
  }
  galeria_fotos: media[]
  produtos: relation[]
}
```

### Produto
```typescript
{
  nome: string
  descricao: richtext
  categoria: enum
  slug: uid
  preco?: number
  disponivel: boolean
  fotos_produto: media[]
  associacao_origem: relation
}
```

### NoticiaEvento
```typescript
{
  titulo: string
  conteudo: richtext
  data_evento?: datetime
  slug: uid
  tipo: enum
  imagem_destaque: media
  galeria: media[]
}
```

### PaginaSobre
```typescript
{
  titulo_pagina: string
  conteudo_historia: richtext
  conteudo_processo_criacao: richtext
  imagem_principal: media
  galeria_processo: media[]
  video_processo: media
}
```

## 🌐 Deploy

### Frontend (Vercel)
1. Conecte o repositório no Vercel
2. Configure as variáveis de ambiente:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://seu-strapi.render.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua-chave-google-maps
   ```

### Backend (Render)
1. Conecte o repositório no Render
2. Configure as variáveis de ambiente:
   ```
   NODE_ENV=production
   DATABASE_URL=postgresql://...
   JWT_SECRET=seu-jwt-secret
   ADMIN_JWT_SECRET=seu-admin-jwt-secret
   APP_KEYS=suas-app-keys
   ```

📖 **Documentação completa de deploy**: [docs/DEPLOY.md](docs/DEPLOY.md)

## 🔧 Configurações

### Google Maps
1. Obtenha uma API key no Google Cloud Console
2. Ative as APIs: Maps JavaScript, Geocoding, Places
3. Configure a chave nas variáveis de ambiente

### Upload de Arquivos
- **Desenvolvimento**: Upload local na pasta `public/uploads`
- **Produção**: Recomendado AWS S3 ou similar

## 🧪 Dados de Exemplo

Execute o script para gerar dados de exemplo:
```bash
node backend/scripts/seed-data.js
```

Isso criará arquivos JSON com dados de exemplo que podem ser importados no Strapi.

## 📱 Páginas Implementadas

- ✅ `/` - Página inicial
- ✅ `/sobre` - Sobre a Renda de Filé
- ✅ `/associacoes` - Lista de associações
- ✅ `/associacoes/[slug]` - Detalhes da associação
- ✅ `/noticias` - Lista de notícias e eventos
- ✅ `/noticias/[slug]` - Detalhes da notícia
- ✅ `/contato` - Formulário de contato
- ✅ `/termos` - Termos de uso
- ✅ `/privacidade` - Política de privacidade
- ✅ `/404` - Página não encontrada

## 🎨 Design System

### Cores
- **Primária**: Amber (âmbar) - representa o dourado da tradição
- **Secundária**: Orange (laranja) - calor e acolhimento
- **Neutras**: Gray (cinza) - elegância e legibilidade

### Tipografia
- **Fonte**: Inter (Google Fonts)
- **Hierarquia**: h1-h6 bem definida
- **Responsividade**: Tamanhos adaptativos

### Componentes
- Header com navegação responsiva
- Footer informativo
- Cards para associações e produtos
- Formulários estilizados
- Loading states
- Error states

## 🤝 Contribuição

Este projeto visa preservar e promover a cultura da Renda de Filé de Jaguaribe. Contribuições são bem-vindas!

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Portal da Renda de Filé de Jaguaribe
- **Design**: Baseado na identidade cultural local
- **Conteúdo**: Associações de artesãs de Jaguaribe

## 📞 Contato

- **Email**: contato@rendadefilejaguaribe.com.br
- **Telefone**: (88) 99999-9999
- **Endereço**: Jaguaribe - CE, Brasil

---

**Preservando a tradição, conectando gerações** 🧵✨
