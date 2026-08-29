import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import Footer from './Footer';

describe('Footer', () => {
  it('começa oculto e expõe um marcador para revelar o rodapé no fim da página', () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain('data-footer-sentinel="true"');
    expect(html).toContain('class="delicate-footer delicate-footer--reveal"');
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('inert=""');
  });
});
