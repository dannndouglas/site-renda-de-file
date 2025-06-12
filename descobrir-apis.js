const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function descobrirAPIs() {
  console.log('🔍 DESCOBRINDO APIs DISPONÍVEIS NO STRAPI\n');
  
  // Lista de possíveis URLs para testar
  const possiveisAPIs = [
    '/api/associacaos',
    '/api/associacoes', 
    '/api/produtos',
    '/api/noticia-eventos',
    '/api/noticias-eventos',
    '/api/pagina-sobre',
    '/api/pagina-sobres',
    '/api/sobre',
    '/api/sobres',
    '/api/page-sobre',
    '/api/page-sobres'
  ];
  
  console.log('📋 Testando URLs possíveis:\n');
  
  const apisEncontradas = [];
  
  for (const url of possiveisAPIs) {
    try {
      const response = await axios.get(`${STRAPI_URL}${url}`);
      
      if (response.status === 200) {
        const data = response.data;
        
        if (data.data !== undefined) {
          // Collection Type (retorna array)
          if (Array.isArray(data.data)) {
            const count = data.data.length;
            console.log(`✅ ${url} - Collection Type (${count} registros)`);
            apisEncontradas.push({ url, type: 'Collection', count });
            
            if (count > 0) {
              console.log(`   📄 Primeiro registro: ${JSON.stringify(data.data[0].attributes, null, 2).substring(0, 100)}...`);
            }
          } 
          // Single Type (retorna objeto)
          else if (data.data === null) {
            console.log(`✅ ${url} - Single Type (sem dados)`);
            apisEncontradas.push({ url, type: 'Single', hasData: false });
          } else {
            console.log(`✅ ${url} - Single Type (com dados)`);
            apisEncontradas.push({ url, type: 'Single', hasData: true });
            console.log(`   📄 Dados: ${JSON.stringify(data.data.attributes, null, 2).substring(0, 100)}...`);
          }
        }
      }
      
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`⚠️  ${url} - Existe mas sem permissão`);
      } else if (error.response?.status === 404) {
        console.log(`❌ ${url} - Não existe`);
      } else {
        console.log(`❌ ${url} - Erro: ${error.message}`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESUMO DAS APIs ENCONTRADAS:\n');
  
  if (apisEncontradas.length === 0) {
    console.log('❌ Nenhuma API encontrada. Verifique se os Content Types foram criados.');
    return;
  }
  
  apisEncontradas.forEach(api => {
    console.log(`✅ ${api.url}`);
    console.log(`   Tipo: ${api.type} Type`);
    if (api.type === 'Collection') {
      console.log(`   Registros: ${api.count}`);
    } else {
      console.log(`   Dados: ${api.hasData ? 'Sim' : 'Não'}`);
    }
    console.log('');
  });
  
  // Verificar especificamente a associação que foi adicionada
  console.log('🔍 VERIFICANDO DADOS DA ASSOCIAÇÃO ADICIONADA:\n');
  
  try {
    const response = await axios.get(`${STRAPI_URL}/api/associacaos`);
    const associacoes = response.data.data;
    
    if (associacoes.length > 0) {
      console.log(`✅ Encontrada ${associacoes.length} associação(ões):`);
      associacoes.forEach((assoc, index) => {
        console.log(`\n${index + 1}. ${assoc.attributes.nome}`);
        console.log(`   Slug: ${assoc.attributes.slug}`);
        console.log(`   Endereço: ${assoc.attributes.endereco_completo}`);
        console.log(`   ID: ${assoc.id}`);
      });
      
      console.log('\n🌐 URLs para testar no frontend:');
      associacoes.forEach(assoc => {
        console.log(`   http://localhost:3000/associacoes/${assoc.attributes.slug}`);
      });
    } else {
      console.log('⚠️  Nenhuma associação encontrada. Verifique se foi salva e publicada.');
    }
    
  } catch (error) {
    console.log('❌ Erro ao verificar associações:', error.message);
  }
}

descobrirAPIs().catch(console.error);
