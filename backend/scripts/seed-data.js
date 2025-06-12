const fs = require('fs');
const path = require('path');

// Script para popular o banco de dados com dados de exemplo
async function seedData() {
  console.log('Iniciando população do banco de dados...');
  
  // Dados de exemplo para a Página Sobre
  const paginaSobre = {
    titulo_pagina: "Sobre a Renda de Filé",
    conteudo_historia: `
      <p>A Renda de Filé é uma técnica artesanal tradicional que tem suas raízes profundamente fincadas na cultura nordestina. Em Jaguaribe, no Ceará, essa arte milenar é preservada e transmitida através das gerações pelas hábeis mãos das artesãs locais.</p>
      
      <p>Originária da Europa, a técnica chegou ao Brasil através dos colonizadores portugueses no século XVI e foi rapidamente adaptada pelas mulheres brasileiras, que incorporaram elementos da cultura regional, criando um estilo único e característico do Nordeste.</p>
      
      <p>Em Jaguaribe, a tradição da Renda de Filé ganhou força especial, tornando-se não apenas uma forma de expressão artística, mas também uma importante fonte de renda para muitas famílias. As técnicas são passadas de mãe para filha, preservando não apenas o conhecimento técnico, mas também as histórias e tradições que cada ponto carrega.</p>
      
      <p>Hoje, as associações de artesãs de Jaguaribe mantêm viva essa tradição, produzindo peças de alta qualidade que são reconhecidas em todo o país pela sua beleza, técnica refinada e pela história cultural que representam.</p>
    `,
    conteudo_processo_criacao: `
      <h3>O Processo Artesanal</h3>
      <p>O processo de criação da Renda de Filé é meticuloso e requer grande habilidade técnica e paciência. Cada peça começa com a preparação da tela de filé, uma rede de malhas quadradas que serve como base para todo o trabalho.</p>
      
      <h3>Etapas da Criação</h3>
      <ol>
        <li><strong>Preparação da Tela:</strong> A base é feita com fio de algodão, criando uma rede uniforme de malhas quadradas.</li>
        <li><strong>Desenho do Padrão:</strong> O desenho é planejado e marcado na tela, seguindo padrões tradicionais ou criações originais.</li>
        <li><strong>Bordado:</strong> Com agulha e linha, as artesãs preenchem seletivamente as malhas, criando os desenhos através de diferentes pontos e técnicas.</li>
        <li><strong>Acabamento:</strong> As bordas são finalizadas com cuidado especial, garantindo durabilidade e beleza à peça.</li>
      </ol>
      
      <p>Os padrões podem variar desde motivos florais delicados até figuras geométricas complexas, cada um exigindo técnicas específicas. Uma peça simples pode levar dias para ser concluída, enquanto trabalhos mais elaborados podem demandar semanas ou até meses de dedicação.</p>
      
      <p>Cada ponto é colocado com precisão milimétrica, resultando em peças únicas que carregam não apenas a beleza estética, mas também a alma e a tradição de quem as criou.</p>
    `,
    publishedAt: new Date().toISOString()
  };

  // Dados de exemplo para Associações
  const associacoes = [
    {
      nome: "Associação das Artesãs do Centro",
      historia: `
        <p>Fundada em 1985, a Associação das Artesãs do Centro é uma das mais tradicionais de Jaguaribe. Nasceu da união de mulheres que desejavam preservar a arte da Renda de Filé e criar oportunidades de renda para suas famílias.</p>
        
        <p>Com mais de 30 artesãs associadas, a organização se destaca pela qualidade de suas peças e pela dedicação em ensinar as técnicas tradicionais para as novas gerações. Suas criações incluem toalhas de mesa, cortinas, colchas e peças decorativas que encantam por sua delicadeza e perfeição técnica.</p>
        
        <p>A associação participa regularmente de feiras e exposições, levando a arte da Renda de Filé de Jaguaribe para todo o Brasil e contribuindo para a valorização da cultura local.</p>
      `,
      endereco_completo: "Rua das Flores, 123, Centro, Jaguaribe, CE",
      slug: "associacao-artesas-centro",
      contatos: {
        telefone: "(88) 3521-1234",
        email: "centro@rendadefilejaguaribe.com.br",
        whatsapp: "(88) 99876-5432",
        instagram: "artesascentrojaguaribe"
      },
      publishedAt: new Date().toISOString()
    },
    {
      nome: "Cooperativa Mãos de Ouro",
      historia: `
        <p>A Cooperativa Mãos de Ouro foi criada em 1992 com o objetivo de fortalecer a comercialização dos produtos das artesãs de Jaguaribe. Reúne artesãs de diferentes bairros da cidade, promovendo a troca de conhecimentos e técnicas.</p>
        
        <p>Conhecida por suas inovações na arte tradicional, a cooperativa desenvolve novos padrões e designs, sempre respeitando as técnicas ancestrais. Suas peças são reconhecidas pela criatividade e pela alta qualidade dos acabamentos.</p>
        
        <p>A cooperativa mantém um espaço de vendas permanente e oferece cursos de capacitação para jovens interessados em aprender a arte da Renda de Filé.</p>
      `,
      endereco_completo: "Avenida Principal, 456, São José, Jaguaribe, CE",
      slug: "cooperativa-maos-de-ouro",
      contatos: {
        telefone: "(88) 3521-5678",
        email: "maosdeourojaguaribe@gmail.com",
        whatsapp: "(88) 99123-4567",
        instagram: "maosdeourojaguaribe",
        facebook: "cooperativamaosdeourojaguaribe"
      },
      publishedAt: new Date().toISOString()
    },
    {
      nome: "Grupo Tradição e Arte",
      historia: `
        <p>O Grupo Tradição e Arte é formado por artesãs que se dedicam especialmente à preservação dos padrões mais antigos da Renda de Filé. Fundado em 2001, o grupo surgiu da preocupação de algumas mestras em manter vivos os desenhos e técnicas que estavam sendo esquecidos.</p>
        
        <p>Suas integrantes são verdadeiras guardiãs da tradição, dominando técnicas complexas que poucas pessoas ainda conhecem. O grupo se dedica também à pesquisa histórica, documentando padrões antigos e suas origens.</p>
        
        <p>Além da produção artesanal, o grupo oferece oficinas e palestras sobre a história da Renda de Filé, contribuindo para a educação cultural da comunidade.</p>
      `,
      endereco_completo: "Rua da Tradição, 789, Vila Nova, Jaguaribe, CE",
      slug: "grupo-tradicao-arte",
      contatos: {
        telefone: "(88) 3521-9012",
        email: "tradicaoarte@outlook.com",
        whatsapp: "(88) 99234-5678"
      },
      publishedAt: new Date().toISOString()
    }
  ];

  // Dados de exemplo para Produtos
  const produtos = [
    {
      nome: "Toalha de Mesa Floral",
      descricao: `
        <p>Elegante toalha de mesa em Renda de Filé com motivos florais delicados. Peça artesanal confeccionada com fio de algodão de alta qualidade, perfeita para ocasiões especiais.</p>
        <p>Dimensões: 1,50m x 2,00m</p>
        <p>Tempo de confecção: 3 semanas</p>
      `,
      categoria: "Cama, Mesa e Banho",
      slug: "toalha-mesa-floral",
      preco: 280.00,
      disponivel: true,
      publishedAt: new Date().toISOString()
    },
    {
      nome: "Cortina Borboletas",
      descricao: `
        <p>Cortina em Renda de Filé com padrão de borboletas, ideal para decorar janelas e ambientes. Confeccionada artesanalmente com técnicas tradicionais.</p>
        <p>Dimensões: 1,20m x 1,80m</p>
        <p>Pode ser feita sob medida</p>
      `,
      categoria: "Decoração",
      slug: "cortina-borboletas",
      preco: 180.00,
      disponivel: true,
      publishedAt: new Date().toISOString()
    },
    {
      nome: "Blusa Tradicional",
      descricao: `
        <p>Blusa feminina em Renda de Filé, peça única que combina tradição e elegância. Ideal para eventos especiais e uso casual sofisticado.</p>
        <p>Tamanhos disponíveis: P, M, G</p>
        <p>Forro em algodão incluso</p>
      `,
      categoria: "Vestuário",
      slug: "blusa-tradicional",
      preco: 120.00,
      disponivel: true,
      publishedAt: new Date().toISOString()
    }
  ];

  // Dados de exemplo para Notícias/Eventos
  const noticiasEventos = [
    {
      titulo: "Festival da Renda de Filé 2025",
      conteudo: `
        <p>Jaguaribe se prepara para receber o maior evento de Renda de Filé do Ceará. O Festival da Renda de Filé 2025 acontecerá nos dias 15, 16 e 17 de março, reunindo artesãs de todo o estado para celebrar esta arte tradicional.</p>
        
        <p>O evento contará com:</p>
        <ul>
          <li>Exposição de peças históricas e contemporâneas</li>
          <li>Oficinas gratuitas para iniciantes</li>
          <li>Concurso de melhor peça artesanal</li>
          <li>Feira de produtos das associações locais</li>
          <li>Palestras sobre a história da Renda de Filé</li>
        </ul>
        
        <p>A entrada é gratuita e o evento acontecerá na Praça Central de Jaguaribe. Esperamos receber mais de 5.000 visitantes durante os três dias de festival.</p>
        
        <p>Para mais informações, entre em contato com a organização através do telefone (88) 3521-0000 ou pelo e-mail festival@rendadefilejaguaribe.com.br</p>
      `,
      data_evento: "2025-03-15T09:00:00.000Z",
      slug: "festival-renda-file-2025",
      tipo: "Evento",
      publishedAt: new Date().toISOString()
    },
    {
      titulo: "Nova Exposição no Museu do Artesanato",
      conteudo: `
        <p>O Museu do Artesanato de Fortaleza inaugura uma nova exposição dedicada exclusivamente à Renda de Filé de Jaguaribe. A mostra "Fios da Tradição" apresenta mais de 50 peças que contam a história desta arte centenária.</p>
        
        <p>A exposição inclui peças históricas do século XIX, trabalhos contemporâneos das principais artesãs da região e um espaço interativo onde os visitantes podem aprender sobre as técnicas de confecção.</p>
        
        <p>A curadoria foi feita em parceria com as associações de artesãs de Jaguaribe, garantindo autenticidade e representatividade na seleção das obras expostas.</p>
        
        <p>A exposição fica em cartaz até 30 de junho de 2025, com entrada gratuita às terças-feiras.</p>
      `,
      slug: "exposicao-museu-artesanato",
      tipo: "Notícia",
      publishedAt: new Date().toISOString()
    },
    {
      titulo: "Curso de Renda de Filé para Iniciantes",
      conteudo: `
        <p>A Associação das Artesãs do Centro anuncia a abertura de inscrições para o curso básico de Renda de Filé. O curso é destinado a pessoas que desejam aprender esta arte tradicional, sem necessidade de conhecimento prévio.</p>
        
        <p><strong>Informações do curso:</strong></p>
        <ul>
          <li>Duração: 8 semanas (2 aulas por semana)</li>
          <li>Horário: Terças e quintas, das 14h às 16h</li>
          <li>Local: Sede da Associação das Artesãs do Centro</li>
          <li>Investimento: R$ 80,00 (material incluso)</li>
          <li>Vagas: 15 participantes</li>
        </ul>
        
        <p>As inscrições podem ser feitas presencialmente na sede da associação ou pelo telefone (88) 3521-1234. As aulas começam no dia 10 de fevereiro.</p>
        
        <p>Ao final do curso, os participantes receberão certificado de conclusão e terão produzido sua primeira peça em Renda de Filé.</p>
      `,
      data_evento: "2025-02-10T14:00:00.000Z",
      slug: "curso-renda-file-iniciantes",
      tipo: "Evento",
      publishedAt: new Date().toISOString()
    }
  ];

  console.log('Dados de exemplo criados:');
  console.log('- 1 Página Sobre');
  console.log('- 3 Associações');
  console.log('- 3 Produtos');
  console.log('- 3 Notícias/Eventos');
  console.log('\nPara usar estes dados, importe-os através do painel administrativo do Strapi.');
  
  // Salvar dados em arquivos JSON para importação manual
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  fs.writeFileSync(path.join(dataDir, 'pagina-sobre.json'), JSON.stringify(paginaSobre, null, 2));
  fs.writeFileSync(path.join(dataDir, 'associacoes.json'), JSON.stringify(associacoes, null, 2));
  fs.writeFileSync(path.join(dataDir, 'produtos.json'), JSON.stringify(produtos, null, 2));
  fs.writeFileSync(path.join(dataDir, 'noticias-eventos.json'), JSON.stringify(noticiasEventos, null, 2));
  
  console.log('\nArquivos JSON salvos na pasta scripts/data/');
}

seedData().catch(console.error);
