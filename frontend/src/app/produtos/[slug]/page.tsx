import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProdutos, getAssociacoes, convertRichTextToPlainText, getStrapiImageUrl } from '@/lib/strapi';
import ProductImageGallery from '@/components/ProductImageGallery';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProdutoDetalhePage({ params }: Props) {
  const resolvedParams = await params;
  const produtos = await getProdutos();
  const produto = produtos.find(item => (item.slug || item.attributes?.slug) === resolvedParams.slug);
  
  if (!produto) {
    notFound();
  }

  // Buscar dados da associação
  const associacoes = await getAssociacoes();
  const associacao = associacoes.find(assoc => 
    (assoc.id === produto.associacao?.id) || 
    (assoc.id === produto.attributes?.associacao?.data?.id)
  );

  // Buscar outros produtos da mesma associação
  const outrosProdutos = produtos
    .filter(item => 
      item.id !== produto.id && 
      ((item.associacao?.id === produto.associacao?.id) || 
       (item.attributes?.associacao?.data?.id === produto.attributes?.associacao?.data?.id))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/" className="text-amber-600 hover:text-amber-700">
                Início
              </Link>
              <span className="text-gray-500">›</span>
              <Link href="/produtos" className="text-amber-600 hover:text-amber-700">
                Produtos
              </Link>
              <span className="text-gray-500">›</span>
              <span className="text-gray-700">
                {produto.nome || produto.attributes?.nome}
              </span>
            </nav>
          </div>
        </div>
      </section>

      {/* Produto Principal */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Galeria de Imagens */}
              <div className="space-y-6">
                <ProductImageGallery
                  images={produto.fotos_produto || produto.attributes?.fotos_produto || []}
                  productName={produto.nome || produto.attributes?.nome || ''}
                />

                {/* Vídeo Demonstrativo */}
                {(produto.video_demonstrativo || produto.attributes?.video_demonstrativo) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Vídeo Demonstrativo</h3>
                    <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
                      <video
                        controls
                        className="w-full h-auto"
                      >
                        <source
                          src={getStrapiImageUrl(produto.video_demonstrativo || produto.attributes?.video_demonstrativo)}
                          type="video/mp4"
                        />
                        Seu navegador não suporta vídeos.
                      </video>
                    </div>
                  </div>
                )}
              </div>

              {/* Informações do Produto */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    {produto.nome || produto.attributes?.nome}
                  </h1>
                  
                  {/* Categoria */}
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      {produto.categoria || produto.attributes?.categoria}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      (produto.disponivel || produto.attributes?.disponivel) 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {(produto.disponivel || produto.attributes?.disponivel) ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>

                  {/* Preço */}
                  <div className="mb-6">
                    <span className="text-3xl font-bold text-amber-600">
                      R$ {(produto.preco || produto.attributes?.preco || 0).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Descrição */}
                {(produto.descricao || produto.attributes?.descricao) && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Descrição</h3>
                    <div className="prose text-gray-600">
                      <div className="whitespace-pre-line">
                        {convertRichTextToPlainText(produto.descricao || produto.attributes?.descricao)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Associação */}
                {associacao && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Produzido por</h3>
                    <Link 
                      href={`/associacoes/${associacao.slug || associacao.attributes?.slug}`}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      {(associacao.logo || associacao.attributes?.logo) && (
                        <img 
                          src={getStrapiImageUrl(associacao.logo || associacao.attributes?.logo)}
                          alt={associacao.nome || associacao.attributes?.nome || ''}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {associacao.nome || associacao.attributes?.nome}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {associacao.cidade || associacao.attributes?.cidade}, {associacao.estado || associacao.attributes?.estado}
                        </p>
                      </div>
                    </Link>
                  </div>
                )}

                {/* Botões de Ação */}
                <div className="border-t pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="flex-1 bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
                      Entrar em Contato
                    </button>
                    <button className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                      Compartilhar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outros Produtos da Associação */}
      {outrosProdutos.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                {associacao?.nome || associacao?.attributes?.nome
                  ? `Outros Produtos da ${associacao.nome || associacao.attributes?.nome}`
                  : 'Outros Produtos da Renda de Filé'
                }
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {outrosProdutos.map((item) => (
                  <Link 
                    key={item.id}
                    href={`/produtos/${item.slug || item.attributes?.slug || item.id}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="h-48 bg-gray-100">
                      {(item.fotos_produto || item.attributes?.fotos_produto)?.[0] ? (
                        <img 
                          src={getStrapiImageUrl((item.fotos_produto || item.attributes?.fotos_produto)?.[0])}
                          alt={item.nome || item.attributes?.nome || ''}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500">
                          Sem imagem
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {item.nome || item.attributes?.nome}
                      </h3>
                      <p className="text-amber-600 font-bold">
                        R$ {(item.preco || item.attributes?.preco || 0).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
