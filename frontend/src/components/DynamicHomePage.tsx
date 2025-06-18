'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { getAssociacoes, getProdutos, getNoticiasEventos, convertRichTextToPlainText, getStrapiImageUrl, getPaginaInicial } from '@/lib/strapi';
import GaleriaDestaque from './GaleriaDestaque';
import CarrosselAssociacoes from './CarrosselAssociacoes';

export default function DynamicHomePage() {
  const [associacoes, setAssociacoes] = useState<any[]>([]);
  const [noticias, setNoticias] = useState<any[]>([]);
  const [paginaInicial, setPaginaInicial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const newsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [associacoesData, noticiasData, paginaInicialData] = await Promise.all([
          getAssociacoes(),
          getNoticiasEventos(),
          getPaginaInicial()
        ]);

        console.log('Dados carregados:', {
          associacoes: associacoesData.length,
          noticias: noticiasData.length,
          paginaInicial: paginaInicialData
        });

        setAssociacoes(associacoesData); // Usar todas as associações para o carrossel
        setNoticias(noticiasData.slice(0, 3));
        setPaginaInicial(paginaInicialData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative py-20 overflow-hidden min-h-[80vh] flex items-center"
        style={{
          background: paginaInicial?.attributes?.imagem_fundo_hero || paginaInicial?.imagem_fundo_hero
            ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${getStrapiImageUrl(paginaInicial?.attributes?.imagem_fundo_hero || paginaInicial?.imagem_fundo_hero)})`
            : 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fdba74 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Elementos decorativos animados - só aparecem se não houver imagem de fundo */}
        {!(paginaInicial?.attributes?.imagem_fundo_hero || paginaInicial?.imagem_fundo_hero) && (
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ y }}
          >
            <div className="absolute top-20 left-10 w-32 h-32 bg-amber-300 rounded-full blur-xl" />
            <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full blur-lg" />
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-yellow-300 rounded-full blur-2xl" />
          </motion.div>
        )}

        <motion.div
          className="container mx-auto px-4 relative z-10"
          style={{ opacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              className={`text-4xl md:text-6xl font-bold mb-6 relative ${
                (paginaInicial?.attributes?.imagem_fundo_hero || paginaInicial?.imagem_fundo_hero)
                  ? 'text-white drop-shadow-lg'
                  : 'text-gray-800'
              }`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {paginaInicial?.titulo_principal || paginaInicial?.attributes?.titulo_principal || 'Renda de Filé de Jaguaribe'}
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-amber-400 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </motion.h1>

            <motion.p
              className={`text-xl md:text-2xl mb-8 ${
                (paginaInicial?.attributes?.imagem_fundo_hero || paginaInicial?.imagem_fundo_hero)
                  ? 'text-gray-100 drop-shadow-md'
                  : 'text-gray-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {paginaInicial?.subtitulo || paginaInicial?.attributes?.subtitulo || 'Preservando a tradição artesanal e promovendo a cultura jaguaribana'}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
              >
                <Link
                  href={paginaInicial?.link_chamada_acao || paginaInicial?.attributes?.link_chamada_acao || '/sobre'}
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  {paginaInicial?.texto_chamada_acao || paginaInicial?.attributes?.texto_chamada_acao || 'Conheça Nossa História'}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
              >
                <Link
                  href="/associacoes"
                  className="border-2 border-amber-600 text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Ver Associações
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-amber-600 rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-3 bg-amber-600 rounded-full mt-2"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Seção Sobre */}
      <section
        ref={aboutRef}
        className="py-20 bg-white relative overflow-hidden"
      >
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
                  Sobre a Renda de Filé
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transform scale-x-0 animate-pulse"></div>
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Uma arte tradicional que preserva a cultura e gera renda para as famílias de Jaguaribe
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="transform hover:translate-x-2 transition-transform duration-300">
                  <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                    <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full mr-4"></div>
                    Tradição e Inovação
                  </h3>
                </div>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p className="text-gray-700 hover:text-gray-900 transition-colors duration-300">
                    A Renda de Filé é uma técnica artesanal tradicional que combina história,
                    cultura e sustentabilidade. Cada peça é única, feita à mão por artesãs
                    talentosas que preservam essa arte centenária.
                  </p>
                  <p className="text-gray-700 hover:text-gray-900 transition-colors duration-300">
                    Nosso portal conecta essas artesãs ao mundo, promovendo suas criações
                    e garantindo que essa tradição continue viva para as próximas gerações.
                  </p>
                </div>
                <div className="pt-4">
                  <Link
                    href="/sobre"
                    className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Saiba mais sobre nossa história
                    <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative rounded-2xl h-96 transform group-hover:scale-105 transition-transform duration-300 shadow-xl overflow-hidden">
                  {paginaInicial?.attributes?.imagem_secao_sobre || paginaInicial?.imagem_secao_sobre ? (
                    <img
                      src={getStrapiImageUrl(paginaInicial?.attributes?.imagem_secao_sobre || paginaInicial?.imagem_secao_sobre)}
                      alt="Arte Tradicional"
                      className="w-full h-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-amber-100 to-orange-200 rounded-2xl p-8 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg transform group-hover:rotate-12 transition-transform duration-300">
                          <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-800 mb-3">Arte Tradicional</h4>
                        <p className="text-gray-700 text-lg">Técnicas passadas de geração em geração</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Vídeo Institucional */}
      {(paginaInicial?.video_institucional || paginaInicial?.attributes?.video_institucional) && (
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
                    Conheça Nossa História
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  </h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
                  Assista ao vídeo e descubra a tradição da Renda de Filé
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
                  <video
                    controls
                    className="w-full h-auto"
                    poster={getStrapiImageUrl(paginaInicial?.attributes?.imagem_secao_sobre || paginaInicial?.imagem_secao_sobre)}
                  >
                    <source
                      src={getStrapiImageUrl(paginaInicial?.video_institucional || paginaInicial?.attributes?.video_institucional)}
                      type="video/mp4"
                    />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Galeria Destaque */}
      {(paginaInicial?.galeria_destaque || paginaInicial?.attributes?.galeria_destaque) && (
        <section className="py-20 bg-white relative overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-block">
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
                    Galeria em Destaque
                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                  </h2>
                </div>
                <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
                  Conheça a beleza e qualidade dos nossos produtos artesanais
                </p>
              </div>

              <GaleriaDestaque
                imagens={paginaInicial?.galeria_destaque || paginaInicial?.attributes?.galeria_destaque || []}
              />

              <div className="text-center mt-12">
                <Link
                  href="/produtos"
                  className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Ver Todos os Produtos
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção de Estatísticas */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-br from-amber-50 to-orange-100 relative overflow-hidden"
      >
        {/* Padrão decorativo de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
                  Preservando <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Tradições</span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 mt-6">
                Criando Futuro
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: associacoes.length || 8, label: 'Associações' },
                { number: 150, label: 'Artesãs' },
                { number: 100, label: 'Anos de Tradição' },
                { number: 5000, label: 'Peças Produzidas' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="group text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-amber-100"
                >
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent mb-4">
                    {stat.number}+
                  </div>
                  <div className="text-gray-700 font-semibold text-lg group-hover:text-gray-900 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Associações */}
      <section className="py-20 bg-white relative">
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
                  Nossas Associações
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
                Conheça as talentosas artesãs que preservam nossa tradição
              </p>
            </div>

            {associacoes.length > 0 ? (
              <div className="mb-12">
                <CarrosselAssociacoes associacoes={associacoes} />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Associações em Breve</h3>
                <p className="text-gray-600 mb-6">
                  Estamos preparando o conteúdo das associações. Em breve você poderá conhecer todas as talentosas artesãs da região.
                </p>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/associacoes"
                className="group inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Ver Todas as Associações
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Notícias */}
      <section
        ref={newsRef}
        className="py-20 bg-gray-50 relative overflow-hidden"
      >
        {/* Elementos decorativos de fundo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 relative">
                  Últimas Notícias
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mt-6">
                Fique por dentro das novidades e eventos
              </p>
            </div>

            {noticias.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {noticias.map((noticia, index) => (
                  <article
                    key={noticia.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 flex items-center justify-center">
                      {(noticia.imagem_destaque || noticia.attributes?.imagem_destaque) ? (
                        <img
                          src={getStrapiImageUrl(noticia.imagem_destaque || noticia.attributes?.imagem_destaque)}
                          alt={noticia.titulo || noticia.attributes?.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                          </div>
                          <p className="text-amber-600 font-medium">Notícia</p>
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          (noticia.tipo || noticia.attributes?.tipo) === 'Evento'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {noticia.tipo || noticia.attributes?.tipo || 'Notícia'}
                        </span>
                        {(noticia.data_evento || noticia.attributes?.data_evento) && (
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(noticia.data_evento || noticia.attributes?.data_evento).toLocaleDateString('pt-BR')}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                        {noticia.titulo || noticia.attributes?.titulo}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {convertRichTextToPlainText(noticia.conteudo || noticia.attributes?.conteudo).substring(0, 120)}...
                      </p>

                      <Link
                        href={`/noticias/${noticia.slug || noticia.attributes?.slug}`}
                        className="text-amber-600 font-semibold hover:text-amber-700 transition-colors"
                      >
                        Ler mais →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Notícias em Breve</h3>
                <p className="text-gray-600 mb-6">
                  Estamos preparando as últimas novidades e eventos. Em breve você terá acesso a todo o conteúdo atualizado.
                </p>
              </div>
            )}

            <div className="text-center">
              <Link
                href="/noticias"
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Ver Todas as Notícias
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
