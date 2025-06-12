// Script para configurar permissões da API automaticamente
// Execute este script após criar os Content Types no Strapi

const setupPermissions = async () => {
  console.log('Configurando permissões da API...');
  
  // Permissões que devem ser públicas (sem autenticação)
  const publicPermissions = [
    // Associações
    'api::associacao.associacao.find',
    'api::associacao.associacao.findOne',
    
    // Produtos
    'api::produto.produto.find',
    'api::produto.produto.findOne',
    
    // Notícias/Eventos
    'api::noticia-evento.noticia-evento.find',
    'api::noticia-evento.noticia-evento.findOne',
    
    // Página Sobre
    'api::pagina-sobre.pagina-sobre.find',
  ];

  console.log('Permissões públicas a serem configuradas:');
  publicPermissions.forEach(permission => {
    console.log(`- ${permission}`);
  });

  console.log('\nPara configurar as permissões:');
  console.log('1. Acesse o painel administrativo do Strapi');
  console.log('2. Vá em Settings > Users & Permissions Plugin > Roles');
  console.log('3. Clique em "Public"');
  console.log('4. Marque as permissões listadas acima como "enabled"');
  console.log('5. Clique em "Save"');
  
  console.log('\nPermissões de administrador:');
  console.log('- Todas as operações (find, findOne, create, update, delete) devem estar habilitadas para o role "Authenticated"');
  
  console.log('\nConfigurações adicionais recomendadas:');
  console.log('- Rate limiting: 100 requests por minuto');
  console.log('- CORS: Configurado para o domínio do frontend');
  console.log('- Upload: Configurar provider (local ou S3)');
};

setupPermissions().catch(console.error);
