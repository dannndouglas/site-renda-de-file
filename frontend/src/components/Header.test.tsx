import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import * as headerModule from './Header';

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header', () => {
  it('mantém Notícias disponível quando o CMS está indisponível', () => {
    const html = renderToStaticMarkup(<headerModule.default />);

    expect(html).toContain('href="/noticias"');
    expect(html).toContain('Notícias');
  });

  it('normaliza e ordena os itens configurados no CMS', () => {
    const resolveHeaderMenuItems = (
      headerModule as typeof headerModule & {
        resolveHeaderMenuItems?: (
          items: Array<{ label: string; url: string; ordem: number }>,
        ) => Array<{ label: string; href: string }>;
      }
    ).resolveHeaderMenuItems;

    expect(typeof resolveHeaderMenuItems).toBe('function');
    expect(
      resolveHeaderMenuItems?.([
        { label: 'Contato', url: '/contato', ordem: 3 },
        { label: 'Notícias', url: '/noticias', ordem: 2 },
        { label: 'Início', url: '/', ordem: 1 },
      ]),
    ).toEqual([
      { label: 'Início', href: '/' },
      { label: 'Notícias', href: '/noticias' },
      { label: 'Contato', href: '/contato' },
    ]);
  });
});
