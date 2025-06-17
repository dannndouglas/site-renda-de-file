import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAssociacaoBySlug, getProdutos, convertRichTextToPlainText, getStrapiImageUrl } from '@/lib/strapi';
import GoogleMap from '@/components/GoogleMap';

interface Props {
  params: {
    slug: string;
  };
}

export default async function AssociacaoDetalhePage({ params }: Props) {
  const { slug } = await params;
  const associacao = await getAssociacaoBySlug(slug);
  
  if (!associacao) {
    notFound();
  }

  // Buscar produtos desta associação
  const todosProdutos = await getProdutos();
  const produtosDaAssociacao = todosProdutos.filter(
    produto => produto.attributes?.associacao_origem?.data?.id === associacao.id
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <nav className="mb-6">
                  <Link 
                    href="/associacoes" 
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    ← Voltar para Associações
                  </Link>
                </nav>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  {associacao.attributes.nome}
                </h1>
                <div className="flex items-start space-x-2 mb-6">
                  <svg className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-lg text-gray-600">
                    {associacao.attributes.endereco_completo}
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                {(associacao.logo || associacao.attributes?.logo) ? (
                  <div className="w-48 h-48 rounded-full overflow-hidden">
                    <img
                      src={getStrapiImageUrl(associacao.logo || associacao.attributes?.logo)}
                      alt={associacao.attributes?.nome || associacao.nome || 'Logo da associação'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-6xl">
                      {(associacao.attributes?.nome || associacao.nome || 'A').charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* História da Associação */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
              Nossa História
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <div className="whitespace-pre-line">
                {convertRichTextToPlainText(associacao.historia || associacao.attributes?.historia)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vídeo Institucional */}
      {(associacao.video_institucional || associacao.attributes?.video_institucional) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
                Conheça Nossa Associação
              </h2>
              <div className="relative rounded-lg overflow-hidden shadow-lg bg-black">
                <video
                  controls
                  className="w-full h-auto"
                >
                  <source
                    src={getStrapiImageUrl(associacao.video_institucional || associacao.attributes?.video_institucional)}
                    type="video/mp4"
                  />
                  Seu navegador não suporta vídeos.
                </video>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Contatos */}
      {associacao.attributes.contatos && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                Entre em Contato
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {associacao.attributes.contatos.telefone && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Telefone</h3>
                    <p className="text-gray-600">{associacao.attributes.contatos.telefone}</p>
                  </div>
                )}

                {associacao.attributes.contatos.email && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">E-mail</h3>
                    <p className="text-gray-600">{associacao.attributes.contatos.email}</p>
                  </div>
                )}

                {associacao.attributes.contatos.whatsapp && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">WhatsApp</h3>
                    <p className="text-gray-600">{associacao.attributes.contatos.whatsapp}</p>
                  </div>
                )}

                {associacao.attributes.contatos.instagram && (
                  <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Instagram</h3>
                    <p className="text-gray-600">@{associacao.attributes.contatos.instagram}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galeria de Fotos */}
      {(associacao.galeria_fotos || associacao.attributes?.galeria_fotos) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                Galeria
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(associacao.galeria_fotos || associacao.attributes?.galeria_fotos || []).map((foto: any, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={getStrapiImageUrl(foto)}
                      alt={foto.alternativeText || foto.attributes?.alternativeText || `Foto ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Produtos da Associação */}
      {produtosDaAssociacao.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                Nossos Produtos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {produtosDaAssociacao.map((produto) => (
                  <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      {produto.attributes.fotos_produto?.data?.[0] ? (
                        <img 
                          src={`http://localhost:1337${produto.attributes.fotos_produto.data[0].attributes.url}`}
                          alt={produto.attributes.fotos_produto.data[0].attributes.alternativeText || produto.attributes.nome}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-600">[Foto do Produto]</p>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {produto.attributes.nome}
                        </h3>
                        <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                          {produto.attributes.categoria}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {produto.attributes.descricao.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      {produto.attributes.preco && (
                        <p className="text-lg font-bold text-amber-600 mb-2">
                          R$ {produto.attributes.preco.toFixed(2).replace('.', ',')}
                        </p>
                      )}
                      <div className="flex justify-between items-center">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          produto.attributes.disponivel 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {produto.attributes.disponivel ? 'Disponível' : 'Indisponível'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mapa */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
              Localização
            </h2>
            <GoogleMap
              address={associacao.attributes.endereco_completo}
              height="400px"
              className="shadow-lg"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
