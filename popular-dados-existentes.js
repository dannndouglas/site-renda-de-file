const axios = require('axios');
const fs = require('fs');

const STRAPI_URL = 'http://localhost:1337';

async function popularDadosExistentes() {
  console.log('🚀 Populando dados nos Content Types existentes...\n');
  
  try {
    console.log('1. Carregando dados de exemplo...');
    
    // Carregar dados dos arquivos JSON
    const associacoes = JSON.parse(fs.readFileSync('dados-exemplo/associacoes.json', 'utf8'));
    const produtos = JSON.parse(fs.readFileSync('dados-exemplo/produtos.json', 'utf8'));
    const noticias = JSON.parse(fs.readFileSync('dados-exemplo/noticias-eventos.json', 'utf8'));
    
    console.log(`   📄 ${associacoes.length} associações`);
    console.log(`   📄 ${produtos.length} produtos`);
    console.log(`   📄 ${noticias.length} notícias/eventos`);
    
    console.log('\n2. Populando Associações...');
    const associacoesIds = [];
    
    for (let i = 0; i < associacoes.length; i++) {
      const associacao = associacoes[i];
      try {
        const response = await axios.post(`${STRAPI_URL}/api/associacaos`, {
          data: {
            ...associacao,
            publishedAt: new Date().toISOString()
          }
        });
        associacoesIds.push(response.data.data.id);
        console.log(`   ✅ ${associacao.nome}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
          console.log(`   ⚠️  ${associacao.nome} - Já existe`);
        } else {
          console.log(`   ❌ ${associacao.nome} - ${error.response?.data?.error?.message || error.message}`);
        }
      }
    }
    
    // Se não conseguiu criar novas associações, buscar as existentes
    if (associacoesIds.length === 0) {
      try {
        const existingResponse = await axios.get(`${STRAPI_URL}/api/associacaos`);
        const existing = existingResponse.data.data || [];
        existing.forEach(assoc => associacoesIds.push(assoc.id));
        console.log(`   📋 Usando ${associacoesIds.length} associações existentes`);
      } catch (error) {
        console.log('   ⚠️  Não foi possível buscar associações existentes');
      }
    }
    
    console.log('\n3. Populando Produtos...');
    
    for (const produto of produtos) {
      try {
        // Ajustar o ID da associação
        const produtoData = { ...produto };
        if (produtoData.associacao_origem && associacoesIds[produtoData.associacao_origem - 1]) {
          produtoData.associacao_origem = associacoesIds[produtoData.associacao_origem - 1];
        } else {
          delete produtoData.associacao_origem;
        }
        
        await axios.post(`${STRAPI_URL}/api/produtos`, {
          data: {
            ...produtoData,
            publishedAt: new Date().toISOString()
          }
        });
        console.log(`   ✅ ${produto.nome}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
          console.log(`   ⚠️  ${produto.nome} - Já existe`);
        } else {
          console.log(`   ❌ ${produto.nome} - ${error.response?.data?.error?.message || error.message}`);
        }
      }
    }
    
    console.log('\n4. Populando Notícias/Eventos...');
    
    for (const noticia of noticias) {
      try {
        await axios.post(`${STRAPI_URL}/api/noticia-eventos`, {
          data: {
            ...noticia,
            publishedAt: new Date().toISOString()
          }
        });
        console.log(`   ✅ ${noticia.titulo}`);
      } catch (error) {
        if (error.response?.status === 400 && error.response?.data?.error?.message?.includes('already exists')) {
          console.log(`   ⚠️  ${noticia.titulo} - Já existe`);
        } else {
          console.log(`   ❌ ${noticia.titulo} - ${error.response?.data?.error?.message || error.message}`);
        }
      }
    }
    
    console.log('\n🎉 Dados populados com sucesso!');
    
    // Verificar quantos dados foram criados
    console.log('\n📊 VERIFICANDO DADOS CRIADOS:');
    
    try {
      const assocResponse = await axios.get(`${STRAPI_URL}/api/associacaos`);
      console.log(`   📍 Associações: ${assocResponse.data.data.length}`);
      
      assocResponse.data.data.forEach((assoc, index) => {
        console.log(`      ${index + 1}. ${assoc.attributes.nome}`);
        console.log(`         📍 ${assoc.attributes.endereco_completo}`);
      });
    } catch (error) {
      console.log('   ❌ Erro ao verificar associações');
    }
    
    try {
      const prodResponse = await axios.get(`${STRAPI_URL}/api/produtos`);
      console.log(`   🛍️  Produtos: ${prodResponse.data.data.length}`);
    } catch (error) {
      console.log('   ❌ Erro ao verificar produtos');
    }
    
    try {
      const newsResponse = await axios.get(`${STRAPI_URL}/api/noticia-eventos`);
      console.log(`   📰 Notícias/Eventos: ${newsResponse.data.data.length}`);
    } catch (error) {
      console.log('   ❌ Erro ao verificar notícias');
    }
    
    console.log('\n📋 PRÓXIMOS PASSOS:');
    console.log('1. ✅ Dados populados nos Content Types existentes');
    console.log('2. ⚠️  Criar Content Type "pagina-sobre" (Single Type) no painel');
    console.log('3. 🌐 Testar o frontend em http://localhost:3000');
    console.log('4. 🗺️  Configurar Google Maps API key (opcional)');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    if (error.response?.data) {
      console.error('Detalhes:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

popularDadosExistentes();
