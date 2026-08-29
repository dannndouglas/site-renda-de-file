import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import DynamicHomePage from './DynamicHomePage';

describe('DynamicHomePage', () => {
  it('entrega a narrativa minimalista mesmo quando o CMS está indisponível', () => {
    const html = renderToStaticMarkup(
      <DynamicHomePage paginaInicial={null} produtos={[]} associacoes={[]} />,
    );

    expect(html).toContain('Tradição tecida à mão');
    expect(html).toContain('Uma herança que permanece viva');
    expect(html).toContain('Peças feitas para permanecer');
    expect(html).toContain('O tempo de cada ponto');
    expect(html).toContain('Conheça quem mantém essa história viva');
    expect(html).not.toContain('Carregando');
    expect(html).not.toContain('Estatísticas');
    expect(html).not.toContain('Notícias');
  });

  it('expõe as cinco seções como paradas da navegação por tela', () => {
    const html = renderToStaticMarkup(
      <DynamicHomePage paginaInicial={null} produtos={[]} associacoes={[]} />,
    );

    expect(html).toContain('class="delicate-home delicate-snap-page"');
    expect(html.match(/data-home-section="/g)).toHaveLength(5);
    expect(html.match(/delicate-snap-section/g)).toHaveLength(5);
    expect(html).toContain('class="delicate-shell delicate-process__layout"');
  });
});
