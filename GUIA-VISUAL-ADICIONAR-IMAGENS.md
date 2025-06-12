# 📸 GUIA VISUAL: Como Adicionar Imagens no Portal da Renda de Filé

## 🎯 AGORA VOCÊ PODE ADICIONAR IMAGENS!

Acabei de configurar todos os campos de imagem nos Content Types. Agora você pode adicionar imagens às associações, produtos e notícias!

## 🚀 PASSO A PASSO COMPLETO

### 1️⃣ **ACESSAR O PAINEL ADMINISTRATIVO**
```
🌐 URL: http://localhost:1337/admin
👤 Login: admin@example.com
🔑 Senha: admin123
```

### 2️⃣ **ADICIONAR IMAGENS ÀS ASSOCIAÇÕES**

1. **Vá para Content Manager > Associações**
2. **Clique em uma associação existente** ou **Create new entry**
3. **Agora você verá os novos campos**:

   📸 **LOGO**
   - Campo: "Logo" 
   - Tipo: Uma única imagem
   - Clique no campo e selecione uma imagem da Media Library

   🖼️ **GALERIA DE FOTOS**
   - Campo: "Galeria Fotos"
   - Tipo: Múltiplas imagens
   - Clique em "Add an entry" para adicionar várias fotos

   🎥 **VÍDEO INSTITUCIONAL**
   - Campo: "Video Institucional"
   - Tipo: Um vídeo
   - Para vídeos sobre a associação

4. **Clique em "Save" e depois "Publish"**

### 3️⃣ **ADICIONAR IMAGENS AOS PRODUTOS**

1. **Vá para Content Manager > Produtos**
2. **Clique em um produto existente** ou **Create new entry**
3. **Novos campos disponíveis**:

   📷 **FOTOS DO PRODUTO**
   - Campo: "Fotos Produto"
   - Tipo: Múltiplas imagens
   - Adicione várias fotos do produto

   🎬 **VÍDEO DEMONSTRATIVO**
   - Campo: "Video Demonstrativo"
   - Tipo: Um vídeo
   - Para mostrar o produto sendo usado

4. **Clique em "Save" e depois "Publish"**

### 4️⃣ **ADICIONAR IMAGENS ÀS NOTÍCIAS/EVENTOS**

1. **Vá para Content Manager > Noticia Eventos**
2. **Clique em uma notícia existente** ou **Create new entry**
3. **Novos campos disponíveis**:

   🌟 **IMAGEM DE DESTAQUE**
   - Campo: "Imagem Destaque"
   - Tipo: Uma imagem principal
   - Aparece na lista de notícias

   🖼️ **GALERIA**
   - Campo: "Galeria"
   - Tipo: Múltiplas imagens
   - Para álbuns de fotos do evento

   🎥 **VÍDEO**
   - Campo: "Video"
   - Tipo: Um vídeo
   - Para vídeos relacionados à notícia

4. **Clique em "Save" e depois "Publish"**

## 📋 COMO USAR A MEDIA LIBRARY

### 🔄 **UPLOAD DE NOVAS IMAGENS**
1. **Vá para Media Library**
2. **Clique em "Add new assets"**
3. **Arraste arquivos ou clique para selecionar**
4. **Preencha informações**:
   - **Name**: Nome descritivo
   - **Alternative text**: Para acessibilidade (importante!)
   - **Caption**: Legenda (opcional)

### 🎨 **TIPOS DE ARQUIVO SUPORTADOS**
- **Imagens**: JPG, JPEG, PNG, WebP, SVG
- **Vídeos**: MP4, WebM, MOV
- **Tamanho máximo**: 100MB por arquivo

### 📐 **TAMANHOS RECOMENDADOS**
- **Logos de associações**: 400x400px
- **Fotos de produtos**: 800x600px
- **Imagens de destaque**: 1200x800px
- **Galeria**: 1000x750px

## 🎨 COMO MODIFICAR A PÁGINA INICIAL

### 📝 **CONTEÚDO ESTÁTICO (Textos, Layout)**
O conteúdo da página inicial está no arquivo:
```
📁 frontend/src/app/page.tsx
```

