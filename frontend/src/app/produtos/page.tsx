'use client';

import { getProdutos, getPaginaProdutos } from '@/lib/strapi';
import { convertRichTextToPlainText, getStrapiImageUrl } from '@/lib/strapi';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<any[]>([]);
  const [paginaProdutos, setPaginaProdutos] = useState<any>(null);
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('Todos');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const [produtosData, paginaData] = await Promise.all([
          getProdutos(),
          getPaginaProdutos()
        ]);
        setProdutos(produtosData);
        setProdutosFiltrados(produtosData);
        // Dados padrão quando a página não existe no Strapi
        setPaginaProdutos(paginaData || {
          titulo: 'Nossos Produtos',
          subtitulo: 'Descubra a beleza e qualidade dos produtos artesanais em Renda de Filé',
          imagem_fundo_cabecalho: null
        });
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
  }, []);

  useEffect(() => {
    let produtosFiltrados = [...produtos];

    // Filtro por categoria
    if (filtroCategoria !== 'Todos') {
      produtosFiltrados = produtosFiltrados.filter(produto =>
        (produto.categoria || produto.attributes?.categoria) === filtroCategoria
      );
    }

    // Filtro por disponibilidade
    if (filtroDisponibilidade === 'Disponíveis') {
      produtosFiltrados = produtosFiltrados.filter(produto =>
        produto.disponivel !== undefined ? produto.disponivel : produto.attributes?.disponivel
      );
    } else if (filtroDisponibilidade === 'Indisponíveis') {
      produtosFiltrados = produtosFiltrados.filter(produto =>
        produto.disponivel !== undefined ? !produto.disponivel : !produto.attributes?.disponivel
      );
    }

    // Ordenação
    produtosFiltrados.sort((a, b) => {
      if (ordenacao === 'preco_asc') {
        const precoA = a.preco || a.attributes?.preco || 0;
        const precoB = b.preco || b.attributes?.preco || 0;
        return precoA - precoB;
      } else if (ordenacao === 'preco_desc') {
        const precoA = a.preco || a.attributes?.preco || 0;
        const precoB = b.preco || b.attributes?.preco || 0;
        return precoB - precoA;
      } else {
        // Ordenação alfabética por nome
        const nomeA = (a.nome || a.attributes?.nome || '').toString().toLowerCase();
        const nomeB = (b.nome || b.attributes?.nome || '').toString().toLowerCase();
        return nomeA.localeCompare(nomeB);
      }
    });

    setProdutosFiltrados(produtosFiltrados);
  }, [produtos, filtroCategoria, filtroDisponibilidade, ordenacao]);

  const categorias = ['Todos', ...new Set(produtos.map(p => p.categoria || p.attributes?.categoria).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-amber-600 text-2xl">🧵</span>
          </div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHeader
        title={paginaProdutos?.titulo_pagina || paginaProdutos?.attributes?.titulo_pagina || 'Nossos Produtos'}
        subtitle={paginaProdutos?.subtitulo_pagina || paginaProdutos?.attributes?.subtitulo_pagina || 'Descubra a beleza e qualidade dos produtos artesanais em Renda de Filé'}
        backgroundImage={paginaProdutos?.imagem_fundo_cabecalho || paginaProdutos?.attributes?.imagem_fundo_cabecalho}
        backgroundPosition={converterPosicaoParaCSS(paginaProdutos?.posicao_imagem_fundo || paginaProdutos?.attributes?.posicao_imagem_fundo || "Centro")}
        overlayOpacity={converterOpacidadeParaCSS(paginaProdutos?.opacidade_overlay || paginaProdutos?.attributes?.opacidade_overlay || "Sem Overlay (0%)")}
      />

      {/* Lista de Produtos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {produtos.length > 0 ? (
              <>
                {/* Filtros e Ordenação */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Filtro por Categoria */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categoria
                      </label>
                      <select
                        value={filtroCategoria}
                        onChange={(e) => setFiltroCategoria(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      >
                        {categorias.map(categoria => (
                          <option key={categoria} value={categoria}>
                            {categoria}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Filtro por Disponibilidade */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Disponibilidade
                      </label>
                      <select
                        value={filtroDisponibilidade}
                        onChange={(e) => setFiltroDisponibilidade(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="Todos">Todos</option>
                        <option value="Disponíveis">Apenas Disponíveis</option>
                        <option value="Indisponíveis">Indisponíveis</option>
                      </select>
                    </div>

                    {/* Ordenação */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ordenar por
                      </label>
                      <select
                        value={ordenacao}
                        onChange={(e) => setOrdenacao(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option value="nome">Nome (A-Z)</option>
                        <option value="preco_asc">Preço (Menor para Maior)</option>
                        <option value="preco_desc">Preço (Maior para Menor)</option>
                      </select>
                    </div>
                  </div>

                  {/* Contador de resultados */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Mostrando {produtosFiltrados.length} de {produtos.length} produtos
                    </p>
                  </div>
                </div>

                {/* Grid de Produtos */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {produtosFiltrados.map((produto) => (
                    <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                      {/* Imagem do Produto */}
                      <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        {(produto.fotos_produto?.[0] || produto.attributes?.fotos_produto?.[0]) ? (
                          <img
                            src={getStrapiImageUrl(produto.fotos_produto?.[0] || produto.attributes?.fotos_produto?.[0])}
                            alt={(
                              produto.fotos_produto?.[0]?.alternativeText ||
                              produto.attributes?.fotos_produto?.[0]?.alternativeText ||
                              produto.nome || produto.attributes?.nome
                            )!}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-4">
                            <div className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-2">
                              <span className="text-amber-600 text-2xl">🧵</span>
                            </div>
                            <p className="text-gray-600 text-sm">Imagem em breve</p>
                          </div>
                        )}
                      </div>

                      {/* Informações do Produto */}
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-gray-800">
                            {produto.nome || produto.attributes?.nome}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            (produto.disponivel !== undefined ? produto.disponivel : produto.attributes?.disponivel)
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {(produto.disponivel !== undefined ? produto.disponivel : produto.attributes?.disponivel) ? 'Disponível' : 'Indisponível'}
                          </span>
                        </div>

                        <p className="text-amber-600 text-sm font-medium mb-2">
                          {produto.categoria || produto.attributes?.categoria}
                        </p>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {produto.descricao || produto.attributes?.descricao ? 
                            convertRichTextToPlainText(produto.descricao || produto.attributes?.descricao).substring(0, 150) + '...' :
                            'Descrição não disponível'
                          }
                        </p>

                        <div className="flex justify-between items-center">
                          <span className="text-2xl font-bold text-amber-600">
                            R$ {(produto.preco || produto.attributes?.preco)?.toFixed(2).replace('.', ',')}
                          </span>
                          
                          <Link 
                            href={`/produtos/${produto.slug || produto.attributes?.slug}`}
                            className="bg-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200"
                          >
                            Ver Detalhes
                          </Link>
                        </div>

                        {/* Associação de Origem */}
                        {(produto.associacao_origem?.data || produto.attributes?.associacao_origem?.data) && (
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <p className="text-xs text-gray-500">
                              Por: <Link 
                                href={`/associacoes/${(
                                  produto.associacao_origem?.data?.slug ||
                                  produto.associacao_origem?.data?.attributes?.slug ||
                                  produto.attributes?.associacao_origem?.data?.slug ||
                                  produto.attributes?.associacao_origem?.data?.attributes?.slug
                                )}`}
                                className="text-amber-600 hover:text-amber-700 font-medium"
                              >
                                {(
                                  produto.associacao_origem?.data?.nome ||
                                  produto.associacao_origem?.data?.attributes?.nome ||
                                  produto.attributes?.associacao_origem?.data?.nome ||
                                  produto.attributes?.associacao_origem?.data?.attributes?.nome
                                )}
                              </Link>
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-amber-600 text-4xl">🧵</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Nenhum produto encontrado
                </h3>
                <p className="text-gray-600 mb-8">
                  Os produtos estão sendo adicionados. Volte em breve!
                </p>
                <Link 
                  href="/associacoes"
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
                >
                  Conhecer Associações
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Interessado em nossos produtos?
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Entre em contato conosco para encomendas personalizadas e informações sobre disponibilidade
            </p>
            <Link 
              href="/contato"
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              Entrar em Contato
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
