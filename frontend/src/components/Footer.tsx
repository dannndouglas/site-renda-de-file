'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [isNearBottom, setIsNearBottom] = useState(false);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearBottom(entry.isIntersecting),
      { rootMargin: '0px 0px 160px 0px', threshold: 0.01 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const observer = new ResizeObserver(([entry]) => {
      const borderBox = entry.borderBoxSize?.[0];
      const height = borderBox?.blockSize ?? entry.contentRect.height;
      setFooterHeight(height);
      document.documentElement.style.setProperty('--delicate-footer-height', `${height}px`);
    });

    observer.observe(footer);
    return () => {
      observer.disconnect();
      document.documentElement.style.removeProperty('--delicate-footer-height');
    };
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        className="delicate-footer-sentinel"
        data-footer-sentinel="true"
        aria-hidden="true"
        style={footerHeight > 0 ? { blockSize: `${footerHeight}px` } : undefined}
      />
      <footer
        ref={footerRef}
        className={`delicate-footer delicate-footer--reveal${isNearBottom ? ' is-visible' : ''}`}
        aria-hidden={!isNearBottom}
        inert={!isNearBottom}
      >
        <div className="delicate-shell delicate-footer__grid">
          <div className="delicate-footer__brand">
            <strong>Renda de Filé de Jaguaribe</strong>
            <p>Tradição que se tece. Beleza que permanece.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <Link href="/sobre">História</Link>
            <Link href="/produtos">Peças</Link>
            <Link href="/associacoes">Artesãs</Link>
            <Link href="/contato">Contato</Link>
          </nav>
          <div className="delicate-footer__legal">
            <span>Jaguaribe — Ceará</span>
            <span>© {new Date().getFullYear()} Todos os direitos reservados.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
