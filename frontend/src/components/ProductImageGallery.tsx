'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStrapiImageUrl } from '@/lib/strapi';

interface ProductImageGalleryProps {
  images: any[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [imagemSelecionada, setImagemSelecionada] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Sem imagens disponíveis</p>
      </div>
    );
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

  // Navegação por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (imagemSelecionada !== null) {
        if (e.key === 'ArrowRight') proximaImagem();
        if (e.key === 'ArrowLeft') imagemAnterior();
        if (e.key === 'Escape') fecharModal();
      }
    };

    if (imagemSelecionada !== null) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [imagemSelecionada]);

  return (
    <>
      <div className="space-y-4">
        {/* Imagem Principal */}
        <div className="w-full">
          <motion.div
            className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={() => abrirModal(currentImageIndex)}
          >
            <img
              src={getStrapiImageUrl(images[currentImageIndex])}
              alt={`${productName} - Imagem ${currentImageIndex + 1}`}
              className="w-full h-full object-contain transition-transform duration-300"
            />

            {/* Ícone de lupa no hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Contador de imagens */}
          {images.length > 1 && (
            <div className="text-center mt-2 text-sm text-gray-600">
              {currentImageIndex + 1} de {images.length} imagens
            </div>
          )}
        </div>

        {/* Carrossel de Miniaturas */}
        {images.length > 1 && (
          <div className="w-full">
            <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
              {images.map((image, index) => (
                <motion.button
                  key={image.id || index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === currentImageIndex
                      ? 'border-orange-500 ring-2 ring-orange-200'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={getStrapiImageUrl(image)}
                    alt={`${productName} - Miniatura ${index + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-200 hover:opacity-80"
                  />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal de Visualização */}
      <AnimatePresence>
        {imagemSelecionada !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fecharModal}
          >
            <motion.div
              className="relative w-full h-full max-w-6xl max-h-[90vh] bg-transparent"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Container da imagem com tamanho fixo */}
              <div className="w-full h-full flex items-center justify-center">
                <img
                  src={getStrapiImageUrl(images[imagemSelecionada])}
                  alt={`${productName} - Imagem ${imagemSelecionada + 1}`}
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
              {images.length > 1 && (
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
                {imagemSelecionada + 1} / {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}