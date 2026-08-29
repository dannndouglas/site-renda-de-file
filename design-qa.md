# Design QA — página inicial responsiva

## Escopo

- Branch: `codex/redesign-home-delicada-scroll`
- Prévia: `http://localhost:3001/`
- Referência fornecida: `C:\Users\danie\.codex\visualizations\2026\08\28\01a049f4-19e4-7eb2-bdb3-bf7456686bce\scroll-snap-qa\reference-before.png`
- Comparação lado a lado: `C:\Users\danie\.codex\visualizations\2026\08\28\01a049f4-19e4-7eb2-bdb3-bf7456686bce\scroll-snap-qa\comparison-2531x1262.png`

## Verificação visual

| Viewport | Resultado |
| --- | --- |
| 320 × 800 | Sem overflow horizontal; hero e CTA permanecem legíveis; scroll natural. |
| 390 × 844 | Hero cabe na área útil; história compacta; peças em linhas de mídia; menu móvel funcional. |
| 768 × 1024 | Layout fluido sem overflow; scroll natural; grade de peças preservada. |
| 1024 × 768 | Hero em tela útil completa; scroll snap ativo; largura interna uniforme. |
| 1366 × 900 | Cinco seções com altura útil de 788 px; shells internos com a mesma largura e alinhamento. |
| 1920 × 1080 | Conteúdo centralizado dentro do limite de 82 rem, sem esticar imagens ou texto. |
| 2531 × 1262 | Comparação feita no mesmo viewport da referência. |

## Interações

- Scroll por seções no desktop com ponteiro preciso: um gesto anima exatamente uma seção por vez e posiciona o conteúdo abaixo do cabeçalho fixo.
- A interpolação usa 720 ms, responde ao primeiro delta vertical e mantém uma desaceleração contínua; o snap nativo fica apenas como fallback quando o controlador não está ativo.
- Durante a interpolação, `scroll-behavior` fica em `auto` para evitar dupla suavização e atraso entre o gesto e o primeiro deslocamento.
- Mobile e tablet vertical: `scroll-snap-type: none`.
- Desktop e tablet horizontal: `scroll-snap-type: y mandatory`.
- Menu móvel: abre, fecha, expõe estado por `aria-expanded` e não cria overflow.
- `prefers-reduced-motion`: animações e scroll snap são desativados.
- Rodapé revelável: oculto com `aria-hidden` e `inert` fora do fim da página; visível e interativo quando o marcador entra na área de aproximação.
- Reserva responsiva: `158.55px` em 1366 × 900 e `333.83px` em 390 × 844, sem cobrir o conteúdo anterior.
- Limite final: o marcador do rodapé ocupa 1 px com margem negativa na página inicial; em 1280 × 720, `scrollY`, `maxScroll` e o destino da última seção coincidiram em `2612px`.
- Gesto para baixo na última seção: permaneceu em `2612px`, sem deslocamento residual.
- Páginas internas: comportamento confirmado em `/termos`; páginas curtas revelam o rodapé assim que o marcador entra na margem de aproximação.

## Diferenças intencionais em relação à referência

- A hero agora ocupa toda a altura útil da viewport; a referência mostrava parte da seção seguinte.
- A largura de todas as áreas internas foi unificada em um único shell de 82 rem.
- No celular, os cards de peças foram convertidos em linhas de imagem + texto para reduzir altura e melhorar varredura.
- O scroll snap é restrito a telas grandes para não prejudicar conteúdo que cresce em mobile.

## Achados finais

- Nenhum overflow horizontal entre 320 e 2531 px.
- Nenhuma seção usa largura interna divergente.
- Conteúdo permanece acessível quando uma seção precisa ultrapassar a altura mínima no celular.
- A direção minimalista e delicada original foi preservada.
- Evidências do rodapé: `footer-reveal-1366x900.png` e `footer-reveal-390x844.png` na pasta de QA.

Final result: passed
