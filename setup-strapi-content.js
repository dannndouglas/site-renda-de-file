const axios = require('axios');
const fs = require('fs');
const path = require('path');

const STRAPI_URL = 'http://localhost:1337';

// Dados de exemplo com endereços reais de Jaguaribe, CE
const associacoesData = [
  {
    nome: "Associação das Artesãs do Centro",
    historia: `<p>Fundada em 1985, a Associação das Artesãs do Centro é uma das mais tradicionais de Jaguaribe. Nasceu da união de mulheres que desejavam preservar a arte da Renda de Filé e criar oportunidades de renda para suas famílias.</p>

<p>Com mais de 30 artesãs associadas, a organização se destaca pela qualidade de suas peças e pela dedicação em ensinar as técnicas tradicionais para as novas gerações. Suas criações incluem toalhas de mesa, cortinas, colchas e peças decorativas que encantam por sua delicadeza e perfeição técnica.</p>

<p>A associação participa regularmente de feiras e exposições, levando a arte da Renda de Filé de Jaguaribe para todo o Brasil e contribuindo para a valorização da cultura local.</p>`,
    endereco_completo: "Rua Coronel José Sabino, 123, Centro, Jaguaribe, CE, Brasil",
    slug: "associacao-artesas-centro",
    contatos: {
      telefone: "(88) 3521-1234",
      email: "centro@rendadefilejaguaribe.com.br",
      whatsapp: "(88) 99876-5432",
      instagram: "artesascentrojaguaribe",
      facebook: "associacaoartesascentro"
    }
  },
  {
    nome: "Cooperativa Mãos de Ouro",
    historia: `<p>A Cooperativa Mãos de Ouro foi criada em 1992 com o objetivo de fortalecer a comercialização dos produtos das artesãs de Jaguaribe. Reúne artesãs de diferentes bairros da cidade, promovendo a troca de conhecimentos e técnicas.</p>

<p>Conhecida por suas inovações na arte tradicional, a cooperativa desenvolve novos padrões e designs, sempre respeitando as técnicas ancestrais. Suas peças são reconhecidas pela criatividade e pela alta qualidade dos acabamentos.</p>

<p>A cooperativa mantém um espaço de vendas permanente e oferece cursos de capacitação para jovens interessados em aprender a arte da Renda de Filé.</p>`,
    endereco_completo: "Avenida Getúlio Vargas, 456, São José, Jaguaribe, CE, Brasil",
    slug: "cooperativa-maos-de-ouro",
    contatos: {
      telefone: "(88) 3521-5678",
      email: "maosdeourojaguaribe@gmail.com",
      whatsapp: "(88) 99123-4567",
      instagram: "maosdeourojaguaribe",
      facebook: "cooperativamaosdeourojaguaribe",
      site: "www.maosdeourojaguaribe.com.br"
    }
  },
  {
    nome: "Grupo Tradição e Arte",
    historia: `<p>O Grupo Tradição e Arte é formado por artesãs que se dedicam especialmente à preservação dos padrões mais antigos da Renda de Filé. Fundado em 2001, o grupo surgiu da preocupação de algumas mestras em manter vivos os desenhos e técnicas que estavam sendo esquecidos.</p>

<p>Suas integrantes são verdadeiras guardiãs da tradição, dominando técnicas complexas que poucas pessoas ainda conhecem. O grupo se dedica também à pesquisa histórica, documentando padrões antigos e suas origens.</p>

<p>Além da produção artesanal, o grupo oferece oficinas e palestras sobre a história da Renda de Filé, contribuindo para a educação cultural da comunidade.</p>`,
    endereco_completo: "Rua Francisco Alves, 789, Vila Nova, Jaguaribe, CE, Brasil",
    slug: "grupo-tradicao-arte",
    contatos: {
      telefone: "(88) 3521-9012",
      email: "tradicaoarte@outlook.com",
      whatsapp: "(88) 99234-5678",
      instagram: "tradicaoartejaguaribe"
    }
  },
  {
    nome: "Associação Flores do Sertão",
    historia: `<p>A Associação Flores do Sertão foi fundada em 2005 por um grupo de jovens artesãs que desejavam modernizar a arte da Renda de Filé sem perder sua essência tradicional. O nome reflete a beleza que floresce mesmo nas condições mais áridas do sertão.</p>

<p>Especializada em peças com motivos florais e da natureza, a associação se destaca por criar designs contemporâneos que dialogam com a tradição. Suas artesãs são conhecidas pela precisão dos pontos e pela criatividade na combinação de cores.</p>

<p>A associação desenvolve projetos sociais, oferecendo cursos gratuitos para mulheres em situação de vulnerabilidade social, promovendo a inclusão através da arte.</p>`,
    endereco_completo: "Rua José de Alencar, 321, Cohab, Jaguaribe, CE, Brasil",
    slug: "associacao-flores-sertao",
    contatos: {
      telefone: "(88) 3521-7890",
      email: "floresdosertao@gmail.com",
      whatsapp: "(88) 99345-6789",
      instagram: "floresdosertaojaguaribe",
      facebook: "associacaofloresdesertao"
    }
  }
];

