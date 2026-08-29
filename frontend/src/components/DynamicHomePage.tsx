'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

import {
  type Associacao,
  type PaginaInicial,
  type Produto,
  convertRichTextToPlainText,
  getStrapiImageUrl,
} from '@/lib/strapi';
import { useSectionScroll } from './sectionScroll';

type DynamicHomePageProps = {
  paginaInicial?: PaginaInicial | null;
  produtos?: Produto[];
  associacoes?: Associacao[];
};

type Piece = {
  name: string;
  category: string;
  image: string;
  href: string;
};

const fallbackPieces: Piece[] = [
  {
    name: 'Tramas para a casa',
    category: 'Mesa e decoração',
    image: '/images/renda-file/processo.jpg',
    href: '/produtos',
  },
  {
    name: 'Detalhes que atravessam o tempo',
    category: 'Renda de Filé',
    image: '/images/renda-file/detalhe-colorido.jpg',
    href: '/produtos',
  },
  {
    name: 'Peças de memória',
    category: 'Feito à mão',
    image: '/images/renda-file/processo-faixa.jpg',
    href: '/produtos',
  },
];

function homeAttributes(paginaInicial?: PaginaInicial | null) {
  return paginaInicial?.attributes ?? (paginaInicial as PaginaInicial['attributes'] | null | undefined);
}

function productPieces(produtos: Produto[]): Piece[] {
  const pieces = produtos
    .filter((produto) => produto.attributes?.disponivel !== false)
    .slice(0, 3)
    .map((produto, index) => {
      const data = produto.attributes;
      return {
        name: data.nome,
        category: data.categoria || 'Renda de Filé',
        image: getStrapiImageUrl(data.fotos_produto) || fallbackPieces[index].image,
        href: `/produtos/${data.slug}`,
      };
    });

  return pieces.length === 3 ? pieces : fallbackPieces;
}

