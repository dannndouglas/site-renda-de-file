# 🚀 Guia de Deploy Passo a Passo - Portal da Renda de Filé

## ✅ Pré-requisitos
- [ ] Conta no GitHub (seu código já está lá)
- [ ] Conta no Render (gratuita): https://render.com
- [ ] Conta no Vercel (gratuita): https://vercel.com

## 📋 Etapa 1: Deploy do Backend (Strapi) no Render

### 1.1 Criar conta e conectar repositório
1. Acesse https://render.com e crie uma conta
2. Clique em "New +" → "Web Service"
3. Conecte sua conta do GitHub
4. Selecione o repositório `site-renda-de-file`

### 1.2 Configurar Web Service
- **Name**: `strapi-renda-de-file`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` (mais próximo e gratuito)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`

### 1.3 Configurar variáveis de ambiente
Na seção "Environment Variables", adicione:

```
NODE_ENV=production
HOST=0.0.0.0
PORT=10000
DATABASE_CLIENT=postgres
DATABASE_SSL=true
APP_KEYS=SuaChaveAqui123,OutraChave456
API_TOKEN_SALT=SeuTokenSalt789
ADMIN_JWT_SECRET=SeuAdminSecret123
TRANSFER_TOKEN_SALT=SeuTransferSalt456
JWT_SECRET=SeuJWTSecret789
```

### 1.4 Criar banco PostgreSQL
1. No dashboard do Render, clique em "New +" → "PostgreSQL"
2. **Name**: `postgres-renda-de-file`
3. **Database Name**: `strapi`
4. **User**: `strapi`
5. **Region**: `Oregon (US West)`
6. Clique em "Create Database"

### 1.5 Conectar banco ao Strapi
1. Após criar o banco, copie a "External Database URL"
2. Volte ao seu Web Service do Strapi
3. Adicione a variável de ambiente:
   - **Key**: `DATABASE_URL`
   - **Value**: Cole a URL do banco PostgreSQL

### 1.6 Deploy
1. Clique em "Create Web Service"
2. Aguarde o build (pode levar 5-10 minutos)
3. Anote a URL do seu backend (ex: `https://strapi-renda-de-file.onrender.com`)

## 📋 Etapa 2: Deploy do Frontend (Next.js) no Vercel

### 2.1 Criar conta e conectar repositório
1. Acesse https://vercel.com e crie uma conta
2. Clique em "New Project"
3. Conecte sua conta do GitHub
4. Selecione o repositório `site-renda-de-file`

### 2.2 Configurar projeto
- **Framework Preset**: `Next.js`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (deixe padrão)
- **Output Directory**: `.next` (deixe padrão)
- **Install Command**: `npm install` (deixe padrão)

### 2.3 Configurar variáveis de ambiente
Na seção "Environment Variables", adicione:

```
NEXT_PUBLIC_STRAPI_URL=https://strapi-renda-de-file.onrender.com
```

### 2.4 Deploy
1. Clique em "Deploy"
2. Aguarde o build (2-5 minutos)
3. Anote a URL do seu frontend (ex: `https://seu-projeto.vercel.app`)

## 📋 Etapa 3: Configurar CORS

### 3.1 Atualizar CORS no Strapi
1. Acesse o arquivo `backend/config/middlewares.ts`
2. Na linha onde está o comentário, substitua por sua URL do Vercel:
   ```typescript
   'https://seu-projeto.vercel.app'
   ```
3. Faça commit e push das alterações
4. O Render fará redeploy automaticamente

## 📋 Etapa 4: Configurar Strapi Admin

### 4.1 Acessar admin do Strapi
1. Acesse `https://strapi-renda-de-file.onrender.com/admin`
2. Crie sua conta de administrador
3. Faça login no painel admin

### 4.2 Configurar permissões da API
1. Vá em "Settings" → "Users & Permissions Plugin" → "Roles"
2. Clique em "Public"
3. Expanda todas as seções e marque "find" e "findOne" para:
   - Associacao
   - Galeria-destaque
   - Noticia-evento
   - Pagina-sobre
   - Produto
4. Clique em "Save"

## 📋 Etapa 5: Testar integração

### 5.1 Verificar comunicação
1. Acesse seu frontend no Vercel
2. Verifique se as páginas carregam sem erros
3. Teste se o conteúdo do Strapi aparece

### 5.2 Adicionar conteúdo inicial
1. No admin do Strapi, adicione:
   - Informações da página "Sobre"
   - Algumas associações
   - Produtos
   - Notícias/eventos
   - Galeria em destaque

## 🎯 URLs Finais

Após completar todos os passos:
- **Frontend**: `https://seu-projeto.vercel.app`
- **Backend**: `https://strapi-renda-de-file.onrender.com`
- **Admin**: `https://strapi-renda-de-file.onrender.com/admin`

## 🔧 Troubleshooting

### Problema: CORS Error
**Solução**: Verifique se adicionou a URL do Vercel no arquivo middlewares.ts

### Problema: Database Connection Error
**Solução**: Verifique se a DATABASE_URL está correta no Render

### Problema: Build Error no Render
**Solução**: Verifique se o Root Directory está como "backend"

### Problema: Imagens não carregam
**Solução**: Verifique se as permissões da API estão configuradas

## 📞 Próximos Passos

Após o deploy:
1. Configure um domínio personalizado (opcional)
2. Configure Google Maps API (se necessário)
3. Configure backup automático
4. Configure monitoramento de uptime

## 💡 Dicas Importantes

- O Render pode "dormir" após 15 minutos de inatividade (plano gratuito)
- O primeiro acesso após inatividade pode demorar 30-60 segundos
- Mantenha suas variáveis de ambiente seguras
- Faça backup regular do conteúdo do Strapi