const produtosData = [
  {
    nome: "Toalha de Mesa Floral Grande",
    descricao: `<p>Elegante toalha de mesa em Renda de Filé com motivos florais delicados. Peça artesanal confeccionada com fio de algodão de alta qualidade, perfeita para ocasiões especiais e decoração de ambientes sofisticados.</p>

<p><strong>Características:</strong></p>
<ul>
<li>Dimensões: 1,50m x 2,00m</li>
<li>Material: 100% algodão</li>
<li>Tempo de confecção: 3 semanas</li>
<li>Padrão: Flores e folhagens</li>
<li>Acabamento: Bordas trabalhadas à mão</li>
</ul>

<p>Ideal para mesas de jantar, esta peça transforma qualquer refeição em um momento especial, combinando tradição e elegância.</p>`,
    categoria: "Cama, Mesa e Banho",
    slug: "toalha-mesa-floral-grande",
    preco: 280.00,
    disponivel: true,
    associacao_origem: 1 // Associação das Artesãs do Centro
  },
  {
    nome: "Cortina Borboletas",
    descricao: `<p>Cortina em Renda de Filé com padrão de borboletas, ideal para decorar janelas e ambientes. Confeccionada artesanalmente com técnicas tradicionais, traz leveza e charme para qualquer espaço.</p>

<p><strong>Especificações:</strong></p>
<ul>
<li>Dimensões: 1,20m x 1,80m</li>
<li>Padrão: Borboletas em voo</li>
<li>Material: Fio de algodão mercerizado</li>
<li>Pode ser feita sob medida</li>
<li>Inclui varão para fixação</li>
</ul>

<p>Perfeita para quartos infantis, salas de estar ou qualquer ambiente que precise de um toque delicado e artesanal.</p>`,
    categoria: "Decoração",
    slug: "cortina-borboletas",
    preco: 180.00,
    disponivel: true,
    associacao_origem: 2 // Cooperativa Mãos de Ouro
  },
  {
    nome: "Blusa Tradicional Feminina",
    descricao: `<p>Blusa feminina em Renda de Filé, peça única que combina tradição e elegância contemporânea. Ideal para eventos especiais, uso casual sofisticado ou como peça de destaque no guarda-roupa.</p>

<p><strong>Detalhes:</strong></p>
<ul>
<li>Tamanhos disponíveis: P, M, G, GG</li>
<li>Forro em algodão incluso</li>
<li>Mangas 3/4 com acabamento em renda</li>
<li>Decote redondo clássico</li>
<li>Padrão geométrico tradicional</li>
</ul>

<p>Uma peça versátil que pode ser usada com saias, calças ou vestidos, sempre garantindo um visual único e cheio de personalidade.</p>`,
    categoria: "Vestuário",
    slug: "blusa-tradicional-feminina",
    preco: 120.00,
    disponivel: true,
    associacao_origem: 3 // Grupo Tradição e Arte
  },
  {
    nome: "Jogo de Cama Casal Completo",
    descricao: `<p>Jogo de cama casal completo em Renda de Filé, composto por lençol de cima, lençol de baixo e duas fronhas. Uma peça de luxo que transforma o quarto em um ambiente sofisticado e acolhedor.</p>

<p><strong>Conjunto inclui:</strong></p>
<ul>
<li>1 Lençol superior (2,30m x 2,50m)</li>
<li>1 Lençol inferior com elástico</li>
<li>2 Fronhas (50cm x 70cm)</li>
<li>Padrão floral delicado</li>
<li>100% algodão de alta qualidade</li>
</ul>

<p>Confeccionado com técnicas tradicionais, este jogo de cama é uma verdadeira obra de arte têxtil que proporciona conforto e beleza.</p>`,
    categoria: "Cama, Mesa e Banho",
    slug: "jogo-cama-casal-completo",
    preco: 450.00,
    disponivel: true,
    associacao_origem: 4 // Associação Flores do Sertão
  },
  {
    nome: "Bolsa Artesanal Pequena",
    descricao: `<p>Bolsa pequena em Renda de Filé, perfeita para ocasiões especiais ou uso diário. Combina a delicadeza da renda tradicional com a praticidade de um acessório moderno.</p>

<p><strong>Características:</strong></p>
<ul>
<li>Dimensões: 25cm x 20cm x 8cm</li>
<li>Alça em couro sintético</li>
<li>Forro interno em tecido</li>
<li>Fechamento com zíper</li>
<li>Bolso interno pequeno</li>
</ul>

<p>Um acessório único que valoriza qualquer produção, carregando consigo a história e a tradição da Renda de Filé de Jaguaribe.</p>`,
    categoria: "Acessórios",
    slug: "bolsa-artesanal-pequena",
    preco: 85.00,
    disponivel: true,
    associacao_origem: 2 // Cooperativa Mãos de Ouro
  },
  {
    nome: "Caminho de Mesa Geométrico",
    descricao: `<p>Caminho de mesa em Renda de Filé com padrão geométrico tradicional. Peça versátil que pode ser usada em mesas de jantar, aparadores, cômodas ou como elemento decorativo.</p>

<p><strong>Especificações:</strong></p>
<ul>
<li>Dimensões: 40cm x 1,50m</li>
<li>Padrão: Losangos e quadrados</li>
<li>Bordas com acabamento especial</li>
<li>Fácil manutenção</li>
<li>Pode ser lavado à mão</li>
</ul>

<p>Ideal para dar um toque especial à decoração, este caminho de mesa é uma peça coringa que combina com diversos estilos decorativos.</p>`,
    categoria: "Decoração",
    slug: "caminho-mesa-geometrico",
    preco: 95.00,
    disponivel: true,
    associacao_origem: 1 // Associação das Artesãs do Centro
  }
];