export default function DynamicHomePage({
  paginaInicial = null,
  produtos = [],
  associacoes = [],
}: DynamicHomePageProps) {
  const reduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  useSectionScroll(pageRef, reduceMotion);
  const home = homeAttributes(paginaInicial);
  const pieces = productPieces(produtos);
  const history = convertRichTextToPlainText(home?.secao_sobre?.conteudo);
  const heroImage = getStrapiImageUrl(home?.imagem_fundo_hero) || '/images/renda-file/detalhe-colorido.jpg';
  const historyImage = getStrapiImageUrl(home?.secao_sobre?.imagem || home?.imagem_secao_sobre) || '/images/renda-file/processo.jpg';
  const associationNames = associacoes
    .slice(0, 3)
    .map((association) => association.attributes?.nome || association.nome)
    .filter(Boolean) as string[];

  const heroTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div ref={pageRef} className="delicate-home delicate-snap-page">
      <section className="delicate-hero delicate-snap-section" data-home-section="hero" aria-labelledby="delicate-hero-title">
        <div className="delicate-shell delicate-hero__layout">
          <motion.div
            className="delicate-hero__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition}
          >
            <p className="delicate-eyebrow">Renda de Filé de Jaguaribe</p>
            <h1 id="delicate-hero-title">{home?.titulo_principal || 'Tradição tecida à mão'}</h1>
            <p className="delicate-lead">
              {home?.subtitulo || 'Uma arte que nasce do tempo, das mãos e da memória das artesãs de Jaguaribe.'}
            </p>
            <Link href={home?.link_chamada_acao || '/sobre'} className="delicate-button">
              {home?.texto_chamada_acao || 'Conheça a história'}
              <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
            </Link>
          </motion.div>

          <motion.figure
            className="delicate-hero__image"
            initial={reduceMotion ? false : { opacity: 0, clipPath: 'inset(0 0 18% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ ...heroTransition, delay: reduceMotion ? 0 : 0.12 }}
          >
            <Image
              src={heroImage}
              alt="Detalhe colorido da Renda de Filé de Jaguaribe no tear"
              fill
              priority
              sizes="(max-width: 820px) 100vw, 54vw"
              className="delicate-image"
            />
          </motion.figure>
        </div>
      </section>

      <section className="delicate-history delicate-snap-section" data-home-section="history" aria-labelledby="delicate-history-title">
        <div className="delicate-shell delicate-history__layout">
          <motion.figure
            className="delicate-history__image"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={heroTransition}
          >
            <Image
              src={historyImage}
              alt="Renda de Filé estendida sobre o tear artesanal"
              fill
              sizes="(max-width: 820px) 88vw, 42vw"
              className="delicate-image"
            />
          </motion.figure>

          <div className="delicate-history__copy">
            <p className="delicate-eyebrow">Nossa história</p>
            <h2 id="delicate-history-title">Uma herança que permanece viva</h2>
            <p>
              {history || 'A Renda de Filé guarda o saber de gerações. Em cada trama, a técnica encontra a sensibilidade e transforma o cotidiano em memória.'}
            </p>
            <Link href="/sobre" className="delicate-text-link">
              Ler nossa história <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </section>

      <section className="delicate-pieces delicate-snap-section" data-home-section="pieces" aria-labelledby="delicate-pieces-title">
        <div className="delicate-shell">
          <div className="delicate-section-heading">
            <div>
              <p className="delicate-eyebrow">Peças em destaque</p>
              <h2 id="delicate-pieces-title">Peças feitas para permanecer</h2>
            </div>
            <Link href="/produtos" className="delicate-text-link">
              Ver coleção <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="delicate-pieces__grid">
            {pieces.map((piece, index) => (
              <motion.article
                key={piece.name}
                className="delicate-piece"
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ ...heroTransition, delay: reduceMotion ? 0 : index * 0.07 }}
              >
                <Link href={piece.href}>
                  <div className="delicate-piece__image">
                    <Image
                      src={piece.image}
                      alt={piece.name}
                      fill
                      sizes="(max-width: 680px) 100vw, 33vw"
                      className="delicate-image"
                    />
                  </div>
                  <p>{piece.category}</p>
                  <h3>{piece.name}</h3>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="delicate-process delicate-snap-section" data-home-section="process" aria-labelledby="delicate-process-title">
        <div className="delicate-shell delicate-process__layout">
          <div className="delicate-process__image" aria-hidden="true">
            <Image
              src="/images/renda-file/processo-faixa.jpg"
              alt=""
              fill
              sizes="(max-width: 820px) 100vw, 50vw"
              className="delicate-image"
            />
          </div>
          <div className="delicate-process__copy">
            <div>
              <p className="delicate-eyebrow">O fazer artesanal</p>
              <h2 id="delicate-process-title">O tempo de cada ponto</h2>
              <p>Cada peça percorre um caminho paciente: preparar a trama, desenhar com a linha e deixar que as mãos encontrem o ritmo.</p>
              <ol className="delicate-process__steps">
                <li><span>01</span>Preparar</li>
                <li><span>02</span>Tecer</li>
                <li><span>03</span>Finalizar</li>
              </ol>
              <Link href="/sobre" className="delicate-text-link">
                Conhecer o processo <ArrowRight aria-hidden="true" size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="delicate-makers delicate-snap-section" data-home-section="makers" aria-labelledby="delicate-makers-title">
        <div className="delicate-shell delicate-makers__content">
          <p className="delicate-eyebrow">Quem faz</p>
          <h2 id="delicate-makers-title">Conheça quem mantém essa história viva</h2>
          <p>Associações e artesãs preservam o saber do filé e abrem novos caminhos para essa tradição.</p>
          {associationNames.length > 0 && (
            <p className="delicate-makers__names">{associationNames.join(' · ')}</p>
          )}
          <Link href="/associacoes" className="delicate-button delicate-button--outline">
            Conhecer as associações <ArrowRight aria-hidden="true" size={17} strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </div>
  );
}
