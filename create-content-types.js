const axios = require('axios');
const fs = require('fs');

const STRAPI_URL = 'http://localhost:1337';

// Schemas dos Content Types
const contentTypeSchemas = {
  associacao: {
    kind: "collectionType",
    collectionName: "associacoes",
    info: {
      singularName: "associacao",
      pluralName: "associacoes",
      displayName: "Associação",
      description: "Associações de artesãs da Renda de Filé"
    },
    options: {
      draftAndPublish: true
    },
    attributes: {
      nome: {
        type: "string",
        required: true,
        unique: true
      },
      historia: {
        type: "richtext",
        required: true
      },
      endereco_completo: {
        type: "string",
        required: true
      },
      slug: {
        type: "uid",
        targetField: "nome",
        required: true
      },
      contatos: {
        type: "json"
      }
    }
  },
  
  produto: {
    kind: "collectionType",
    collectionName: "produtos",
    info: {
      singularName: "produto",
      pluralName: "produtos",
      displayName: "Produto",
      description: "Produtos das associações de Renda de Filé"
    },
    options: {
      draftAndPublish: true
    },
    attributes: {
      nome: {
        type: "string",
        required: true
      },
      descricao: {
        type: "richtext",
        required: true
      },
      categoria: {
        type: "enumeration",
        enum: [
          "Vestuário",
          "Decoração",
          "Cama, Mesa e Banho",
          "Acessórios"
        ],
        required: true
      },
      slug: {
        type: "uid",
        targetField: "nome",
        required: true
      },
      preco: {
        type: "decimal"
      },
      disponivel: {
        type: "boolean",
        default: true
      },
      associacao_origem: {
        type: "relation",
        relation: "manyToOne",
        target: "api::associacao.associacao"
      }
    }
  },

  "noticia-evento": {
    kind: "collectionType",
    collectionName: "noticias_eventos",
    info: {
      singularName: "noticia-evento",
      pluralName: "noticias-eventos",
      displayName: "Notícia/Evento",
      description: "Notícias e eventos relacionados à Renda de Filé"
    },
    options: {
      draftAndPublish: true
    },
    attributes: {
      titulo: {
        type: "string",
        required: true
      },
      conteudo: {
        type: "richtext",
        required: true
      },
      data_evento: {
        type: "datetime"
      },
      slug: {
        type: "uid",
        targetField: "titulo",
        required: true
      },
      tipo: {
        type: "enumeration",
        enum: [
          "Notícia",
          "Evento"
        ],
        required: true,
        default: "Notícia"
      }
    }
  },

  "pagina-sobre": {
    kind: "singleType",
    collectionName: "pagina_sobre",
    info: {
      singularName: "pagina-sobre",
      pluralName: "pagina-sobres",
      displayName: "Página Sobre",
      description: "Conteúdo da página sobre a Renda de Filé"
    },
    options: {
      draftAndPublish: true
    },
    attributes: {
      titulo_pagina: {
        type: "string",
        required: true,
        default: "Sobre a Renda de Filé"
      },
      conteudo_historia: {
        type: "richtext",
        required: true
      },
      conteudo_processo_criacao: {
        type: "richtext",
        required: true
      }
    }
  }
};

async function createContentTypes() {
  console.log('🚀 Criando Content Types no Strapi...\n');
  
  try {
    // Verificar se o Strapi está acessível
    await axios.get(`${STRAPI_URL}/admin/init`);
    console.log('✅ Strapi está acessível');
    
    console.log('\n⚠️  ATENÇÃO: Para criar Content Types automaticamente, você precisa:');
    console.log('1. Ter um token de API administrativa');
    console.log('2. Ou criar os Content Types manualmente no painel');
    console.log('\n📋 Instruções para criação manual:');
    console.log('1. Acesse http://localhost:1337/admin');
    console.log('2. Vá em Content-Type Builder');
    console.log('3. Crie os seguintes Content Types:');
    
    Object.keys(contentTypeSchemas).forEach(name => {
      const schema = contentTypeSchemas[name];
      console.log(`\n📝 ${schema.info.displayName} (${schema.kind}):`);
      Object.keys(schema.attributes).forEach(attr => {
        const field = schema.attributes[attr];
        console.log(`   - ${attr}: ${field.type}${field.required ? ' (required)' : ''}`);
      });
    });
    
    console.log('\n💾 Schemas salvos em: content-type-schemas.json');
    fs.writeFileSync('content-type-schemas.json', JSON.stringify(contentTypeSchemas, null, 2));
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

createContentTypes();
