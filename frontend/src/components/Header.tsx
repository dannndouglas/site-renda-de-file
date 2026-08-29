'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const menuItems = [
  { label: 'Início', href: '/' },
  { label: 'História', href: '/sobre' },
  { label: 'Peças', href: '/produtos' },
  { label: 'Artesãs', href: '/associacoes' },
  { label: 'Contato', href: '/contato' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

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
