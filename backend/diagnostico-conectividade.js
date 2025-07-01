#!/usr/bin/env node

/**
 * Script para diagnóstico avançado de conectividade com Supabase
 */

const dns = require('dns').promises;
const net = require('net');

async function diagnosticarConectividade() {
  console.log('🔍 Diagnóstico de Conectividade com Supabase\n');
  
  const host = 'db.qplmjhcrilcsfxbocaei.supabase.co';
  const port = 5432;
  
  // Teste 1: Resolução DNS
  console.log('1️⃣ Testando resolução DNS...');
  try {
    const addresses = await dns.lookup(host, { all: true });
    console.log('✅ DNS resolvido com sucesso:');
    addresses.forEach((addr, i) => {
      console.log(`   ${i + 1}. ${addr.address} (${addr.family === 4 ? 'IPv4' : 'IPv6'})`);
    });
  } catch (error) {
    console.error('❌ Erro na resolução DNS:', error.message);
  }
  
  // Teste 2: Conectividade TCP
  console.log('\n2️⃣ Testando conectividade TCP...');
  try {
    await new Promise((resolve, reject) => {
      const socket = new net.Socket();
      const timeout = setTimeout(() => {
        socket.destroy();
        reject(new Error('Timeout na conexão'));
      }, 10000);
      
      socket.connect(port, host, () => {
        clearTimeout(timeout);
        socket.destroy();
        resolve();
      });
      
      socket.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
    console.log('✅ Conectividade TCP estabelecida com sucesso!');
  } catch (error) {
    console.error('❌ Erro na conectividade TCP:', error.message);
  }
  
  // Teste 3: Verificar se é problema de firewall/proxy
  console.log('\n3️⃣ Testando conectividade alternativa...');
  try {
    const testHosts = [
      'google.com',
      'supabase.com',
      '8.8.8.8'
    ];
    
    for (const testHost of testHosts) {
      try {
        await dns.lookup(testHost);
        console.log(`✅ ${testHost} - OK`);
      } catch (error) {
        console.log(`❌ ${testHost} - FALHOU: ${error.message}`);
      }
    }
  } catch (error) {
    console.error('❌ Erro no teste de conectividade:', error.message);
  }
  
  // Sugestões
  console.log('\n💡 Possíveis soluções:');
  console.log('1. Verifique se o projeto Supabase está ativo no dashboard');
  console.log('2. Confirme se a URL do banco está correta');
  console.log('3. Verifique se há firewall/proxy bloqueando a conexão');
  console.log('4. Tente acessar o Supabase dashboard em https://supabase.com/dashboard');
  console.log('5. Verifique se sua internet permite conexões na porta 5432');
  
  console.log('\n📋 URLs para verificar:');
  console.log(`   Dashboard: https://supabase.com/dashboard/project/qplmjhcrilcsfxbocaei`);
  console.log(`   Settings: https://supabase.com/dashboard/project/qplmjhcrilcsfxbocaei/settings/database`);
}

diagnosticarConectividade().catch(console.error);