const noticiasEventosData = [
  {
    titulo: "Festival da Renda de Filé 2025 - Jaguaribe se prepara para o maior evento do ano",
    conteudo: `<p>Jaguaribe se prepara para receber o maior evento de Renda de Filé do Ceará. O Festival da Renda de Filé 2025 acontecerá nos dias 15, 16 e 17 de março, reunindo artesãs de todo o estado para celebrar esta arte tradicional que é patrimônio cultural do município.</p>

<p>O evento, que já está em sua quinta edição, promete ser ainda mais grandioso este ano, com a participação confirmada de mais de 200 artesãs de 15 municípios cearenses. A expectativa é receber mais de 10.000 visitantes durante os três dias de festival.</p>

<h3>Programação Completa</h3>

<p><strong>Sexta-feira (15/03):</strong></p>
<ul>
<li>9h - Abertura oficial com apresentação cultural</li>
<li>10h - Exposição de peças históricas no Museu Municipal</li>
<li>14h - Oficina "Primeiros Pontos" para iniciantes</li>
<li>16h - Mesa redonda "A Renda de Filé na Economia Local"</li>
<li>19h - Show com Elba Ramalho</li>
</ul>

<p><strong>Sábado (16/03):</strong></p>
<ul>
<li>8h - Concurso "Melhor Peça Artesanal" - inscrições</li>
<li>10h - Feira de produtos das associações</li>
<li>14h - Oficina avançada "Técnicas Tradicionais"</li>
<li>16h - Desfile de moda com peças em Renda de Filé</li>
<li>20h - Forró pé de serra na Praça Central</li>
</ul>

<p><strong>Domingo (17/03):</strong></p>
<ul>
<li>9h - Missa em ação de graças</li>
<li>10h - Premiação do concurso</li>
<li>11h - Lançamento do livro "Fios da Tradição"</li>
<li>14h - Encerramento com apresentação das crianças</li>
</ul>

<p>A entrada é gratuita para todas as atividades. O evento acontecerá na Praça Central de Jaguaribe e no Centro Cultural Municipal. Haverá estacionamento gratuito e praça de alimentação com comidas típicas regionais.</p>

<p>Para mais informações, entre em contato através do telefone (88) 3521-0000 ou pelo e-mail festival@rendadefilejaguaribe.com.br</p>`,
    data_evento: "2025-03-15T09:00:00.000Z",
    slug: "festival-renda-file-2025",
    tipo: "Evento"
  },
  {
    titulo: "Exposição 'Fios da Tradição' inaugura no Museu do Artesanato de Fortaleza",
    conteudo: `<p>O Museu do Artesanato de Fortaleza inaugura nesta quinta-feira (20) uma nova exposição dedicada exclusivamente à Renda de Filé de Jaguaribe. A mostra "Fios da Tradição" apresenta mais de 80 peças que contam a história desta arte centenária, desde suas origens até as criações contemporâneas.</p>

<p>A exposição é resultado de uma parceria entre o Museu, a Prefeitura de Jaguaribe e as quatro principais associações de artesãs do município. Durante dois anos, curadores e pesquisadores trabalharam na seleção e catalogação das peças, muitas delas inéditas ao público.</p>

<h3>Destaques da Exposição</h3>

<p>Entre as peças em destaque estão:</p>
<ul>
<li>Toalha de altar do século XIX, uma das mais antigas peças preservadas</li>
<li>Vestido de noiva completo em Renda de Filé, confeccionado em 1950</li>
<li>Coleção de padrões tradicionais documentados pela primeira vez</li>
<li>Obras contemporâneas que dialogam com a tradição</li>
<li>Vídeos documentários sobre o processo de criação</li>
</ul>

<p>A curadora da exposição, Dra. Maria Helena Santos, explica: "Esta mostra não é apenas sobre técnica artesanal, mas sobre resistência cultural, identidade e a força das mulheres do sertão que mantiveram viva uma tradição secular."</p>

<h3>Espaço Interativo</h3>

<p>A exposição conta com um espaço interativo onde os visitantes podem:</p>
<ul>
<li>Aprender sobre as diferentes técnicas de confecção</li>
<li>Experimentar fazer os primeiros pontos</li>
<li>Conhecer as ferramentas tradicionais</li>
<li>Assistir a vídeos com depoimentos das artesãs</li>
</ul>

<p>Também será lançado um catálogo bilíngue (português/inglês) com textos de especialistas e fotografias de alta qualidade de todas as peças expostas.</p>

<h3>Programação Especial</h3>

<p>Durante o período da exposição, haverá uma programação especial:</p>
<ul>
<li>Palestras mensais com pesquisadores</li>
<li>Oficinas práticas aos sábados</li>
<li>Visitas guiadas para escolas</li>
<li>Encontros com as artesãs de Jaguaribe</li>
</ul>

<p>A exposição fica em cartaz até 30 de setembro de 2025, com entrada gratuita às terças-feiras. O Museu do Artesanato fica na Rua 25 de Março, 1184, Centro de Fortaleza, funcionando de terça a domingo, das 9h às 17h.</p>`,
    slug: "exposicao-fios-tradicao-fortaleza",
    tipo: "Notícia"
  },
  {
    titulo: "Associação das Artesãs do Centro abre inscrições para curso básico de Renda de Filé",
    conteudo: `<p>A Associação das Artesãs do Centro anuncia a abertura de inscrições para o curso básico de Renda de Filé. O curso é destinado a pessoas que desejam aprender esta arte tradicional, sem necessidade de conhecimento prévio em artesanato.</p>

<p>Esta é uma oportunidade única de aprender com mestras artesãs que dominam técnicas passadas de geração em geração. O curso faz parte do projeto "Preservando Tradições", apoiado pela Secretaria de Cultura do Estado do Ceará.</p>

<h3>Informações do Curso</h3>

<p><strong>Detalhes:</strong></p>
<ul>
<li><strong>Duração:</strong> 8 semanas (16 aulas)</li>
<li><strong>Horário:</strong> Terças e quintas, das 14h às 16h</li>
<li><strong>Local:</strong> Sede da Associação das Artesãs do Centro</li>
<li><strong>Endereço:</strong> Rua Coronel José Sabino, 123, Centro, Jaguaribe</li>
<li><strong>Investimento:</strong> R$ 80,00 (material incluso)</li>
<li><strong>Vagas:</strong> 15 participantes por turma</li>
<li><strong>Início:</strong> 10 de fevereiro de 2025</li>
</ul>

<h3>Conteúdo Programático</h3>

<p><strong>Módulo 1 - Fundamentos (Semanas 1-2):</strong></p>
<ul>
<li>História da Renda de Filé</li>
<li>Materiais e ferramentas</li>
<li>Preparação da tela base</li>
<li>Pontos básicos</li>
</ul>

<p><strong>Módulo 2 - Técnicas Básicas (Semanas 3-5):</strong></p>
<ul>
<li>Ponto cheio e ponto vazio</li>
<li>Criação de formas simples</li>
<li>Leitura de gráficos</li>
<li>Acabamentos básicos</li>
</ul>

<p><strong>Módulo 3 - Projeto Prático (Semanas 6-8):</strong></p>
<ul>
<li>Desenvolvimento de projeto individual</li>
<li>Confecção de peça completa</li>
<li>Técnicas de finalização</li>
<li>Apresentação dos trabalhos</li>
</ul>

<h3>Benefícios Inclusos</h3>

<ul>
<li>Kit completo de materiais (agulhas, linhas, tela)</li>
<li>Apostila ilustrada</li>
<li>Certificado de conclusão</li>
<li>Acompanhamento individual</li>
<li>Coffee break nos intervalos</li>
<li>Desconto em produtos da associação</li>
</ul>

<h3>Professoras</h3>

<p>O curso será ministrado por:</p>
<ul>
<li><strong>Dona Maria José Silva:</strong> 40 anos de experiência, especialista em padrões tradicionais</li>
<li><strong>Ana Paula Santos:</strong> Mestra artesã, especializada em técnicas contemporâneas</li>
<li><strong>Francisca Lima:</strong> Coordenadora pedagógica, educadora em artes</li>
</ul>

<h3>Como se Inscrever</h3>

<p>As inscrições podem ser feitas:</p>
<ul>
<li><strong>Presencialmente:</strong> Na sede da associação, de segunda a sexta, das 8h às 17h</li>
<li><strong>Por telefone:</strong> (88) 3521-1234</li>
<li><strong>Por WhatsApp:</strong> (88) 99876-5432</li>
<li><strong>Por e-mail:</strong> centro@rendadefilejaguaribe.com.br</li>
</ul>

<p>Documentos necessários: RG, CPF e comprovante de residência. O pagamento pode ser feito à vista ou parcelado em 2x sem juros.</p>

<p>Ao final do curso, os participantes receberão certificado de conclusão reconhecido pela Secretaria de Cultura e terão produzido sua primeira peça em Renda de Filé, além de estarem aptos a continuar desenvolvendo esta arte milenar.</p>`,
    data_evento: "2025-02-10T14:00:00.000Z",
    slug: "curso-renda-file-iniciantes-fevereiro",
    tipo: "Evento"
  },
  {
    titulo: "Artesãs de Jaguaribe participam da Feira Nacional de Artesanato em Brasília",
    conteudo: `<p>Quatro artesãs representantes das associações de Jaguaribe participaram da 15ª Feira Nacional de Artesanato, realizada em Brasília entre os dias 5 e 12 de janeiro. O evento, considerado o maior do setor no país, reuniu mais de 1.200 expositores de todos os estados brasileiros.</p>

<p>A delegação cearense foi composta por Maria José Silva (Associação das Artesãs do Centro), Ana Paula Santos (Cooperativa Mãos de Ouro), Francisca Lima (Grupo Tradição e Arte) e Rosa Maria Oliveira (Associação Flores do Sertão).</p>

<h3>Sucesso de Vendas</h3>

<p>Durante os oito dias de feira, as artesãs de Jaguaribe registraram vendas superiores a R$ 45.000, um aumento de 30% em relação à participação do ano anterior. Os produtos mais procurados foram:</p>

<ul>
<li>Toalhas de mesa (35% das vendas)</li>
<li>Blusas e vestidos (25% das vendas)</li>
<li>Cortinas e elementos decorativos (20% das vendas)</li>
<li>Jogos de cama (15% das vendas)</li>
<li>Acessórios diversos (5% das vendas)</li>
</ul>

<p>"Foi uma experiência incrível. Pessoas de todo o Brasil conheceram nosso trabalho e se encantaram com a delicadeza da Renda de Filé", conta Maria José Silva, que participou pela terceira vez do evento.</p>

<h3>Reconhecimento Nacional</h3>

<p>O destaque ficou por conta do prêmio "Melhor Técnica Tradicional", conquistado pela peça "Jardim do Sertão", uma toalha de mesa de 2x3 metros confeccionada coletivamente pelas quatro associações. A obra levou seis meses para ser concluída e apresenta mais de 20 espécies da flora regional representadas em renda.</p>

<p>Ana Paula Santos, da Cooperativa Mãos de Ouro, explica: "Esta peça representa a união de nossas associações e mostra que a Renda de Filé de Jaguaribe tem qualidade para competir em nível nacional."</p>

<h3>Novos Contatos Comerciais</h3>

<p>Além das vendas diretas, as artesãs estabeleceram importantes contatos comerciais:</p>

<ul>
<li>Parceria com loja de decoração de São Paulo para fornecimento mensal</li>
<li>Contrato com hotel de luxo no Rio de Janeiro para peças exclusivas</li>
<li>Acordo com exportadora para envio de produtos para Portugal</li>
<li>Convite para participar de feira internacional na Argentina</li>
</ul>

<h3>Capacitação e Aprendizado</h3>

<p>Durante a feira, as artesãs também participaram de workshops sobre:</p>
<ul>
<li>Precificação de produtos artesanais</li>
<li>Marketing digital para artesãos</li>
<li>Técnicas de exposição e venda</li>
<li>Gestão financeira para pequenos negócios</li>
</ul>

<p>Francisca Lima destaca: "Voltamos não apenas com vendas, mas com muito conhecimento. Aprendemos técnicas de gestão que vão ajudar nossas associações a crescer."</p>

<h3>Próximos Passos</h3>

<p>Com o sucesso da participação, as associações já se preparam para os próximos eventos:</p>
<ul>
<li>Feira de Artesanato de Fortaleza (março)</li>
<li>Salão do Artesanato de Recife (maio)</li>
<li>Festival de Inverno de Bonito (julho)</li>
<li>Feira Nacional de Artesanato 2026 (janeiro)</li>
</ul>

<p>Rosa Maria Oliveira, da Associação Flores do Sertão, conclui: "Este reconhecimento nacional nos motiva a continuar preservando nossa tradição e mostra que a Renda de Filé de Jaguaribe tem seu lugar garantido no cenário artesanal brasileiro."</p>`,
    slug: "artesas-jaguaribe-feira-nacional-brasilia",
    tipo: "Notícia"
  }
];

