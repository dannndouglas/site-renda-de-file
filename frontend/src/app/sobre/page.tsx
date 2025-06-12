import { getPaginaSobre, getStrapiImageUrl, convertRichTextToPlainText } from '@/lib/strapi';
import PageHeader from '@/components/PageHeader';

export default async function SobrePage() {
  const paginaSobre = await getPaginaSobre();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHeader
        title={paginaSobre?.titulo_pagina || paginaSobre?.attributes?.titulo_pagina || 'Sobre a Renda de Filé'}
        subtitle="Conheça a história e o processo de criação desta arte tradicional"
        backgroundImage={paginaSobre?.imagem_fundo_cabecalho || paginaSobre?.attributes?.imagem_fundo_cabecalho}
      />

      {/* História */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  Nossa História
                </h2>
                <div className="prose prose-lg text-gray-600">
                  {(paginaSobre?.conteudo_historia || paginaSobre?.attributes?.conteudo_historia) ? (
                    <div className="whitespace-pre-line">
                      {convertRichTextToPlainText(paginaSobre.conteudo_historia || paginaSobre.attributes?.conteudo_historia)}
                    </div>
                  ) : (
                    <div>
                      <p className="mb-4">
                        A Renda de Filé é uma técnica artesanal tradicional que tem suas raízes 
                        profundamente fincadas na cultura nordestina. Em Jaguaribe, no Ceará, 
                        essa arte milenar é preservada e transmitida através das gerações.
                      </p>
                      <p className="mb-4">
                        Originária da Europa, a técnica chegou ao Brasil através dos colonizadores 
                        e foi adaptada pelas artesãs locais, que incorporaram elementos da cultura 
                        regional, criando um estilo único e característico.
                      </p>
                      <p>
                        Hoje, as associações de artesãs de Jaguaribe mantêm viva essa tradição, 
                        produzindo peças de alta qualidade que são reconhecidas em todo o país 
                        pela sua beleza e técnica refinada.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                {(paginaSobre?.imagem_historia || paginaSobre?.attributes?.imagem_historia) ? (
                  <img
                    src={getStrapiImageUrl(paginaSobre.imagem_historia || paginaSobre.attributes?.imagem_historia)}
                    alt={paginaSobre.imagem_historia?.alternativeText || paginaSobre.attributes?.imagem_historia?.alternativeText || 'História da Renda de Filé'}
                    className="rounded-lg shadow-lg w-full h-96 object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg h-96 flex items-center justify-center">
                    <p className="text-gray-600 text-center">
                      [Imagem histórica da Renda de Filé]
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo de Criação */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Processo de Criação
              </h2>
              <p className="text-lg text-gray-600">
                Descubra como cada peça é cuidadosamente criada
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                {(paginaSobre?.video_processo || paginaSobre?.attributes?.video_processo) ? (
                  <video
                    controls
                    className="w-full rounded-lg shadow-lg"
                  >
                    <source src={getStrapiImageUrl(paginaSobre.video_processo || paginaSobre.attributes?.video_processo)} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                ) : (paginaSobre?.imagem_processo || paginaSobre?.attributes?.imagem_processo) ? (
                  <img
                    src={getStrapiImageUrl(paginaSobre.imagem_processo || paginaSobre.attributes?.imagem_processo)}
                    alt={paginaSobre.imagem_processo?.alternativeText || paginaSobre.attributes?.imagem_processo?.alternativeText || 'Processo de criação'}
                    className="w-full rounded-lg shadow-lg h-64 object-cover"
                  />
                ) : (
                  <div className="bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg h-64 flex items-center justify-center">
                    <p className="text-gray-600 text-center">
                      [Vídeo do processo de criação]
                    </p>
                  </div>
                )}
              </div>
              <div className="order-1 lg:order-2">
                <div className="prose prose-lg text-gray-600">
                  {(paginaSobre?.conteudo_processo_criacao || paginaSobre?.attributes?.conteudo_processo_criacao) ? (
                    <div className="whitespace-pre-line">
                      {convertRichTextToPlainText(paginaSobre.conteudo_processo_criacao || paginaSobre.attributes?.conteudo_processo_criacao)}
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Técnica e Tradição
                      </h3>
                      <p className="mb-4">
                        O processo de criação da Renda de Filé é meticuloso e requer 
                        grande habilidade. Cada peça começa com a preparação da tela 
                        de filé, uma rede de malhas quadradas que serve como base.
                      </p>
                      <p className="mb-4">
                        As artesãs então trabalham com agulha e linha, criando desenhos 
                        através do preenchimento seletivo das malhas. Os padrões podem 
                        variar desde motivos florais até figuras geométricas complexas.
                      </p>
                      <p>
                        Cada ponto é colocado com precisão, resultando em peças únicas 
                        que podem levar semanas ou até meses para serem concluídas, 
                        dependendo da complexidade do desenho.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galeria do Processo */}
      {(paginaSobre?.galeria_imagens || paginaSobre?.attributes?.galeria_imagens) && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
                Galeria de Imagens
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(paginaSobre.galeria_imagens || paginaSobre.attributes?.galeria_imagens || []).map((imagem: any, index: number) => (
                  <div key={index} className="relative group">
                    <img
                      src={getStrapiImageUrl(imagem)}
                      alt={imagem.alternativeText || imagem.attributes?.alternativeText || `Imagem ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Conheça Nossas Associações
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Descubra as talentosas artesãs que mantêm viva essa tradição
            </p>
            <a 
              href="/associacoes" 
              className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Ver Associações
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
