#!/usr/bin/env node

/**
 * Script para testar a conexão com o banco de dados PostgreSQL
 * Execute: node test-database-connection.js
 */

const { Client } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testando conexão com o banco de dados PostgreSQL...\n');
    const config = {
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
    // Forçar IPv4 e configurações adicionais
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    family: 4, // Forçar IPv4
    keepAlive: true
  };

  // Remover [YOUR-PASSWORD] se ainda estiver presente
  if (config.connectionString && config.connectionString.includes('[YOUR-PASSWORD]')) {
    console.error('❌ Erro: Você precisa substituir [YOUR-PASSWORD] pela senha real do banco de dados!');
    console.log('📋 Edite o arquivo .env e substitua [YOUR-PASSWORD] pela sua senha do Supabase.\n');
    process.exit(1);
  }

  console.log('📋 Configuração do banco:');
  console.log(`   Host: ${process.env.DATABASE_HOST}`);
  console.log(`   Port: ${process.env.DATABASE_PORT}`);
  console.log(`   Database: ${process.env.DATABASE_NAME}`);
  console.log(`   Username: ${process.env.DATABASE_USERNAME}`);
  console.log(`   SSL: ${process.env.DATABASE_SSL}`);
  console.log(`   URL: ${process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@')}\n`);

  const client = new Client(config);

  try {
    console.log('🔌 Conectando...');
    await client.connect();
    console.log('✅ Conexão estabelecida com sucesso!');

    console.log('\n🔍 Testando query simples...');
    const result = await client.query('SELECT version()');
    console.log('✅ Query executada com sucesso!');
    console.log(`📋 Versão do PostgreSQL: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);

    console.log('\n🔍 Verificando esquemas disponíveis...');
    const schemas = await client.query(`
      SELECT schema_name 
      FROM information_schema.schemata 
      WHERE schema_name NOT IN ('information_schema', 'pg_catalog', 'pg_toast')
      ORDER BY schema_name
    `);
    console.log('📋 Esquemas disponíveis:');
    schemas.rows.forEach(row => console.log(`   - ${row.schema_name}`));

    console.log('\n🎉 Teste de conexão finalizado com sucesso!');
    console.log('💡 Seu Strapi está pronto para usar o banco PostgreSQL do Supabase.');

  } catch (error) {
    console.error('\n❌ Erro na conexão:');
    console.error(`   ${error.message}`);
    
    if (error.message.includes('password authentication failed')) {
      console.log('\n💡 Dicas para resolver:');
      console.log('   1. Verifique se a senha está correta no arquivo .env');
      console.log('   2. Acesse o painel do Supabase e confirme/redefina a senha');
    } else if (error.message.includes('connection') || error.message.includes('timeout')) {
      console.log('\n💡 Dicas para resolver:');
      console.log('   1. Verifique sua conexão com a internet');
      console.log('   2. Confirme se o host está correto');
      console.log('   3. Verifique se o SSL está habilitado');
    }
    
    process.exit(1);
  } finally {
    await client.end();
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = testConnection;
