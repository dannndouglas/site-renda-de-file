import Link from 'next/link';
import { getNoticiasEventos, convertRichTextToPlainText, getStrapiImageUrl, getConfiguracaoSite, getPaginaNoticias } from '@/lib/strapi';
import PageHeader from '@/components/PageHeader';

export default async function NoticiasPage() {
  const [noticiasEventos, configuracao, paginaNoticias] = await Promise.all([
    getNoticiasEventos(),
    getConfiguracaoSite(),
    getPaginaNoticias()
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHeader
        title={paginaNoticias?.titulo || paginaNoticias?.attributes?.titulo || 'Notícias e Eventos'}
        subtitle={paginaNoticias?.subtitulo || paginaNoticias?.attributes?.subtitulo || `Fique por dentro das novidades e eventos da ${configuracao?.attributes?.nome_site || 'Renda de Filé de Jaguaribe'}`}
        backgroundImage={paginaNoticias?.imagem_fundo_cabecalho || paginaNoticias?.attributes?.imagem_fundo_cabecalho}
        backgroundPosition="center top"
      />

      {/* Lista de Notícias e Eventos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {noticiasEventos.length > 0 ? (
              <div className="space-y-8">
                {noticiasEventos.map((item) => (
                  <article key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                      {/* Imagem */}
                      <div className="lg:col-span-1">
                        <div className="h-64 lg:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          {(item.imagem_destaque || item.attributes?.imagem_destaque) ? (
                            <img
                              src={getStrapiImageUrl(item.imagem_destaque || item.attributes?.imagem_destaque)}
                              alt={(item.imagem_destaque?.alternativeText || item.attributes?.imagem_destaque?.alternativeText || item.titulo || item.attributes?.titulo)!}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <p className="text-gray-600 text-center px-4">
                              [Imagem da {item.tipo || item.attributes?.tipo || 'Notícia'}]
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Conteúdo */}
                      <div className="lg:col-span-2 p-6 lg:p-8">
                        <div className="flex items-center space-x-4 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            (item.tipo || item.attributes?.tipo) === 'Evento'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {item.tipo || item.attributes?.tipo || 'Notícia'}
                          </span>
                          <time className="text-gray-500 text-sm">
                            {(item.data_evento || item.attributes?.data_evento)
                              ? new Date(item.data_evento || item.attributes?.data_evento || '').toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })
                              : new Date(item.createdAt || item.attributes?.createdAt || Date.now()).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: 'long',
                                  year: 'numeric'
                                })
                            }
                          </time>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                          {item.titulo || item.attributes?.titulo || 'Título não disponível'}
                        </h2>

                        <div className="prose prose-lg text-gray-600 mb-6">
                          <p>
                            {convertRichTextToPlainText(item.conteudo || item.attributes?.conteudo).substring(0, 300) + '...' || 'Conteúdo não disponível'}
                          </p>
                        </div>

                        <Link
                          href={`/noticias/${item.slug || item.attributes?.slug || item.id}`}
                          className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-200"
                        >
                          Ler mais
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* Estado vazio */
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Nenhuma notícia ou evento cadastrado
                </h3>
                <p className="text-gray-600 mb-8">
                  As notícias e eventos serão publicados em breve. Volte sempre para conferir as novidades!
                </p>
                <Link 
                  href="/" 
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
                >
                  Voltar ao Início
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filtros (para implementação futura) */}
      {noticiasEventos.length > 0 && (
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-4 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200">
                  Todos
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Notícias
                </button>
                <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                  Eventos
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Signup */}
      <section className="py-16 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Não perca nenhuma novidade
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Cadastre-se para receber as últimas notícias e eventos da Renda de Filé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-amber-300 focus:outline-none"
              />
              <button className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Cadastrar
              </button>
            </div>
            <p className="text-amber-200 text-sm mt-4">
              Respeitamos sua privacidade. Você pode cancelar a qualquer momento.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