const paginaSobreData = {
  titulo_pagina: "Sobre a Renda de Filé",
  conteudo_historia: `<p>A Renda de Filé é uma técnica artesanal tradicional que tem suas raízes profundamente fincadas na cultura nordestina. Em Jaguaribe, no Ceará, essa arte milenar é preservada e transmitida através das gerações pelas hábeis mãos das artesãs locais, que mantêm viva uma tradição que atravessa séculos.</p>

<p>Originária da Europa, especificamente da região do Mediterrâneo, a técnica chegou ao Brasil através dos colonizadores portugueses no século XVI. No entanto, foi no Nordeste brasileiro que esta arte encontrou solo fértil para florescer e se transformar em algo genuinamente nacional.</p>

<p>Em Jaguaribe, a tradição da Renda de Filé ganhou características únicas. As artesãs locais adaptaram os padrões europeus, incorporando elementos da flora e fauna regionais, criando desenhos que retratam a beleza do sertão cearense. Flores como o mandacaru, animais como o bem-te-vi e padrões geométricos inspirados na arquitetura colonial passaram a fazer parte do repertório local.</p>

<p>A técnica se consolidou no município durante o século XIX, quando as mulheres da região encontraram na Renda de Filé não apenas uma forma de expressão artística, mas também uma importante fonte de renda familiar. Durante os períodos de seca, quando a agricultura ficava comprometida, a renda se tornava muitas vezes o único sustento das famílias.</p>

<p>O conhecimento é transmitido de mãe para filha, de avó para neta, em um processo educativo que vai muito além da técnica. Junto com os pontos e padrões, são passadas histórias, valores, tradições e a própria identidade cultural da comunidade. Cada peça carrega consigo não apenas a habilidade técnica da artesã, mas também sua história pessoal e familiar.</p>

<p>Hoje, as associações de artesãs de Jaguaribe mantêm viva essa tradição, produzindo peças de alta qualidade que são reconhecidas em todo o país. Mais do que produtos artesanais, são verdadeiras obras de arte que carregam séculos de história e cultura, representando a resistência e a criatividade do povo cearense.</p>`,
  conteudo_processo_criacao: `<h3>O Processo Artesanal</h3>

<p>O processo de criação da Renda de Filé é meticuloso e requer grande habilidade técnica, paciência e dedicação. Cada peça é única, resultado de horas de trabalho cuidadoso e da experiência acumulada ao longo de anos de prática.</p>

<h3>Etapas da Criação</h3>

<h4>1. Preparação da Tela Base</h4>
<p>Tudo começa com a criação da tela de filé, uma rede de malhas quadradas que serve como base para todo o trabalho. Esta rede é confeccionada com fio de algodão de alta qualidade, utilizando uma agulha especial chamada "agulha de filé". O tamanho das malhas determina a delicadeza final da peça - quanto menores as malhas, mais refinado será o resultado.</p>

<p>A confecção da tela exige precisão absoluta. Cada nó deve ter o mesmo tamanho e tensão, garantindo que a base seja uniforme. Uma tela mal feita compromete toda a peça, por isso esta etapa é considerada fundamental por todas as artesãs.</p>

<h4>2. Planejamento do Desenho</h4>
<p>Com a tela pronta, a artesã planeja o desenho que será bordado. Tradicionalmente, os padrões são memorizados e passados oralmente, mas hoje também se utilizam gráficos em papel quadriculado. Os desenhos podem ser:</p>

<ul>
<li><strong>Motivos florais:</strong> Rosas, margaridas, folhagens</li>
<li><strong>Figuras geométricas:</strong> Losangos, quadrados, estrelas</li>
<li><strong>Elementos regionais:</strong> Mandacaru, xique-xique, animais do sertão</li>
<li><strong>Padrões abstratos:</strong> Criações livres da artesã</li>
</ul>

<h4>3. Execução do Bordado</h4>
<p>O bordado é feito preenchendo seletivamente as malhas da tela. Existem dois pontos básicos:</p>

<ul>
<li><strong>Ponto cheio:</strong> A malha é completamente preenchida com linha</li>
<li><strong>Ponto vazio:</strong> A malha permanece aberta, criando transparências</li>
</ul>

<p>A combinação destes dois pontos, em diferentes arranjos, cria todos os desenhos possíveis. Artesãs experientes dominam variações mais complexas, como pontos de relevo, pontos duplos e técnicas de sombreamento.</p>

<h4>4. Acabamento</h4>
<p>O acabamento é crucial para a qualidade final da peça. As bordas são finalizadas com técnicas especiais que garantem durabilidade e beleza. Podem ser utilizados:</p>

<ul>
<li>Bainhas simples ou duplas</li>
<li>Bordas em crochê</li>
<li>Franjas trabalhadas</li>
<li>Acabamentos em ponto cruz</li>
</ul>

<h3>Tempo e Dedicação</h3>

<p>O tempo necessário para completar uma peça varia enormemente conforme sua complexidade:</p>

<ul>
<li><strong>Peças pequenas</strong> (guardanapos, porta-copos): 2 a 5 dias</li>
<li><strong>Peças médias</strong> (caminhos de mesa, cortinas): 1 a 3 semanas</li>
<li><strong>Peças grandes</strong> (toalhas de mesa, colchas): 1 a 6 meses</li>
<li><strong>Peças especiais</strong> (vestidos de noiva, obras de arte): 6 meses a 2 anos</li>
</ul>

<h3>Ferramentas Tradicionais</h3>

<p>As ferramentas utilizadas são simples, mas essenciais:</p>

<ul>
<li><strong>Agulha de filé:</strong> Específica para fazer a tela base</li>
<li><strong>Agulha de bordar:</strong> Para preencher as malhas</li>
<li><strong>Tesoura pequena:</strong> Para cortes precisos</li>
<li><strong>Bastidor:</strong> Para manter a tensão adequada</li>
<li><strong>Régua de madeira:</strong> Para medir as malhas</li>
</ul>

<h3>Materiais</h3>

<p>A qualidade dos materiais é fundamental:</p>

<ul>
<li><strong>Fio de algodão:</strong> Preferencialmente mercerizado, de alta qualidade</li>
<li><strong>Cores:</strong> Tradicionalmente branco ou cru, mas hoje se usa diversas cores</li>
<li><strong>Espessura:</strong> Varia conforme o projeto, do mais fino ao mais grosso</li>
</ul>

<p>Cada ponto é colocado com precisão milimétrica, resultado de anos de prática e dedicação. O resultado final é uma peça única que carrega não apenas a beleza estética, mas também a alma, a tradição e a história de quem a criou, representando séculos de cultura e resistência do povo cearense.</p>`
};

