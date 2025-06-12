# 📸 GUIA COMPLETO: Como Adicionar Imagens e Vídeos ao Portal

## 🎯 VISÃO GERAL

O Portal da Renda de Filé suporta upload de imagens e vídeos através do Strapi CMS. Este guia explica como adicionar mídias de forma segura e otimizada.

## 📋 TIPOS DE MÍDIA SUPORTADOS

### 🖼️ IMAGENS
- **Formatos**: JPG, JPEG, PNG, WebP, SVG
- **Tamanho máximo**: 10MB por arquivo
- **Resolução recomendada**: 
  - Logos: 400x400px
  - Fotos de produtos: 800x600px
  - Banners: 1920x1080px
  - Galeria: 1200x800px

### 🎥 VÍDEOS
- **Formatos**: MP4, WebM, MOV
- **Tamanho máximo**: 100MB por arquivo
- **Resolução recomendada**: 1080p (1920x1080)
- **Duração recomendada**: Até 5 minutos

## 🚀 COMO ADICIONAR MÍDIAS

### 1️⃣ ATRAVÉS DO PAINEL ADMINISTRATIVO

1. **Acesse o painel**: http://localhost:1337/admin
2. **Faça login** com suas credenciais
3. **Vá para Media Library** (Biblioteca de Mídia)
4. **Clique em "Upload"** ou arraste arquivos
5. **Preencha informações**:
   - Nome do arquivo
   - Texto alternativo (importante para acessibilidade)
   - Legenda (opcional)

### 2️⃣ ADICIONANDO A ASSOCIAÇÕES

1. **Vá para Content Manager > Associações**
2. **Edite uma associação existente** ou **crie nova**
3. **Campos de mídia disponíveis**:
   - **Logo**: Uma imagem principal da associação
   - **Galeria de Fotos**: Múltiplas imagens
   - **Vídeo Institucional**: Um vídeo sobre a associação

### 3️⃣ ADICIONANDO A PRODUTOS

1. **Vá para Content Manager > Produtos**
2. **Edite um produto** ou **crie novo**
3. **Campos de mídia**:
   - **Fotos do Produto**: Múltiplas imagens
   - **Vídeo Demonstrativo**: Vídeo mostrando o produto

### 4️⃣ ADICIONANDO A NOTÍCIAS/EVENTOS

1. **Vá para Content Manager > Notícias Eventos**
2. **Edite uma notícia** ou **crie nova**
3. **Campos de mídia**:
   - **Imagem de Destaque**: Imagem principal
   - **Galeria**: Múltiplas imagens
   - **Vídeo**: Vídeo relacionado

## 🛡️ BOAS PRÁTICAS DE SEGURANÇA

### ✅ VALIDAÇÕES IMPLEMENTADAS
- Verificação de tipo de arquivo
- Limite de tamanho por arquivo
- Sanitização de nomes de arquivo
- Verificação de extensões permitidas

### 🔒 CONFIGURAÇÕES DE SEGURANÇA
```javascript
// Configuração no Strapi (config/plugins.js)
module.exports = {
  upload: {
    config: {
      sizeLimit: 100 * 1024 * 1024, // 100MB
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
        xsmall: 64
      }
    }
  }
};
```

## 🎨 OTIMIZAÇÃO DE IMAGENS

### 📐 REDIMENSIONAMENTO AUTOMÁTICO
O Strapi gera automaticamente diferentes tamanhos:
- **thumbnail**: 245x156px
- **small**: 500x318px
- **medium**: 750x477px
- **large**: 1000x636px

### 🗜️ COMPRESSÃO
- Imagens são automaticamente comprimidas
- Qualidade otimizada para web
- Formatos modernos (WebP) quando suportados

## 🔧 CONFIGURAÇÃO AVANÇADA

### 1️⃣ CONFIGURAR PROVIDER DE ARMAZENAMENTO

Para produção, recomenda-se usar serviços de nuvem:

```bash
# AWS S3
npm install @strapi/provider-upload-aws-s3

# Cloudinary
npm install @strapi/provider-upload-cloudinary

# Google Cloud Storage
npm install @strapi/provider-upload-gcs
```

### 2️⃣ CONFIGURAR CDN

Para melhor performance:
- Use CloudFlare ou AWS CloudFront
- Configure cache headers apropriados
- Implemente lazy loading no frontend

## 📱 RESPONSIVIDADE

### 🖼️ IMAGENS RESPONSIVAS
O frontend usa `srcset` para diferentes tamanhos:
```jsx
<img 
  src={`${STRAPI_URL}${image.url}`}
  srcSet={`
    ${STRAPI_URL}${image.formats?.small?.url} 500w,
    ${STRAPI_URL}${image.formats?.medium?.url} 750w,
    ${STRAPI_URL}${image.formats?.large?.url} 1000w
  `}
  sizes="(max-width: 768px) 100vw, 50vw"
  alt={image.alternativeText}
/>
```

## 🚨 TROUBLESHOOTING

### ❌ PROBLEMAS COMUNS

1. **Arquivo muito grande**
   - Reduza o tamanho da imagem
   - Use ferramentas de compressão

2. **Formato não suportado**
   - Converta para JPG, PNG ou WebP
   - Verifique as configurações do Strapi

3. **Upload falha**
   - Verifique conexão com internet
   - Confirme permissões de pasta
   - Reinicie o Strapi se necessário

### 🔍 LOGS DE DEBUG
```bash
# Ver logs do Strapi
cd backend
npm run develop -- --debug

# Verificar uploads
ls -la public/uploads/
```

## 📊 MONITORAMENTO

### 📈 MÉTRICAS IMPORTANTES
- Tamanho total de arquivos
- Tempo de carregamento de páginas
- Taxa de conversão de imagens WebP
- Uso de bandwidth

### 🔧 FERRAMENTAS RECOMENDADAS
- Google PageSpeed Insights
- GTmetrix
- WebP Converter
- TinyPNG para compressão

## 🎯 PRÓXIMOS PASSOS

1. **Configure um CDN** para produção
2. **Implemente lazy loading** avançado
3. **Configure backup automático** das mídias
4. **Monitore performance** regularmente
5. **Otimize SEO** com alt texts apropriados

---

## 📞 SUPORTE

Para dúvidas sobre upload de mídias:
1. Consulte a documentação do Strapi
2. Verifique os logs de erro
3. Teste com arquivos menores primeiro
4. Confirme configurações de permissão
