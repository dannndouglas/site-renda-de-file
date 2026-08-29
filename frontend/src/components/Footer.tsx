import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="delicate-footer">
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
  );
}
