'use client';

import { useState } from 'react';
import { getStrapiImageUrl } from '@/lib/strapi';

interface ProductImageGalleryProps {
  images: any[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Sem imagens disponíveis</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Imagem Principal - Quadro Preto */}
      <div className="w-full">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={getStrapiImageUrl(images[currentImageIndex])}
            alt={`${productName} - Imagem ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Carrossel de Miniaturas */}
      {images.length > 1 && (
        <div className="w-full">
          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {images.map((image, index) => (
              <button
                key={image.id || index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex
                    ? 'border-orange-500 ring-2 ring-orange-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={getStrapiImageUrl(image)}
                  alt={`${productName} - Miniatura ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  className="transition-opacity duration-200 hover:opacity-80"
                />
              </button>
            ))}
          </div>

          {/* Indicador de quantidade */}
          <div className="text-center text-sm text-gray-500 mt-2">
            {currentImageIndex + 1} de {images.length} imagens
          </div>
        </div>
      )}
    </div>
  );
}