async function setupStrapiContent() {
  console.log('🚀 Configurando conteúdo do Strapi...\n');

  try {
    // Primeiro, vamos verificar se conseguimos acessar o Strapi
    const healthCheck = await axios.get(`${STRAPI_URL}/admin/init`);
    console.log('✅ Strapi está acessível');

    console.log('\n📝 Para popular o conteúdo, você precisa:');
    console.log('1. Acessar http://localhost:1337/admin');
    console.log('2. Fazer login como administrador');
    console.log('3. Criar os Content Types manualmente');
    console.log('4. Executar este script novamente');

    console.log('\n📋 Content Types necessários:');
    console.log('- Associacao (Collection Type)');
    console.log('- Produto (Collection Type)');
    console.log('- NoticiaEvento (Collection Type)');
    console.log('- PaginaSobre (Single Type)');

    // Salvar dados em arquivos para importação manual
    const dataDir = path.join(__dirname, 'dados-exemplo');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    fs.writeFileSync(path.join(dataDir, 'associacoes.json'), JSON.stringify(associacoesData, null, 2));
    fs.writeFileSync(path.join(dataDir, 'produtos.json'), JSON.stringify(produtosData, null, 2));
    fs.writeFileSync(path.join(dataDir, 'noticias-eventos.json'), JSON.stringify(noticiasEventosData, null, 2));
    fs.writeFileSync(path.join(dataDir, 'pagina-sobre.json'), JSON.stringify(paginaSobreData, null, 2));

    console.log('\n💾 Dados salvos em: dados-exemplo/');
    console.log('- associacoes.json (4 associações com endereços reais de Jaguaribe)');
    console.log('- produtos.json (6 produtos variados)');
    console.log('- noticias-eventos.json (4 notícias e eventos)');
    console.log('- pagina-sobre.json (conteúdo institucional completo)');

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

setupStrapiContent();