'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getConfiguracaoSite, getStrapiImageUrl } from '@/lib/strapi';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [configuracao, setConfiguracao] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);

    const fetchConfiguracao = async () => {
      try {
        const config = await getConfiguracaoSite();
        setConfiguracao(config);
      } catch (error) {
        console.error('Erro ao carregar configuração do site:', error);
        // Mesmo com erro, definir configuração como null para garantir que o componente renderize
        setConfiguracao(null);
      }
    };

    fetchConfiguracao();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Menu items padrão - sempre disponível
  const defaultMenuItems = [
    { label: 'Início', url: '/', ordem: 1 },
    { label: 'Sobre', url: '/sobre', ordem: 2 },
    { label: 'Associações', url: '/associacoes', ordem: 3 },
    { label: 'Produtos', url: '/produtos', ordem: 4 },
    { label: 'Notícias', url: '/noticias', ordem: 5 },
    { label: 'Contato', url: '/contato', ordem: 6 }
  ];

  const menuItems = configuracao?.attributes?.menu_items || defaultMenuItems;

  // Função para verificar se o link está ativo
  const isActiveLink = (url: string) => {
    if (url === '/' && pathname === '/') return true;
    if (url !== '/' && pathname.startsWith(url)) return true;
    return false;
  };



  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            {configuracao?.attributes?.logo ? (
              <img
                src={getStrapiImageUrl(configuracao.attributes.logo)}
                alt={configuracao.attributes.logo.alternativeText || configuracao.attributes.nome_site}
                className="w-12 h-12 object-contain rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">RF</span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {configuracao?.attributes?.nome_site || 'Renda de Filé de Jaguaribe'}
              </h1>
              <p className="text-sm text-gray-600">
                {configuracao?.attributes?.subtitulo_site || ''}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav hidden md:flex items-center" role="navigation" aria-label="Menu principal">
            {(menuItems && menuItems.length > 0) ? (
              menuItems
                .sort((a, b) => a.ordem - b.ordem)
                .map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className={`menu-link ${isActiveLink(item.url) ? 'active' : ''}`}
                    aria-current={isActiveLink(item.url) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))
            ) : (
              // Fallback menu durante carregamento
              defaultMenuItems.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className={`menu-link ${isActiveLink(item.url) ? 'active' : ''}`}
                  aria-current={isActiveLink(item.url) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col space-y-1 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-gray-600 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <nav className="py-4 space-y-2">
            {(menuItems && menuItems.length > 0) ? (
              menuItems
                .sort((a, b) => a.ordem - b.ordem)
                .map((item) => (
                  <Link
                    key={item.url}
                    href={item.url}
                    className="block py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))
            ) : (
              // Fallback menu durante carregamento
              defaultMenuItems.map((item) => (
                <Link
                  key={item.url}
                  href={item.url}
                  className="block py-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
