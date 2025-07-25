import Link from 'next/link';
import { getAssociacoes, convertRichTextToPlainText, getStrapiImageUrl, getPaginaAssociacoes } from '@/lib/strapi';
import PageHeader from '@/components/PageHeader';

// Função para converter posições em português para CSS
function converterPosicaoParaCSS(posicao: string): string {
  const mapeamento: { [key: string]: string } = {
    'Centro': 'center center',
    'Centro Superior': 'center top',
    'Centro Inferior': 'center bottom',
    'Esquerda Centro': 'left center',
    'Direita Centro': 'right center',
    'Esquerda Superior': 'left top',
    'Direita Superior': 'right top',
    'Esquerda Inferior': 'left bottom',
    'Direita Inferior': 'right bottom'
  };

  return mapeamento[posicao] || 'center center';
}

// Função para converter opacidade em português para valor numérico
function converterOpacidadeParaCSS(opacidade: string): number {
  const mapeamento: { [key: string]: number } = {
    'Sem Overlay (0%)': 0,
    'Overlay Leve (25%)': 0.25,
    'Overlay Médio (50%)': 0.5,
    'Overlay Forte (75%)': 0.75,
    'Overlay Intenso (100%)': 1
  };

  return mapeamento[opacidade] || 0;
}

export default async function AssociacoesPage() {
  const [associacoes, paginaAssociacoes] = await Promise.all([
    getAssociacoes(),
    getPaginaAssociacoes()
  ]);



  // Dados padrão quando a página não existe no Strapi
  const dadosPagina = paginaAssociacoes || {
    titulo_pagina: 'Nossas Associações',
    subtitulo_pagina: 'Conheça as associações parceiras que preservam a tradição da Renda de Filé',
    imagem_fundo_cabecalho: null,
    posicao_imagem_fundo: 'Centro Superior',
    opacidade_overlay: 'Overlay Médio (50%)'
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHeader
        title={dadosPagina.titulo_pagina || dadosPagina.attributes?.titulo_pagina || 'Nossas Associações'}
        subtitle={dadosPagina.subtitulo_pagina || dadosPagina.attributes?.subtitulo_pagina || 'Conheça as associações parceiras que preservam a tradição da Renda de Filé'}
        backgroundImage={dadosPagina.imagem_fundo_cabecalho || dadosPagina.attributes?.imagem_fundo_cabecalho}
        backgroundPosition={converterPosicaoParaCSS(dadosPagina.posicao_imagem_fundo || dadosPagina.attributes?.posicao_imagem_fundo || "Centro")}
        overlayOpacity={converterOpacidadeParaCSS(dadosPagina.opacidade_overlay || dadosPagina.attributes?.opacidade_overlay || "Sem Overlay (0%)")}
      />

      {/* Lista de Associações */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {associacoes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {associacoes.map((associacao) => (
                  <div key={associacao.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    {/* Imagem de Prévia da Associação */}
                    <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 overflow-hidden">
                      {(associacao.imagem_previa || associacao.attributes?.imagem_previa) ? (
                        <img
                          src={getStrapiImageUrl(associacao.imagem_previa || associacao.attributes?.imagem_previa)}
                          alt={associacao.nome || associacao.attributes?.nome || 'Imagem da associação'}
                          className="w-full h-full object-cover"
                        />
                      ) : (associacao.logo || associacao.attributes?.logo) ? (
                        <div className="w-full h-full flex items-center justify-center p-4">
                          <img
                            src={getStrapiImageUrl(associacao.logo || associacao.attributes?.logo)}
                            alt={associacao.nome || associacao.attributes?.nome || 'Logo da associação'}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-white font-bold text-xl">
                                {(associacao.nome || associacao.attributes?.nome || 'A').charAt(0)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{associacao.nome || associacao.attributes?.nome}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Informações da Associação */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {associacao.nome}
                      </h3>

                      {/* Endereço */}
                      <div className="flex items-start space-x-2 mb-3">
                        <svg className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-sm text-gray-600">
                          {associacao.endereco_completo}
                        </p>
                      </div>

                      {/* Contatos */}
                      {associacao.contatos && (
                        <div className="space-y-1 mb-4">
                          {associacao.contatos.telefone && (
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                              <span className="text-sm text-gray-600">{associacao.contatos.telefone}</span>
                            </div>
                          )}
                          {associacao.contatos.email && (
                            <div className="flex items-center space-x-2">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              <span className="text-sm text-gray-600">{associacao.contatos.email}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Resumo da História */}
                      <div className="mb-4">
                        <p className="text-gray-600 text-sm line-clamp-3">
                          {convertRichTextToPlainText(associacao.historia || associacao.attributes?.historia).substring(0, 150)}...
                        </p>
                      </div>

                      {/* Link para detalhes */}
                      <Link
                        href={`/associacoes/${associacao.slug}`}
                        className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-200"
                      >
                        Ver detalhes
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Estado vazio */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Nenhuma associação cadastrada
                </h3>
                <p className="text-gray-600 mb-8">
                  As informações das associações serão adicionadas em breve.
                </p>
                <Link 
                  href="/contato" 
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
                >
                  Entre em Contato
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              Quer fazer parte?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Se você é uma artesã ou representa uma associação de Renda de Filé, 
              entre em contato conosco para fazer parte desta plataforma.
            </p>
            <Link 
              href="/contato" 
              className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
            >
              Entrar em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
