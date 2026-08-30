'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getConfiguracaoSite, type ConfiguracaoSite } from '@/lib/strapi';

type ConfiguredMenuItem = NonNullable<ConfiguracaoSite['attributes']['menu_items']>[number];
type HeaderMenuItem = { label: string; href: string };

const fallbackMenuItems: HeaderMenuItem[] = [
  { label: 'Início', href: '/' },
  { label: 'História', href: '/sobre' },
  { label: 'Peças', href: '/produtos' },
  { label: 'Artesãs', href: '/associacoes' },
  { label: 'Notícias', href: '/noticias' },
  { label: 'Contato', href: '/contato' },
];

export function resolveHeaderMenuItems(items?: ConfiguredMenuItem[] | null): HeaderMenuItem[] {
  const configuredItems = [...(items ?? [])]
    .filter((item) => item.label?.trim() && item.url?.trim())
    .sort((a, b) => a.ordem - b.ordem)
    .map(({ label, url }) => ({ label, href: url }));

  return configuredItems.length > 0 ? configuredItems : fallbackMenuItems;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<HeaderMenuItem[]>(() => resolveHeaderMenuItems());

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    let isCurrent = true;

    void getConfiguracaoSite().then((configuracao) => {
      if (isCurrent) {
        setMenuItems(resolveHeaderMenuItems(configuracao?.attributes.menu_items));
      }
    });

    return () => {
      isCurrent = false;
    };
  }, []);

  const active = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="delicate-header">
      <div className="delicate-shell delicate-header__bar">
        <Link href="/" className="delicate-brand" aria-label="Renda de Filé de Jaguaribe — início">
          <span>Renda de Filé</span>
          <strong>de Jaguaribe</strong>
        </Link>

        <nav className="delicate-nav" aria-label="Navegação principal">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={active(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          className="delicate-menu-button"
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="delicate-mobile-nav"
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" size={20} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={20} strokeWidth={1.5} />}
        </button>
      </div>

      <div id="delicate-mobile-nav" className={`delicate-mobile-nav ${open ? 'is-open' : ''}`}>
        <nav className="delicate-shell" aria-label="Navegação móvel">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href} aria-current={active(item.href) ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
