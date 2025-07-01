# Configuração do Banco de Dados PostgreSQL (Supabase)

## Como configurar a senha do banco de dados

### 1. Obter a senha do Supabase

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto
3. Vá em **Settings** → **Database**
4. Na seção **Connection info**, você encontrará a senha ou poderá resetá-la

### 2. Configurar no arquivo .env

No arquivo `backend/.env`, substitua `[YOUR-PASSWORD]` pela senha real do seu banco de dados Supabase:

```bash
# Antes:
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.qplmjhcrilcsfxbocaei.supabase.co:5432/postgres
DATABASE_PASSWORD=[YOUR-PASSWORD]

# Depois (exemplo):
DATABASE_URL=postgresql://postgres:suaSenhaAqui123@db.qplmjhcrilcsfxbocaei.supabase.co:5432/postgres
DATABASE_PASSWORD=suaSenhaAqui123
```

### 3. Verificar a configuração

Após configurar a senha, você pode testar a conexão executando:

```bash
cd backend
npm run develop
```

### 4. Migração de dados (se necessário)

Se você tinha dados no SQLite e quer migrar para o PostgreSQL:

1. **Backup dos dados atuais** (se existirem):
   ```bash
   # Execute no diretório backend
   npm run strapi export -- --file backup-data.tar.gz
   ```

2. **Limpar o banco PostgreSQL** (se necessário)

3. **Importar os dados**:
   ```bash
   npm run strapi import -- --file backup-data.tar.gz
   ```

### 5. Configurações importantes

- **SSL**: Está habilitado (`DATABASE_SSL=true`) - necessário para o Supabase
- **Pool de conexões**: Configurado para min: 2, max: 10
- **Schema**: Usando o schema padrão `public`

### 6. Troubleshooting

Se encontrar erros de conexão:

1. Verifique se a senha está correta
2. Confirme se o IP está autorizado no Supabase (ou se está usando 0.0.0.0/0 para permitir todos)
3. Verifique se o SSL está habilitado
4. Teste a conexão diretamente com psql:
   ```bash
   psql "postgresql://postgres:suaSenha@db.qplmjhcrilcsfxbocaei.supabase.co:5432/postgres"
   ```

## Segurança

⚠️ **IMPORTANTE**: Nunca commite o arquivo `.env` com senhas reais no Git. O arquivo `.env` deve estar no `.gitignore`.
