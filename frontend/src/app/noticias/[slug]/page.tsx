import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNoticiasEventos, convertRichTextToPlainText, getStrapiImageUrl } from '@/lib/strapi';

interface Props {
  params: {
    slug: string;
  };
}

export default async function NoticiaDetalhePage({ params }: Props) {
  const noticiasEventos = await getNoticiasEventos();
  const noticia = noticiasEventos.find(item => (item.slug || item.attributes?.slug) === params.slug);
  
  if (!noticia) {
    notFound();
  }

  // Buscar outras notícias relacionadas (excluindo a atual)
  const outrasNoticias = noticiasEventos
    .filter(item => item.id !== noticia.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <nav className="mb-6">
              <Link 
                href="/noticias" 
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                ← Voltar para Notícias
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4 mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                (noticia.tipo || noticia.attributes?.tipo) === 'Evento'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {noticia.tipo || noticia.attributes?.tipo}
              </span>
              <time className="text-gray-600">
                {(noticia.data_evento || noticia.attributes?.data_evento)
                  ? new Date(noticia.data_evento || noticia.attributes?.data_evento || '').toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                  : new Date(noticia.createdAt || noticia.attributes?.createdAt || Date.now()).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                }
              </time>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {noticia.titulo || noticia.attributes?.titulo}
            </h1>
          </div>
        </div>
      </section>

      {/* Imagem Destaque */}
      {(noticia.imagem_destaque || noticia.attributes?.imagem_destaque) && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <img
                src={getStrapiImageUrl(noticia.imagem_destaque || noticia.attributes?.imagem_destaque)}
                alt={noticia.imagem_destaque?.alternativeText || noticia.attributes?.imagem_destaque?.alternativeText || noticia.titulo || noticia.attributes?.titulo || ''}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      )}

      {/* Conteúdo */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none text-gray-700">
              <div className="whitespace-pre-line">
                {convertRichTextToPlainText(noticia.conteudo || noticia.attributes?.conteudo)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria */}
      {(noticia.galeria || noticia.attributes?.galeria) && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                Galeria de Fotos
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(noticia.galeria || noticia.attributes?.galeria || []).map((foto: any, index: number) => (
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

      {/* Compartilhar */}
      <section className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 sm:mb-0">
                Compartilhe esta {noticia.attributes.tipo.toLowerCase()}:
              </h3>
              <div className="flex space-x-4">
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
                <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Copiar Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outras Notícias */}
      {outrasNoticias.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">
                Outras Notícias
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {outrasNoticias.map((item) => (
                  <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      {item.attributes.imagem_destaque?.data ? (
                        <img 
                          src={`http://localhost:1337${item.attributes.imagem_destaque.data.attributes.url}`}
                          alt={item.attributes.imagem_destaque.data.attributes.alternativeText || item.attributes.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <p className="text-gray-600 text-center px-4">
                          [Imagem da {item.attributes.tipo}]
                        </p>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.attributes.tipo === 'Evento' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {item.attributes.tipo}
                        </span>
                        <time className="text-gray-500 text-xs">
                          {new Date(item.attributes.createdAt).toLocaleDateString('pt-BR')}
                        </time>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        {item.attributes.titulo}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        {item.attributes.conteudo.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                      <Link 
                        href={`/noticias/${item.attributes.slug}`}
                        className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-200"
                      >
                        Ler mais →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
