# Redesign da página inicial — Renda de Filé de Jaguaribe

## Objetivo

Recriar a página inicial como uma experiência editorial, minimalista e delicada que apresente a Renda de Filé de Jaguaribe, conduza o visitante à história, às peças e às artesãs e evite excesso de informação. O redesign parte das três referências fornecidas, combinando a composição assimétrica da primeira com a leveza e o acabamento da terceira.

## Escopo

O trabalho cobre a página inicial e os elementos globais diretamente ligados à sua apresentação:

- cabeçalho responsivo;
- conteúdo completo da página inicial;
- rodapé;
- estilos, tipografia e animações necessárias;
- testes da transformação dos dados da página inicial;
- validação visual e responsiva.

As demais rotas, o backend Strapi e os modelos de conteúdo permanecem inalterados. A implementação deve preservar as alterações locais existentes que não pertencem ao redesign.

## Direção visual

A interface usará fundo marfim, superfícies claras, texto em marrom profundo, azul acinzentado como cor institucional e terracota apenas como acento. A tipografia será editorial: Cormorant Garamond nos títulos e Karla nos textos e controles. Bordas finas, espaços amplos e fotografias com baixa saturação darão unidade à página.

Não haverá cards de estatísticas, badges promocionais, gradientes chamativos, sombras pesadas nem padrões decorativos artificiais. Os elementos ornamentais serão limitados a linhas, pequenos marcadores tipográficos e à própria textura das fotografias.

## Estrutura da página

### Cabeçalho

Marca tipográfica à esquerda, cinco links de navegação à direita e indicação discreta da rota ativa. Em telas pequenas, o menu será recolhido e terá abertura animada, navegação por teclado e estados ARIA adequados.

### Hero

Composição assimétrica em duas colunas. O texto apresenta uma linha institucional, um título curto, um parágrafo e uma única ação principal. A fotografia ocupa a área de maior peso visual. No mobile, texto e imagem são empilhados sem perder a hierarquia.

### História

Bloco com fotografia de recorte orgânico, título, texto curto vindo do Strapi e link para a página Sobre. O conteúdo não deve ultrapassar um parágrafo visível.

### Peças em destaque

Três peças, obtidas dos primeiros produtos disponíveis no Strapi. Cada item terá fotografia, categoria e nome, sem preço, badge ou metadados adicionais. Na ausência de dados, serão usadas as três imagens locais existentes e textos de fallback.

### Processo artesanal

Faixa dividida entre fotografia e texto. O processo será resumido em três verbos — preparar, tecer e finalizar — apresentados como sequência editorial, sem ícones ilustrativos ou cartões.

### Artesãs e associações

Fechamento institucional centralizado com texto breve, nomes de até três associações quando disponíveis e uma ação para conhecer as associações. Esta seção substitui blocos quantitativos ou estatísticos.

### Rodapé

Marca, frase curta, navegação essencial, localização e direitos autorais. O conteúdo será compacto e responsivo.

## Dados e comportamento

`frontend/src/app/page.tsx` continuará buscando página inicial, produtos e associações em paralelo e repassando os dados ao componente da home. O componente aceitará respostas do Strapi no formato com `attributes` e manterá fallbacks locais para indisponibilidade do CMS.

Todos os links existentes continuarão apontando para as rotas atuais. Não serão criadas páginas, endpoints, persistência ou novas integrações.

## Movimento e interação

As entradas usarão opacidade, deslocamento vertical curto e revelação suave das fotografias. Imagens terão aproximação mínima no hover e links terão transições discretas. O movimento será executado com Framer Motion, com duração curta e curva suave, e será desativado quando `prefers-reduced-motion` estiver ativo.

Foco visível, contraste, áreas de toque adequadas, texto alternativo e estrutura semântica são requisitos do acabamento.

## Arquivos previstos

- `frontend/src/components/DynamicHomePage.tsx`: nova composição e transformação dos dados;
- `frontend/src/components/Header.tsx`: navegação global refinada;
- `frontend/src/components/Footer.tsx`: rodapé compacto;
- `frontend/src/app/globals.css`: sistema visual responsivo e estados de interação;
- `frontend/src/app/layout.tsx`: fontes e metadados, somente se necessário;
- `frontend/src/components/DynamicHomePage.test.tsx`: cobertura dos fallbacks e dados do Strapi.

## Verificação

A implementação será considerada concluída quando:

1. testes do frontend passarem;
2. lint e build do Next.js passarem ou qualquer falha preexistente for isolada e registrada;
3. a home funcionar com e sem dados do Strapi;
4. o menu móvel e os principais links estiverem operáveis;
5. a página for conferida em desktop e mobile;
6. a comparação visual com as referências confirmar a composição editorial, o respiro e a ausência de excesso informacional;
7. o relatório `design-qa.md` registrar `final result: passed`.