**Para modificar**:
1. Abra o arquivo no editor de código
2. Procure por textos como:
   - "Renda de Filé de Jaguaribe"
   - "Preservando a tradição artesanal"
   - "Uma Arte Milenar"
3. Modifique conforme necessário

### 🖼️ **IMAGENS DA PÁGINA INICIAL**
As imagens da página inicial vêm automaticamente dos dados do Strapi:

**🏢 ASSOCIAÇÕES**
- Aparecem automaticamente quando você adicionar logos às associações
- Limite: 3 associações na página inicial

**📰 NOTÍCIAS**
- Aparecem automaticamente quando você adicionar imagens de destaque
- Limite: 3 notícias mais recentes

### 🎯 **BANNER PRINCIPAL (Hero Section)**
Para adicionar uma imagem de fundo no banner principal:

1. **Adicione a imagem** na pasta `frontend/public/`
2. **Modifique o arquivo** `frontend/src/app/page.tsx`
3. **Procure por**: `bg-gradient-to-br from-amber-50`
4. **Substitua por**: 
```jsx
style={{
  backgroundImage: 'url("/sua-imagem.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}
```

## 🔧 CONFIGURAÇÕES AVANÇADAS

### 📊 **ESTATÍSTICAS ANIMADAS**
Para modificar os números na seção de estatísticas:

1. **Abra**: `frontend/src/app/page.tsx`
2. **Procure por**: `<AnimatedCounter end={150} />`
3. **Modifique os números**:
   - Associações: `end={associacoes.length || 5}`
   - Artesãs: `end={150}` (modifique conforme necessário)
   - Anos de Tradição: `end={50}`
   - Peças Criadas: `end={1000}`

### 🎨 **CORES E ESTILO**
As cores principais estão definidas em:
```
📁 frontend/tailwind.config.js
```

**Cores atuais**:
- **Primária**: Amber (âmbar) - `amber-600`
- **Secundária**: Orange (laranja) - `orange-600`
- **Texto**: Gray (cinza) - `gray-800`

## ✅ CHECKLIST PARA TESTAR

### 📸 **IMAGENS**
- [ ] Upload de imagens na Media Library
- [ ] Logo adicionado a uma associação
- [ ] Galeria de fotos em uma associação
- [ ] Fotos de produto adicionadas
- [ ] Imagem de destaque em notícia
- [ ] Verificar se aparecem no frontend

### 🌐 **FRONTEND**
- [ ] Página inicial carregando
- [ ] Imagens aparecendo nas associações
- [ ] Imagens aparecendo nas notícias
- [ ] Responsividade funcionando
- [ ] Animações funcionando

## 🚨 TROUBLESHOOTING

### ❌ **IMAGEM NÃO APARECE**
1. Verifique se a imagem foi publicada (não apenas salva)
2. Confirme se o content type foi publicado
3. Verifique se as permissões estão corretas
4. Recarregue a página do frontend

### 🔄 **CACHE DE IMAGENS**
Se as imagens não atualizarem:
1. Limpe o cache do navegador (Ctrl+F5)
2. Reinicie o frontend: `npm run dev`
3. Verifique se o Strapi está rodando

### 📱 **PROBLEMAS DE RESPONSIVIDADE**
As imagens são automaticamente otimizadas para diferentes tamanhos de tela.

## 🎉 RESULTADO FINAL

Após adicionar as imagens, você terá:
- ✅ **Logos das associações** na página inicial e páginas individuais
- ✅ **Galerias de fotos** nas páginas das associações
- ✅ **Imagens de produtos** nas páginas de produtos
- ✅ **Imagens de destaque** nas notícias
- ✅ **Design totalmente visual** e profissional

---

## 📞 PRECISA DE AJUDA?

Se tiver dúvidas:
1. Verifique se o Strapi está rodando: `http://localhost:1337/admin`
2. Confirme se o frontend está rodando: `http://localhost:3000`
3. Teste com imagens pequenas primeiro (menos de 5MB)
4. Verifique os logs no terminal para erros
