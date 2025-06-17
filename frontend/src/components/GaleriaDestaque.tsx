'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getStrapiImageUrl } from '@/lib/strapi';

interface GaleriaDestaqueProps {
  imagens: any[];
}

export default function GaleriaDestaque({ imagens }: GaleriaDestaqueProps) {
  const [imagemSelecionada, setImagemSelecionada] = useState<number | null>(null);

  if (!imagens || imagens.length === 0) {
    return null;
  }

  const abrirModal = (index: number) => {
    setImagemSelecionada(index);
  };

  const fecharModal = () => {
    setImagemSelecionada(null);
  };

  const proximaImagem = () => {
    if (imagemSelecionada !== null) {
      setImagemSelecionada((imagemSelecionada + 1) % imagens.length);
    }
  };

  const imagemAnterior = () => {
    if (imagemSelecionada !== null) {
      setImagemSelecionada(imagemSelecionada === 0 ? imagens.length - 1 : imagemSelecionada - 1);
    }
  };

  // Navegação por teclado e controle do body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (imagemSelecionada !== null) {
        if (e.key === 'ArrowRight') proximaImagem();
        if (e.key === 'ArrowLeft') imagemAnterior();
        if (e.key === 'Escape') fecharModal();
      }
    };

    if (imagemSelecionada !== null) {
      // Prevenir scroll do body quando modal está aberto
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [imagemSelecionada]);

  return (
    <>
      {/* Grid de Imagens */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {imagens.map((imagem: any, index: number) => (
          <motion.div
            key={index}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
            onClick={() => abrirModal(index)}
          >
            <div className="aspect-square bg-gradient-to-br from-amber-100 to-orange-200 overflow-hidden p-2">
              <img
                src={getStrapiImageUrl(imagem)}
                alt={imagem.alternativeText || imagem.attributes?.alternativeText || `Imagem em destaque ${index + 1}`}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Overlay com efeito hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal de Visualização usando Portal */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {imagemSelecionada !== null && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex items-center justify-center p-8"
              style={{
                zIndex: 999999,
                isolation: 'isolate',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={fecharModal}
            >
              <motion.div
                className="relative w-full h-full max-w-6xl max-h-[90vh] bg-transparent"
                style={{ zIndex: 1000000 }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Container da imagem com tamanho fixo */}
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={getStrapiImageUrl(imagens[imagemSelecionada])}
                    alt={imagens[imagemSelecionada].alternativeText || `Imagem ${imagemSelecionada + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                    style={{
                      minWidth: '100%',
                      minHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Botão fechar */}
                <button
                  onClick={fecharModal}
                  className="absolute top-4 right-4 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Navegação */}
                {imagens.length > 1 && (
                  <>
                    <button
                      onClick={imagemAnterior}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={proximaImagem}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 text-white rounded-full flex items-center justify-center transition-colors z-10 backdrop-blur-sm"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Contador no modal */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10 backdrop-blur-sm">
                  {imagemSelecionada + 1} / {imagens.length}
                </div>
              </motion.div>
            </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
