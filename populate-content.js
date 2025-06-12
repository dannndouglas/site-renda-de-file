const axios = require('axios');
const fs = require('fs');

const STRAPI_URL = 'http://localhost:1337';

async function populateContent() {
  console.log('🚀 Populando conteúdo no Strapi...\n');
  
  try {
    // Verificar se os Content Types existem
    console.log('1. Verificando Content Types...');
    
    const endpoints = [
      '/api/associacaos',
      '/api/produtos',
      '/api/noticia-eventos',
      '/api/pagina-sobre'
    ];
    
    let allEndpointsExist = true;
    
    for (const endpoint of endpoints) {
      try {
        await axios.get(`${STRAPI_URL}${endpoint}`);
        console.log(`   ✅ ${endpoint} - OK`);
      } catch (error) {
        if (error.response?.status === 403) {
          console.log(`   ⚠️  ${endpoint} - Existe mas sem permissão pública`);
        } else if (error.response?.status === 404) {
          console.log(`   ❌ ${endpoint} - Content Type não existe`);
          allEndpointsExist = false;
        } else {
          console.log(`   ❌ ${endpoint} - Erro: ${error.message}`);
          allEndpointsExist = false;
        }
      }
    }
    
    if (!allEndpointsExist) {
      console.log('\n❌ Alguns Content Types não foram criados ainda.');
      console.log('📋 Primeiro crie os Content Types no painel administrativo:');
      console.log('1. Acesse http://localhost:1337/admin');
      console.log('2. Vá em Content-Type Builder');
      console.log('3. Crie os Content Types conforme as instruções');
      console.log('4. Execute este script novamente');
      return;
    }
    
    console.log('\n2. Carregando dados de exemplo...');
    
    // Carregar dados dos arquivos JSON
    const associacoes = JSON.parse(fs.readFileSync('dados-exemplo/associacoes.json', 'utf8'));
    const produtos = JSON.parse(fs.readFileSync('dados-exemplo/produtos.json', 'utf8'));
    const noticias = JSON.parse(fs.readFileSync('dados-exemplo/noticias-eventos.json', 'utf8'));
    const paginaSobre = JSON.parse(fs.readFileSync('dados-exemplo/pagina-sobre.json', 'utf8'));
    
    console.log(`   📄 ${associacoes.length} associações`);
    console.log(`   📄 ${produtos.length} produtos`);
    console.log(`   📄 ${noticias.length} notícias/eventos`);
    console.log(`   📄 1 página sobre`);
    
    console.log('\n3. Populando Associações...');
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
        console.log(`   ❌ ${associacao.nome} - ${error.response?.data?.error?.message || error.message}`);
      }
    }
    
    console.log('\n4. Populando Produtos...');
    
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
        console.log(`   ❌ ${produto.nome} - ${error.response?.data?.error?.message || error.message}`);
      }
    }
    
    console.log('\n5. Populando Notícias/Eventos...');
    
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
        console.log(`   ❌ ${noticia.titulo} - ${error.response?.data?.error?.message || error.message}`);
      }
    }
    
    console.log('\n6. Populando Página Sobre...');
    
    try {
      await axios.put(`${STRAPI_URL}/api/pagina-sobre`, {
        data: {
          ...paginaSobre,
          publishedAt: new Date().toISOString()
        }
      });
      console.log(`   ✅ Página Sobre criada`);
    } catch (error) {
      console.log(`   ❌ Página Sobre - ${error.response?.data?.error?.message || error.message}`);
    }
    
    console.log('\n🎉 Conteúdo populado com sucesso!');
    console.log('\n📋 Próximos passos:');
    console.log('1. Configure as permissões públicas em Settings > Users & Permissions > Roles > Public');
    console.log('2. Marque como "enabled": find e findOne para todos os Content Types');
    console.log('3. Teste o frontend em http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    if (error.response?.data) {
      console.error('Detalhes:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

populateContent();
