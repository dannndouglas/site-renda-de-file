# 📋 Instruções para Administradores - Site Renda de Filé

## 🎨 Como Personalizar a Página Inicial

### 1. Alterando o Fundo da Seção Hero

A seção principal (hero) da página inicial pode ter seu fundo personalizado de duas formas:

#### **Opção A: Fundo com Gradiente (Padrão)**
- Se nenhuma imagem for configurada, será exibido um gradiente amarelo/laranja
- Inclui elementos decorativos animados

#### **Opção B: Fundo com Imagem**
Para usar uma imagem como fundo:

1. **No Strapi Admin:**
   - Acesse `Content Manager > Página Inicial`
   - Edite o registro da página inicial
   - No campo `Imagem Hero`, faça upload da imagem desejada
   - Salve as alterações

2. **Características da imagem:**
   - **Resolução recomendada:** 1920x1080px ou superior
   - **Formato:** JPG, PNG ou WebP
   - **Tamanho máximo:** 5MB
   - **Proporção:** 16:9 (paisagem)

3. **Efeitos aplicados automaticamente:**
   - Overlay escuro (40% de opacidade) para melhor legibilidade
   - Efeito parallax no scroll
   - Responsividade automática
   - Texto em branco com sombra

### 2. Personalizando as Estatísticas

As estatísticas na seção laranja podem ser totalmente personalizadas:

#### **Campos Disponíveis no Strapi:**

1. **Títulos da Seção:**
   - `estatisticas.titulo` - Título principal (ex: "Preservando Tradições")
   - `estatisticas.titulo_destaque` - Parte destacada (ex: "Criando Futuro")
   - `estatisticas.subtitulo` - Descrição abaixo do título

2. **Estatística 1 - Associações:**
   - `estatisticas.numero_associacoes` - Número a ser exibido
   - `estatisticas.label_associacoes` - Texto abaixo do número

3. **Estatística 2 - Artesãs:**
   - `estatisticas.numero_artesas` - Número a ser exibido
   - `estatisticas.label_artesas` - Texto abaixo do número

4. **Estatística 3 - Tradição:**
   - `estatisticas.anos_tradicao` - Número a ser exibido
   - `estatisticas.label_anos_tradicao` - Texto abaixo do número

5. **Estatística 4 - Peças:**
   - `estatisticas.numero_pecas` - Número a ser exibido
   - `estatisticas.label_pecas` - Texto abaixo do número

#### **Como Editar no Strapi:**

1. Acesse `Content Manager > Página Inicial`
2. Edite o registro existente
3. Localize a seção `Estatísticas`
4. Preencha os campos desejados:
   ```
   Título: "Preservando Tradições"
   Título Destaque: "Criando Futuro"
   Subtítulo: "Números que representam nossa dedicação à arte da Renda de Filé"
   
   Número de Associações: 5
   Label Associações: "Associações"
   
   Número de Artesãs: 200
   Label Artesãs: "Artesãs"
   
   Anos de Tradição: 75
   Label Anos de Tradição: "Anos de História"
   
   Número de Peças: 2500
   Label Peças: "Peças Produzidas"
   ```
5. Salve as alterações

### 3. Valores Padrão (Fallback)

Se algum campo não for preenchido, o sistema usará valores padrão:

- **Associações:** 3+ (baseado no número real de associações cadastradas)
- **Artesãs:** 150+
- **Anos de Tradição:** 50+
- **Peças Criadas:** 1000+

## 🎯 Dicas Importantes

### **Para Imagens de Fundo:**
- Use imagens com boa qualidade e resolução
- Evite imagens muito escuras ou muito claras
- Teste a legibilidade do texto sobre a imagem
- Considere o tempo de carregamento (otimize as imagens)

### **Para Estatísticas:**
- Use números realistas e atualizados
- Mantenha os labels curtos e descritivos
- Atualize periodicamente para manter relevância
- O símbolo "+" é adicionado automaticamente

### **Efeitos Visuais:**
- Os números têm animação de contagem crescente
- A seção hero tem efeito parallax
- Todas as animações são otimizadas para performance
- O design é totalmente responsivo

## 🔄 Atualizações Automáticas

- As alterações no Strapi aparecem imediatamente no site
- Não é necessário reiniciar o servidor
- O cache é atualizado automaticamente
- As imagens são otimizadas automaticamente

## 📱 Responsividade

- Todas as personalizações funcionam em dispositivos móveis
- As imagens se adaptam automaticamente
- Os textos ajustam tamanho conforme a tela
- As estatísticas reorganizam em telas menores

## 🆘 Suporte

Em caso de dúvidas ou problemas:
1. Verifique se todos os campos estão preenchidos corretamente
2. Confirme que as imagens estão no formato correto
3. Teste em diferentes dispositivos
4. Entre em contato com o suporte técnico se necessário

---

**Última atualização:** Dezembro 2024
**Versão:** 1.0
