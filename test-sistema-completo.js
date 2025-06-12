const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';
const FRONTEND_URL = 'http://localhost:3000';

async function testSistemaCompleto() {
  console.log('🧪 TESTE COMPLETO DO SISTEMA - Portal da Renda de Filé\n');
  console.log('=' .repeat(60));
  
  let totalTests = 0;
  let passedTests = 0;
  
  // Função auxiliar para teste
  const test = async (name, testFn) => {
    totalTests++;
    try {
      await testFn();
      console.log(`✅ ${name}`);
      passedTests++;
    } catch (error) {
      console.log(`❌ ${name} - ${error.message}`);
    }
  };
  
  console.log('1. TESTANDO INFRAESTRUTURA\n');
  
  await test('Strapi está rodando', async () => {
    const response = await axios.get(`${STRAPI_URL}/admin/init`);
    if (response.status !== 200) throw new Error('Strapi não está acessível');
  });
  
  await test('Frontend está rodando', async () => {
    const response = await axios.get(FRONTEND_URL);
    if (response.status !== 200) throw new Error('Frontend não está acessível');
  });
  
  console.log('\n2. TESTANDO APIs DO STRAPI\n');
  
  const apis = [
    { name: 'Associações', endpoint: '/api/associacaos' },
    { name: 'Produtos', endpoint: '/api/produtos' },
    { name: 'Notícias/Eventos', endpoint: '/api/noticia-eventos' },
    { name: 'Página Sobre', endpoint: '/api/pagina-sobre' }
  ];
  
  for (const api of apis) {
    await test(`API ${api.name}`, async () => {
      const response = await axios.get(`${STRAPI_URL}${api.endpoint}`);
      if (response.status === 403) {
        throw new Error('Sem permissão - configure permissões públicas');
      }
      if (response.status === 404) {
        throw new Error('Content Type não existe');
      }
      if (response.status !== 200) {
        throw new Error(`Status ${response.status}`);
      }
    });
  }
  
  console.log('\n3. TESTANDO PÁGINAS DO FRONTEND\n');
  
  const pages = [
    { name: 'Página Inicial', path: '/' },
    { name: 'Sobre', path: '/sobre' },
    { name: 'Associações', path: '/associacoes' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Contato', path: '/contato' },
    { name: 'Termos', path: '/termos' },
    { name: 'Privacidade', path: '/privacidade' }
  ];
  
  for (const page of pages) {
    await test(`Página ${page.name}`, async () => {
      const response = await axios.get(`${FRONTEND_URL}${page.path}`);
      if (response.status !== 200) {
        throw new Error(`Status ${response.status}`);
      }
      if (!response.data.includes('Renda de Filé')) {
        throw new Error('Conteúdo não carregou corretamente');
      }
    });
  }
  
  console.log('\n4. TESTANDO INTEGRAÇÃO FRONTEND ↔ BACKEND\n');
  
  await test('Dados das Associações no Frontend', async () => {
    const response = await axios.get(`${FRONTEND_URL}/associacoes`);
    if (response.status !== 200) throw new Error('Página não carregou');
    
    // Verificar se há dados das associações
    const content = response.data;
    const hasAssociacoes = content.includes('Associação') || content.includes('associação');
    if (!hasAssociacoes) {
      throw new Error('Dados das associações não estão sendo exibidos');
    }
  });
  
  await test('Dados das Notícias no Frontend', async () => {
    const response = await axios.get(`${FRONTEND_URL}/noticias`);
    if (response.status !== 200) throw new Error('Página não carregou');
    
    const content = response.data;
    const hasNoticias = content.includes('Festival') || content.includes('Exposição');
    if (!hasNoticias) {
      throw new Error('Dados das notícias não estão sendo exibidos');
    }
  });
  
  console.log('\n5. TESTANDO FUNCIONALIDADES ESPECÍFICAS\n');
  
  await test('Google Maps configurado', async () => {
    const response = await axios.get(`${FRONTEND_URL}/associacoes`);
    const content = response.data;
    
    // Verificar se o componente Google Maps está presente
    if (!content.includes('GoogleMap') && !content.includes('google')) {
      console.log('⚠️  Google Maps não configurado (API key necessária)');
    }
  });
  
  await test('Formulário de Contato', async () => {
    const response = await axios.get(`${FRONTEND_URL}/contato`);
    if (response.status !== 200) throw new Error('Página não carregou');
    
    const content = response.data;
    if (!content.includes('form') && !content.includes('formulário')) {
      throw new Error('Formulário não encontrado');
    }
  });
  
  await test('Design Responsivo', async () => {
    const response = await axios.get(FRONTEND_URL);
    const content = response.data;
    
    // Verificar se Tailwind CSS está sendo usado
    if (!content.includes('tailwind') && !content.includes('responsive')) {
      console.log('⚠️  Verificar se Tailwind CSS está funcionando');
    }
  });
  
  console.log('\n6. VERIFICANDO DADOS POPULADOS\n');
  
  try {
    const associacoesResponse = await axios.get(`${STRAPI_URL}/api/associacaos`);
    const associacoes = associacoesResponse.data.data || [];
    console.log(`📊 Associações cadastradas: ${associacoes.length}`);
    
    if (associacoes.length > 0) {
      console.log('   Associações encontradas:');
      associacoes.forEach((assoc, index) => {
        console.log(`   ${index + 1}. ${assoc.attributes?.nome || 'Nome não definido'}`);
      });
    }
  } catch (error) {
    console.log('⚠️  Não foi possível verificar associações');
  }
  
  try {
    const produtosResponse = await axios.get(`${STRAPI_URL}/api/produtos`);
    const produtos = produtosResponse.data.data || [];
    console.log(`📊 Produtos cadastrados: ${produtos.length}`);
  } catch (error) {
    console.log('⚠️  Não foi possível verificar produtos');
  }
  
  try {
    const noticiasResponse = await axios.get(`${STRAPI_URL}/api/noticia-eventos`);
    const noticias = noticiasResponse.data.data || [];
    console.log(`📊 Notícias/Eventos cadastrados: ${noticias.length}`);
  } catch (error) {
    console.log('⚠️  Não foi possível verificar notícias');
  }
  
  console.log('\n' + '=' .repeat(60));
  console.log(`📊 RESULTADO DOS TESTES: ${passedTests}/${totalTests} passaram`);
  
  if (passedTests === totalTests) {
    console.log('🎉 TODOS OS TESTES PASSARAM! Sistema funcionando perfeitamente!');
  } else {
    console.log('⚠️  Alguns testes falharam. Verifique as configurações.');
  }
  
  console.log('\n📋 CHECKLIST FINAL:');
  console.log('□ Content Types criados no Strapi');
  console.log('□ Permissões públicas configuradas');
  console.log('□ Conteúdo populado');
  console.log('□ Google Maps API configurada (opcional)');
  console.log('□ Todas as páginas funcionando');
  
  console.log('\n🚀 Para finalizar:');
  console.log('1. Acesse http://localhost:1337/admin para configurar permissões');
  console.log('2. Execute: node populate-content.js (após criar Content Types)');
  console.log('3. Teste o site em http://localhost:3000');
  
  return { totalTests, passedTests };
}

testSistemaCompleto().catch(console.error);
