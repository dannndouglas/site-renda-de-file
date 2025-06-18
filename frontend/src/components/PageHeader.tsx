'use client';

import { getStrapiImageUrl } from '@/lib/strapi';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backgroundImage?: any;
  backgroundPosition?: string;
  className?: string;
}

export default function PageHeader({
  title,
  subtitle,
  backgroundImage,
  backgroundPosition = 'center center',
  className = ''
}: PageHeaderProps) {
  // Obter URL da imagem se existir
  const imageUrl = backgroundImage ? getStrapiImageUrl(backgroundImage) : null;

  return (
    <div className={`relative min-h-[400px] flex items-center justify-center overflow-hidden ${className}`}>
      {/* Imagem de fundo ou gradiente */}
      {imageUrl ? (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${imageUrl}")`,
            backgroundPosition: backgroundPosition
          }}
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)'
          }}
        />
      )}

      {/* Overlay para melhorar legibilidade */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: imageUrl
            ? 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(234, 88, 12, 0.6))'
            : 'rgba(0, 0, 0, 0.1)'
        }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed drop-shadow-lg">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
