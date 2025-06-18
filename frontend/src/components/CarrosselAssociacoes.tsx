'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getStrapiImageUrl } from '@/lib/strapi';

interface CarrosselAssociacoesProps {
  associacoes: any[];
}

export default function CarrosselAssociacoes({ associacoes }: CarrosselAssociacoesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  if (!associacoes || associacoes.length === 0) {
    return null;
  }

  const nextSlide = () => {
    const maxIndex = Math.max(0, associacoes.length - itemsPerView);
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const canGoNext = currentIndex < associacoes.length - itemsPerView;
  const canGoPrev = currentIndex > 0;

  return (
    <div className="relative pb-2">
      {/* Container do carrossel */}
      <div className="overflow-hidden pb-6 px-4" ref={carouselRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
          }}
        >
          {associacoes.map((associacao: any, index: number) => (
            <motion.div
              key={associacao.id}
              className="px-3 pb-4"
              style={{ width: `${100 / itemsPerView}%`, flexShrink: 0 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Link href={`/associacoes/${associacao.attributes?.slug || associacao.slug}`}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
                  {/* Imagem de Prévia da Associação */}
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-200 overflow-hidden relative">
                    {(associacao.imagem_previa || associacao.attributes?.imagem_previa) ? (
                      <img
                        src={getStrapiImageUrl(associacao.imagem_previa || associacao.attributes?.imagem_previa)}
                        alt={`Prévia da ${associacao.attributes?.nome || associacao.nome}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-2xl">
                            {(associacao.attributes?.nome || associacao.nome || 'A').charAt(0)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                      {associacao.attributes?.nome || associacao.nome}
                    </h3>
                    
                    {(associacao.attributes?.cidade || associacao.cidade) && (
                      <div className="flex items-center text-gray-500 mb-3">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{associacao.attributes?.cidade || associacao.cidade}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-amber-600 font-semibold group-hover:text-amber-700 transition-colors duration-300">
                        Saiba mais
                      </span>
                      <svg className="w-5 h-5 text-amber-600 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Setas de navegação */}
      {canGoPrev && (
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-amber-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {canGoNext && (
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 z-10 group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-amber-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
