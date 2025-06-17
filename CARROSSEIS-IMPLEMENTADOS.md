# Carrosséis Implementados

## Resumo das Mudanças

Foram implementados carrosséis para as seções **Galeria em Destaque** e **Nossas Associações** na página inicial, conforme solicitado.

## 🎠 Galeria em Destaque

### Características Implementadas:
- ✅ **Carrossel em linha única** - As imagens agora são exibidas em uma única linha
- ✅ **Navegação com setas laterais** - Setas de navegação para esquerda e direita
- ✅ **Efeito de esmaecimento** - Gradiente nas bordas para prévia dos próximos itens
- ✅ **Limite de 15 imagens** - Configurado no schema do Strapi
- ✅ **Responsivo** - Adapta-se a diferentes tamanhos de tela:
  - Desktop (≥1024px): 3 itens por vez
  - Tablet (≥768px): 2 itens por vez
  - Mobile (<768px): 1 item por vez

### Arquivos Modificados:
- `frontend/src/components/GaleriaDestaque.tsx` - Convertido de grid para carrossel
- `backend/src/api/pagina-inicial/content-types/pagina-inicial/schema.json` - Adicionado limite de 15 imagens

## 🏢 Nossas Associações

### Características Implementadas:
- ✅ **Carrossel em linha única** - Todas as associações em uma única linha
- ✅ **Navegação com setas laterais** - Setas de navegação para esquerda e direita
- ✅ **Efeito de esmaecimento** - Gradiente nas bordas para prévia dos próximos itens
- ✅ **Todas as associações** - Exibe todas as associações cadastradas (não limitado a 3)
- ✅ **Responsivo** - Adapta-se a diferentes tamanhos de tela:
  - Desktop (≥1024px): 3 itens por vez
  - Tablet (≥768px): 2 itens por vez
  - Mobile (<768px): 1 item por vez

### Arquivos Criados/Modificados:
- `frontend/src/components/CarrosselAssociacoes.tsx` - Novo componente de carrossel
- `frontend/src/components/DynamicHomePage.tsx` - Integração do carrossel de associações

## 🎨 Funcionalidades dos Carrosséis

### Navegação:
- **Setas laterais**: Aparecem apenas quando há itens para navegar
- **Transições suaves**: Animação de 500ms com easing
- **Efeito hover**: Setas mudam de cor ao passar o mouse

### Efeitos Visuais:
- **Esmaecimento lateral**: Gradiente branco nas bordas para indicar continuidade
- **Hover effects**: Escala e sombra nos itens
- **Animações**: Entrada suave dos itens com delay escalonado

### Responsividade:
- **Breakpoints automáticos**: Ajuste dinâmico do número de itens visíveis
- **Touch-friendly**: Preparado para gestos em dispositivos móveis (pode ser expandido)

## 🔧 Configurações Técnicas

### Galeria Destaque:
```typescript
// Limite máximo de imagens
const imagensLimitadas = imagens?.slice(0, 15) || [];

// Responsividade
if (window.innerWidth >= 1024) setItemsPerView(3);
else if (window.innerWidth >= 768) setItemsPerView(2);
else setItemsPerView(1);
```

### Schema Strapi (Galeria Destaque):
```json
"galeria_destaque": {
  "type": "media",
  "multiple": true,
  "required": false,
  "allowedTypes": ["images"],
  "max": 15
}
```

## 📱 Como Usar

### Para Administradores:
1. **Galeria Destaque**: No painel do Strapi, vá em "Página Inicial" e adicione até 15 imagens na "Galeria Destaque"
2. **Associações**: Cadastre associações normalmente - todas aparecerão automaticamente no carrossel

### Para Usuários:
1. **Navegação**: Use as setas laterais para navegar pelos itens
2. **Visualização**: Clique nas imagens da galeria para abrir em tela cheia
3. **Links**: Clique nos cards das associações para ver detalhes

## 🚀 Próximos Passos Sugeridos

1. **Gestos touch**: Implementar swipe em dispositivos móveis
2. **Auto-play**: Opção de rotação automática
3. **Indicadores**: Pontos indicadores na parte inferior
4. **Lazy loading**: Carregamento sob demanda para melhor performance

## 🐛 Resolução de Problemas

Se os carrosséis não aparecerem:
1. Verifique se há dados no Strapi (imagens na galeria, associações cadastradas)
2. Reinicie o frontend: `npm run dev`
3. Verifique o console do navegador para erros
4. Certifique-se de que o backend está rodando na porta 1337
