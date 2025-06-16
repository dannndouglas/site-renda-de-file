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
  const imageUrl = backgroundImage ? getStrapiImageUrl(backgroundImage) : '';

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(234, 88, 12, 0.8), rgba(194, 65, 12, 0.8)), url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: backgroundPosition,
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll'
      }
    : {
        background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)'
      };

  return (
    <section 
      className={`py-20 relative overflow-hidden ${className}`}
      style={backgroundStyle}
    >
      {/* Overlay decorativo */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-10"></div>
      </div>
      
      {/* Padrão decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-orange-100 leading-relaxed drop-shadow-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
