import type { Metadata } from 'next';
import { Cormorant_Garamond, Karla } from 'next/font/google';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Renda de Filé de Jaguaribe',
  description: 'Conheça a tradição, as artesãs e as peças da Renda de Filé de Jaguaribe, no Ceará.',
  keywords: 'renda de filé, Jaguaribe, artesanato cearense, artesãs, cultura, Ceará',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${karla.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
