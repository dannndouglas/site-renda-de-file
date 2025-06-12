const axios = require('axios');

const STRAPI_URL = 'http://localhost:1337';

async function verificarContentTypes() {
  console.log('🔍 VERIFICANDO CONTENT TYPES NO STRAPI\n');
  console.log('=' .repeat(50));
  
  // URLs que o Strapi gera automaticamente
  const contentTypes = [
    {
      name: 'Associacao (Collection Type)',
      singular: 'associacao',
      expectedUrl: '/api/associacaos',
      description: 'Strapi adiciona "s" ao final do nome singular'
    },
    {
      name: 'Produto (Collection Type)', 
      singular: 'produto',
      expectedUrl: '/api/produtos',
      description: 'Strapi adiciona "s" ao final do nome singular'
    },
    {
      name: 'Noticia-Evento (Collection Type)',
      singular: 'noticia-evento', 
      expectedUrl: '/api/noticia-eventos',
      description: 'Strapi adiciona "s" ao final do nome singular'
    },
    {
      name: 'Pagina-Sobre (Single Type)',
      singular: 'pagina-sobre',
      expectedUrl: '/api/pagina-sobre',
      description: 'Single Types mantêm o nome original'
    }
  ];
  
  console.log('📋 Content Types que devem ser criados:\n');
  
  for (const ct of contentTypes) {
    console.log(`📝 ${ct.name}`);
    console.log(`   Nome no Strapi: "${ct.singular}"`);
    console.log(`   URL da API: ${ct.expectedUrl}`);
    console.log(`   Nota: ${ct.description}\n`);
  }
  
  console.log('🧪 TESTANDO APIs...\n');
  
  for (const ct of contentTypes) {
    try {
      const response = await axios.get(`${STRAPI_URL}${ct.expectedUrl}`);
      
      if (response.status === 200) {
        const data = response.data;
        if (ct.expectedUrl.includes('pagina-sobre')) {
          // Single Type retorna objeto direto
          console.log(`✅ ${ct.name} - Funcionando (${data.data ? 'com dados' : 'sem dados'})`);
        } else {
          // Collection Type retorna array
          const count = data.data ? data.data.length : 0;
          console.log(`✅ ${ct.name} - Funcionando (${count} registros)`);
        }
      }
      
    } catch (error) {
      if (error.response?.status === 403) {
        console.log(`⚠️  ${ct.name} - Content Type existe mas sem permissão pública`);
        console.log(`   Solução: Configure permissões em Settings > Users & Permissions > Roles > Public`);
      } else if (error.response?.status === 404) {
        console.log(`❌ ${ct.name} - Content Type NÃO EXISTE`);
        console.log(`   Solução: Criar Content Type "${ct.singular}" no painel administrativo`);
      } else {
        console.log(`❌ ${ct.name} - Erro: ${error.message}`);
      }
    }
  }
  
  console.log('\n' + '=' .repeat(50));
  console.log('📋 INSTRUÇÕES PARA CORRIGIR:\n');
  
  console.log('1. CRIAR CONTENT TYPES:');
  console.log('   - Acesse: http://localhost:1337/admin');
  console.log('   - Vá em: Content-Type Builder');
  console.log('   - Crie exatamente com estes nomes:');
  console.log('     • associacao (Collection Type)');
  console.log('     • produto (Collection Type)');
  console.log('     • noticia-evento (Collection Type)');
  console.log('     • pagina-sobre (Single Type)');
  
  console.log('\n2. CONFIGURAR PERMISSÕES:');
  console.log('   - Vá em: Settings > Users & Permissions > Roles > Public');
  console.log('   - Marque como "enabled":');
  console.log('     • associacao: find, findOne');
  console.log('     • produto: find, findOne');
  console.log('     • noticia-evento: find, findOne');
  console.log('     • pagina-sobre: find');
  
  console.log('\n3. POPULAR DADOS:');
  console.log('   - Execute: node populate-content.js');
  
  console.log('\n🔗 URLs das APIs após configuração:');
  contentTypes.forEach(ct => {
    console.log(`   ${ct.expectedUrl}`);
  });
}

verificarContentTypes().catch(console.error);
