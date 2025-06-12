# 📝 GUIA: Adicionar Dados Manualmente no Strapi

## ✅ Status: Permissões de Leitura Configuradas

As APIs estão funcionando para leitura:
- ✅ `/api/associacaos` - Funcionando (vazio)
- ✅ `/api/produtos` - Funcionando (vazio)  
- ✅ `/api/noticia-eventos` - Funcionando (vazio)
- ✅ `/api/pagina-sobre` - Content Type criado

## 🚀 ADICIONAR DADOS VIA PAINEL ADMINISTRATIVO

### 1. Acesse o Painel
- URL: http://localhost:1337/admin
- Faça login com suas credenciais

### 2. Adicionar Associações

**Vá em: Content Manager > Associacao > Create new entry**

#### Associação 1:
```
Nome: Associação das Artesãs do Centro
Slug: associacao-artesas-centro
Endereco Completo: Rua Coronel José Sabino, 123, Centro, Jaguaribe, CE, Brasil
Contatos: 
{
  "telefone": "(88) 3521-1234",
  "email": "centro@rendadefilejaguaribe.com.br",
  "whatsapp": "(88) 99876-5432",
  "instagram": "artesascentrojaguaribe",
  "facebook": "associacaoartesascentro"
}

Historia: 
Fundada em 1985, a Associação das Artesãs do Centro é uma das mais tradicionais de Jaguaribe. Nasceu da união de mulheres que desejavam preservar a arte da Renda de Filé e criar oportunidades de renda para suas famílias.

Com mais de 30 artesãs associadas, a organização se destaca pela qualidade de suas peças e pela dedicação em ensinar as técnicas tradicionais para as novas gerações. Suas criações incluem toalhas de mesa, cortinas, colchas e peças decorativas que encantam por sua delicadeza e perfeição técnica.

A associação participa regularmente de feiras e exposições, levando a arte da Renda de Filé de Jaguaribe para todo o Brasil e contribuindo para a valorização da cultura local.
```

#### Associação 2:
```
Nome: Cooperativa Mãos de Ouro
Slug: cooperativa-maos-de-ouro
Endereco Completo: Avenida Getúlio Vargas, 456, São José, Jaguaribe, CE, Brasil
Contatos:
{
  "telefone": "(88) 3521-5678",
  "email": "maosdeourojaguaribe@gmail.com",
  "whatsapp": "(88) 99123-4567",
  "instagram": "maosdeourojaguaribe",
  "facebook": "cooperativamaosdeourojaguaribe",
  "site": "www.maosdeourojaguaribe.com.br"
}

Historia:
A Cooperativa Mãos de Ouro foi criada em 1992 com o objetivo de fortalecer a comercialização dos produtos das artesãs de Jaguaribe. Reúne artesãs de diferentes bairros da cidade, promovendo a troca de conhecimentos e técnicas.

Conhecida por suas inovações na arte tradicional, a cooperativa desenvolve novos padrões e designs, sempre respeitando as técnicas ancestrais. Suas peças são reconhecidas pela criatividade e pela alta qualidade dos acabamentos.

A cooperativa mantém um espaço de vendas permanente e oferece cursos de capacitação para jovens interessados em aprender a arte da Renda de Filé.
```

#### Associação 3:
```
Nome: Grupo Tradição e Arte
Slug: grupo-tradicao-arte
Endereco Completo: Rua Francisco Alves, 789, Vila Nova, Jaguaribe, CE, Brasil
Contatos:
{
  "telefone": "(88) 3521-9012",
  "email": "tradicaoarte@outlook.com",
  "whatsapp": "(88) 99234-5678",
  "instagram": "tradicaoartejaguaribe"
}

Historia:
O Grupo Tradição e Arte é formado por artesãs que se dedicam especialmente à preservação dos padrões mais antigos da Renda de Filé. Fundado em 2001, o grupo surgiu da preocupação de algumas mestras em manter vivos os desenhos e técnicas que estavam sendo esquecidos.

Suas integrantes são verdadeiras guardiãs da tradição, dominando técnicas complexas que poucas pessoas ainda conhecem. O grupo se dedica também à pesquisa histórica, documentando padrões antigos e suas origens.

Além da produção artesanal, o grupo oferece oficinas e palestras sobre a história da Renda de Filé, contribuindo para a educação cultural da comunidade.
```

#### Associação 4:
```
Nome: Associação Flores do Sertão
Slug: associacao-flores-sertao
Endereco Completo: Rua José de Alencar, 321, Cohab, Jaguaribe, CE, Brasil
Contatos:
{
  "telefone": "(88) 3521-7890",
  "email": "floresdosertao@gmail.com",
  "whatsapp": "(88) 99345-6789",
  "instagram": "floresdosertaojaguaribe",
  "facebook": "associacaofloresdesertao"
}

Historia:
A Associação Flores do Sertão foi fundada em 2005 por um grupo de jovens artesãs que desejavam modernizar a arte da Renda de Filé sem perder sua essência tradicional. O nome reflete a beleza que floresce mesmo nas condições mais áridas do sertão.

Especializada em peças com motivos florais e da natureza, a associação se destaca por criar designs contemporâneos que dialogam com a tradição. Suas artesãs são conhecidas pela precisão dos pontos e pela criatividade na combinação de cores.

A associação desenvolve projetos sociais, oferecendo cursos gratuitos para mulheres em situação de vulnerabilidade social, promovendo a inclusão através da arte.
```

**⚠️ IMPORTANTE: Clique em "Save" e depois "Publish" para cada associação**

### 3. Adicionar Produtos

**Vá em: Content Manager > Produto > Create new entry**

Adicione alguns produtos de exemplo (escolha 2-3):

