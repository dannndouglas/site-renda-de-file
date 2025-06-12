# Guia de Deploy - Portal da Renda de Filé de Jaguaribe

Este documento contém instruções para fazer o deploy do sistema completo em produção.

## Arquitetura

- **Frontend**: Next.js (React) - Deploy no Vercel
- **Backend**: Strapi (Node.js) - Deploy no Render/Heroku
- **Banco de Dados**: PostgreSQL
- **Arquivos**: Upload local ou AWS S3

## Deploy do Backend (Strapi)

### Opção 1: Render (Recomendado)

1. **Criar conta no Render**: https://render.com
2. **Conectar repositório GitHub**
3. **Criar Web Service**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Environment: Node.js

4. **Configurar variáveis de ambiente**:
   ```
   NODE_ENV=production
   DATABASE_CLIENT=postgres
   DATABASE_URL=postgresql://user:password@host:port/database
   JWT_SECRET=your-jwt-secret-here
   ADMIN_JWT_SECRET=your-admin-jwt-secret-here
   APP_KEYS=your-app-keys-here
   API_TOKEN_SALT=your-api-token-salt-here
   TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
   HOST=0.0.0.0
   PORT=10000
   ```

5. **Criar PostgreSQL Database**:
   - No Render, criar um PostgreSQL database
   - Copiar a DATABASE_URL para as variáveis de ambiente

### Opção 2: Heroku

1. **Instalar Heroku CLI**
2. **Criar aplicação**:
   ```bash
   cd backend
   heroku create strapi-renda-de-file
   ```

3. **Adicionar PostgreSQL**:
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Configurar variáveis**:
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set ADMIN_JWT_SECRET=your-admin-jwt-secret
   heroku config:set APP_KEYS=your-app-keys
   heroku config:set API_TOKEN_SALT=your-api-token-salt
   heroku config:set TRANSFER_TOKEN_SALT=your-transfer-token-salt
   ```

5. **Deploy**:
   ```bash
   git push heroku main
   ```

## Deploy do Frontend (Next.js)

### Vercel (Recomendado)

1. **Conectar repositório no Vercel**: https://vercel.com
2. **Configurar projeto**:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Configurar variáveis de ambiente**:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://your-strapi-app.render.com
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
   ```

4. **Deploy automático**: O Vercel fará deploy automaticamente a cada push

### Netlify (Alternativa)

1. **Conectar repositório no Netlify**
2. **Configurar build**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/.next`

## Configuração do Google Maps

1. **Acessar Google Cloud Console**: https://console.cloud.google.com
2. **Criar projeto** ou selecionar existente
3. **Ativar APIs**:
   - Maps JavaScript API
   - Geocoding API
   - Places API

4. **Criar credenciais**:
   - Tipo: API Key
   - Restrições: Domínios web (adicionar seu domínio)

5. **Configurar a chave** nas variáveis de ambiente

## Configuração do Banco de Dados

### PostgreSQL em Produção

1. **Criar banco PostgreSQL** (Render, Heroku, ou provedor de sua escolha)
2. **Configurar conexão** no Strapi:
   ```javascript
   // config/database.ts
   export default ({ env }) => ({
     connection: {
       client: 'postgres',
       connection: {
         connectionString: env('DATABASE_URL'),
         ssl: env.bool('DATABASE_SSL', false) && {
           rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
         },
       },
       debug: false,
     },
   });
   ```

## Configuração de Upload de Arquivos

### Upload Local (Desenvolvimento)
Os arquivos são salvos na pasta `public/uploads`

### AWS S3 (Produção Recomendada)

1. **Instalar plugin**:
   ```bash
   npm install @strapi/provider-upload-aws-s3
   ```

2. **Configurar**:
   ```javascript
   // config/plugins.ts
   export default ({ env }) => ({
     upload: {
       config: {
         provider: 'aws-s3',
         providerOptions: {
           accessKeyId: env('AWS_ACCESS_KEY_ID'),
           secretAccessKey: env('AWS_ACCESS_SECRET'),
           region: env('AWS_REGION'),
           params: {
             Bucket: env('AWS_BUCKET'),
           },
         },
       },
     },
   });
   ```

## Checklist de Deploy

### Backend
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados PostgreSQL criado
- [ ] Strapi rodando em produção
- [ ] Admin panel acessível
- [ ] API endpoints funcionando

### Frontend
- [ ] Variáveis de ambiente configuradas
- [ ] Build passando sem erros
- [ ] Site acessível em produção
- [ ] Integração com Strapi funcionando
- [ ] Google Maps funcionando (se configurado)

### Conteúdo
- [ ] Usuário admin criado no Strapi
- [ ] Content Types criados
- [ ] Conteúdo inicial adicionado
- [ ] Imagens uploadadas
- [ ] Permissões de API configuradas

## Monitoramento

### Logs
- **Render**: Logs disponíveis no dashboard
- **Heroku**: `heroku logs --tail`
- **Vercel**: Logs no dashboard do Vercel

### Performance
- **Frontend**: Vercel Analytics
- **Backend**: Render/Heroku metrics
- **Uptime**: UptimeRobot ou similar

## Backup

### Banco de Dados
```bash
# Backup
pg_dump DATABASE_URL > backup.sql

# Restore
psql DATABASE_URL < backup.sql
```

### Arquivos
- Backup regular da pasta `uploads` ou bucket S3
- Versionamento no Git para código

## Domínio Personalizado

1. **Configurar DNS**:
   - Frontend: Apontar para Vercel
   - Backend: Apontar para Render/Heroku

2. **SSL**: Automático no Vercel e Render

3. **Atualizar variáveis**:
   - `NEXT_PUBLIC_STRAPI_URL` com novo domínio
   - Configurar CORS no Strapi

## Troubleshooting

### Problemas Comuns

1. **CORS Error**:
   - Verificar configuração de CORS no Strapi
   - Adicionar domínio frontend nas configurações

2. **Database Connection**:
   - Verificar DATABASE_URL
   - Verificar configurações SSL

3. **Build Errors**:
   - Verificar versões do Node.js
   - Limpar cache: `npm ci`

4. **Images não carregam**:
   - Verificar configuração de upload
   - Verificar permissões de pasta

### Logs Úteis

```bash
# Strapi logs
npm run develop -- --verbose

# Next.js build
npm run build -- --debug

# Database connection test
npm run strapi console
```

## Segurança

1. **Variáveis de ambiente**: Nunca commitar secrets
2. **HTTPS**: Sempre usar em produção
3. **CORS**: Configurar apenas domínios necessários
4. **Rate Limiting**: Configurar no Strapi
5. **Backup**: Backup regular de dados

## Suporte

Para dúvidas sobre deploy:
- Documentação Strapi: https://docs.strapi.io
- Documentação Next.js: https://nextjs.org/docs
- Documentação Vercel: https://vercel.com/docs
- Documentação Render: https://render.com/docs
