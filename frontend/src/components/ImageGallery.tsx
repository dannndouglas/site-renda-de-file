'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getStrapiImageUrl } from '@/lib/strapi';

interface ImageGalleryProps {
  images: any[];
  title?: string;
  className?: string;
  imageClassName?: string;
  containerClassName?: string;
}

export default function ImageGallery({ 
  images, 
  title = "Galeria de Imagens",
  className = "",
  imageClassName = "w-full h-64 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-200",
  containerClassName = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
}: ImageGalleryProps) {
  const [imagemSelecionada, setImagemSelecionada] = useState<number | null>(null);

  if (!images || images.length === 0) {
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
      setImagemSelecionada((imagemSelecionada + 1) % images.length);
    }
  };

  const imagemAnterior = () => {
    if (imagemSelecionada !== null) {
      setImagemSelecionada(imagemSelecionada === 0 ? images.length - 1 : imagemSelecionada - 1);
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
      <div className={className}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          {title}
        </h2>
        <div className={containerClassName}>
          {images.map((imagem: any, index: number) => (
            <motion.div
              key={index}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              onClick={() => abrirModal(index)}
            >
              {/* Ícone de lupa no hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center z-10">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                    <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <img
                src={getStrapiImageUrl(imagem)}
                alt={imagem.alternativeText || imagem.attributes?.alternativeText || `Imagem ${index + 1}`}
                className={imageClassName}
              />
            </motion.div>
          ))}
        </div>
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
                    src={getStrapiImageUrl(images[imagemSelecionada])}
                    alt={images[imagemSelecionada].alternativeText || `Imagem ${imagemSelecionada + 1}`}
                    className="w-full h-full object-contain rounded-lg"
                    style={{
                      minWidth: '100%',
                      minHeight: '100%',
                      objectFit: 'contain'
                    }}
                  />
                </div>

                {/* Botão Fechar */}
                <button
                  onClick={fecharModal}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200 z-10 backdrop-blur-sm"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Navegação entre imagens */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={imagemAnterior}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200 z-10 backdrop-blur-sm shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={proximaImagem}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-200 z-10 backdrop-blur-sm shadow-lg"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}

                {/* Contador no modal */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm z-10 backdrop-blur-sm">
                  {imagemSelecionada + 1} / {images.length}
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