#### Produto 1:
```
Nome: Toalha de Mesa Floral Grande
Slug: toalha-mesa-floral-grande
Categoria: Cama, Mesa e Banho
Preco: 280.00
Disponivel: true
Associacao Origem: [Selecione "Associação das Artesãs do Centro"]

Descricao:
Elegante toalha de mesa em Renda de Filé com motivos florais delicados. Peça artesanal confeccionada com fio de algodão de alta qualidade, perfeita para ocasiões especiais e decoração de ambientes sofisticados.

Características:
- Dimensões: 1,50m x 2,00m
- Material: 100% algodão
- Tempo de confecção: 3 semanas
- Padrão: Flores e folhagens
- Acabamento: Bordas trabalhadas à mão

Ideal para mesas de jantar, esta peça transforma qualquer refeição em um momento especial, combinando tradição e elegância.
```

#### Produto 2:
```
Nome: Blusa Tradicional Feminina
Slug: blusa-tradicional-feminina
Categoria: Vestuário
Preco: 120.00
Disponivel: true
Associacao Origem: [Selecione "Grupo Tradição e Arte"]

Descricao:
Blusa feminina em Renda de Filé, peça única que combina tradição e elegância contemporânea. Ideal para eventos especiais, uso casual sofisticado ou como peça de destaque no guarda-roupa.

Detalhes:
- Tamanhos disponíveis: P, M, G, GG
- Forro em algodão incluso
- Mangas 3/4 com acabamento em renda
- Decote redondo clássico
- Padrão geométrico tradicional

Uma peça versátil que pode ser usada com saias, calças ou vestidos, sempre garantindo um visual único e cheio de personalidade.
```

### 4. Adicionar Notícias

**Vá em: Content Manager > Noticia Evento > Create new entry**

#### Notícia 1:
```
Titulo: Festival da Renda de Filé 2025
Slug: festival-renda-file-2025
Tipo: Evento
Data Evento: 2025-03-15T09:00:00.000Z

Conteudo:
Jaguaribe se prepara para receber o maior evento de Renda de Filé do Ceará. O Festival da Renda de Filé 2025 acontecerá nos dias 15, 16 e 17 de março, reunindo artesãs de todo o estado para celebrar esta arte tradicional que é patrimônio cultural do município.

O evento, que já está em sua quinta edição, promete ser ainda mais grandioso este ano, com a participação confirmada de mais de 200 artesãs de 15 municípios cearenses. A expectativa é receber mais de 10.000 visitantes durante os três dias de festival.

Programação Completa:

Sexta-feira (15/03):
- 9h - Abertura oficial com apresentação cultural
- 10h - Exposição de peças históricas no Museu Municipal
- 14h - Oficina "Primeiros Pontos" para iniciantes
- 16h - Mesa redonda "A Renda de Filé na Economia Local"
- 19h - Show com Elba Ramalho

A entrada é gratuita para todas as atividades. O evento acontecerá na Praça Central de Jaguaribe e no Centro Cultural Municipal.
```

### 5. Adicionar Página Sobre

**Vá em: Content Manager > Pagina Sobre > Create new entry**

```
Titulo Pagina: Sobre a Renda de Filé

Conteudo Historia:
A Renda de Filé é uma técnica artesanal tradicional que tem suas raízes profundamente fincadas na cultura nordestina. Em Jaguaribe, no Ceará, essa arte milenar é preservada e transmitida através das gerações pelas hábeis mãos das artesãs locais, que mantêm viva uma tradição que atravessa séculos.

Originária da Europa, especificamente da região do Mediterrâneo, a técnica chegou ao Brasil através dos colonizadores portugueses no século XVI. No entanto, foi no Nordeste brasileiro que esta arte encontrou solo fértil para florescer e se transformar em algo genuinamente nacional.

Em Jaguaribe, a tradição da Renda de Filé ganhou características únicas. As artesãs locais adaptaram os padrões europeus, incorporando elementos da flora e fauna regionais, criando desenhos que retratam a beleza do sertão cearense.

Conteudo Processo Criacao:
O processo de criação da Renda de Filé é meticuloso e requer grande habilidade técnica, paciência e dedicação. Cada peça é única, resultado de horas de trabalho cuidadoso e da experiência acumulada ao longo de anos de prática.

Etapas da Criação:

1. Preparação da Tela Base
Tudo começa com a criação da tela de filé, uma rede de malhas quadradas que serve como base para todo o trabalho. Esta rede é confeccionada com fio de algodão de alta qualidade, utilizando uma agulha especial chamada "agulha de filé".

2. Planejamento do Desenho
Com a tela pronta, a artesã planeja o desenho que será bordado. Tradicionalmente, os padrões são memorizados e passados oralmente, mas hoje também se utilizam gráficos em papel quadriculado.

3. Execução do Bordado
O bordado é feito preenchendo seletivamente as malhas da tela. Existem dois pontos básicos: ponto cheio (a malha é completamente preenchida) e ponto vazio (a malha permanece aberta, criando transparências).
```

## 🧪 TESTAR APÓS ADICIONAR DADOS

Após adicionar pelo menos 2 associações e 1 produto:

1. **Teste a API**:
   ```bash
   curl http://localhost:1337/api/associacaos
   ```

2. **Teste o Frontend**:
   - http://localhost:3000
   - http://localhost:3000/associacoes
   - http://localhost:3000/sobre

3. **Execute o teste completo**:
   ```bash
   node test-sistema-completo.js
   ```

## 🎯 RESULTADO ESPERADO

Após adicionar os dados:
- ✅ **18/18 testes passando**
- ✅ **Frontend com dados reais**
- ✅ **Google Maps funcionando**
- ✅ **Sistema 100% completo**

**O Portal da Renda de Filé estará totalmente funcional!** 🧵✨
