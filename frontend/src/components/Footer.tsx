'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getConfiguracaoSite, getStrapiImageUrl } from '@/lib/strapi';

export default function Footer() {
  const [configuracao, setConfiguracao] = useState<any>(null);

  useEffect(() => {
    const fetchConfiguracao = async () => {
      try {
        const config = await getConfiguracaoSite();
        setConfiguracao(config);
      } catch (error) {
        console.error('Erro ao carregar configuração do site:', error);
      }
    };

    fetchConfiguracao();
  }, []);

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              {configuracao?.attributes?.logo ? (
                <img
                  src={getStrapiImageUrl(configuracao.attributes.logo)}
                  alt={configuracao.attributes.logo.alternativeText || configuracao.attributes.nome_site}
                  className="w-10 h-10 object-contain rounded-full"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">RF</span>
                </div>
              )}
              <div>
                <h3 className="text-lg font-bold">
                  {configuracao?.attributes?.nome_site || 'Renda de Filé de Jaguaribe'}
                </h3>
                <p className="text-sm text-gray-300">
                  {configuracao?.attributes?.subtitulo_site || 'Preservando nossa cultura'}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              {configuracao?.attributes?.footer?.descricao_site ||
                'Portal oficial da Renda de Filé de Jaguaribe, dedicado a preservar e promover a rica tradição artesanal das associações de artesãos do município.'}
            </p>
            <div className="flex space-x-4">
              {configuracao?.attributes?.informacoes_contato?.redes_sociais?.facebook && (
                <a
                  href={configuracao.attributes.informacoes_contato.redes_sociais.facebook}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {configuracao?.attributes?.informacoes_contato?.redes_sociais?.instagram && (
                <a
                  href={configuracao.attributes.informacoes_contato.redes_sociais.instagram}
                  className="text-gray-300 hover:text-amber-400 transition-colors duration-200"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Sobre a Renda de Filé
                </Link>
              </li>
              <li>
                <Link href="/associacoes" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Nossas Associações
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                  Notícias e Eventos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="block text-sm">
                  {configuracao?.attributes?.informacoes_contato?.endereco || 'Jaguaribe - CE'}
                </span>
                <span className="block text-sm">Brasil</span>
              </p>
              {configuracao?.attributes?.informacoes_contato?.email && (
                <p>
                  <a
                    href={`mailto:${configuracao.attributes.informacoes_contato.email}`}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {configuracao.attributes.informacoes_contato.email}
                  </a>
                </p>
              )}
              {configuracao?.attributes?.informacoes_contato?.telefone && (
                <p>
                  <a
                    href={`tel:${configuracao.attributes.informacoes_contato.telefone.replace(/\D/g, '')}`}
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    {configuracao.attributes.informacoes_contato.telefone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Linha divisória e copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              {configuracao?.attributes?.footer?.texto_copyright ||
                `© ${new Date().getFullYear()} Portal da Renda de Filé de Jaguaribe. Todos os direitos reservados.`}
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="/privacidade" className="text-gray-300 hover:text-amber-400 text-sm transition-colors duration-200">
                Política de Privacidade
              </Link>
              <Link href="/termos" className="text-gray-300 hover:text-amber-400 text-sm transition-colors duration-200">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
