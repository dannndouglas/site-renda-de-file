import axios from 'axios';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

export const strapiApi = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tipos para os dados do Strapi
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
      medium?: { url: string };
      large?: { url: string };
    };
    url: string;
  };
}

export interface Contatos {
  telefone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  site?: string;
}

export interface Associacao {
  id: number;
  documentId: string;
  attributes?: {
    nome: string;
    historia: any; // Rich text do Strapi (array de objetos)
    endereco_completo: string;
    slug: string;
    contatos?: Contatos;
    logo?: {
      data?: StrapiMedia;
    };
    galeria_fotos?: {
      data?: StrapiMedia[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  // Propriedades diretas para compatibilidade
  nome?: string;
  historia?: any;
  endereco_completo?: string;
  slug?: string;
  contatos?: Contatos;
  logo?: {
    data?: StrapiMedia;
  };
  galeria_fotos?: {
    data?: StrapiMedia[];
  };
  produtos?: Produto[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Produto {
  id: number;
  attributes: {
    nome: string;
    descricao: any; // Rich text do Strapi
    categoria: 'Vestuário' | 'Decoração' | 'Cama, Mesa e Banho' | 'Acessórios';
    slug: string;
    preco?: number;
    disponivel: boolean;
    fotos_produto?: {
      data?: StrapiMedia[];
    };
    associacao_origem?: {
      data?: Associacao;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface NoticiaEvento {
  id: number;
  documentId: string;
  attributes?: {
    titulo: string;
    conteudo: any; // Rich text do Strapi
    data_evento?: string;
    slug: string;
    tipo: 'Notícia' | 'Evento';
    imagem_destaque?: {
      data?: StrapiMedia;
    };
    galeria?: {
      data?: StrapiMedia[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  // Propriedades diretas para compatibilidade
  titulo?: string;
  conteudo?: any;
  data_evento?: string;
  slug?: string;
  tipo?: 'Notícia' | 'Evento';
  imagem_destaque?: {
    data?: StrapiMedia;
  };
  galeria?: {
    data?: StrapiMedia[];
  };
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface PaginaSobre {
  id: number;
  attributes: {
    titulo_pagina: string;
    conteudo_historia: any; // Rich text do Strapi
    conteudo_processo_criacao: any; // Rich text do Strapi
    imagem_principal?: {
      data?: StrapiMedia;
    };
    galeria_processo?: {
      data?: StrapiMedia[];
    };
    video_processo?: {
      data?: StrapiMedia;
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface PaginaInicial {
  id: number;
  attributes: {
    titulo_principal: string;
    subtitulo: string;
    imagem_secao_sobre?: {
      data?: StrapiMedia;
    };
    imagem_fundo_hero?: {
      data?: StrapiMedia;
    };
    video_hero?: {
      data?: StrapiMedia;
    };
    secao_sobre?: {
      titulo: string;
      conteudo: any;
      imagem?: {
        data?: StrapiMedia;
      };
      link_botao: string;
      texto_botao: string;
    };
    estatisticas?: {
      titulo: string;
      subtitulo: string;
      numero_associacoes: number;
      numero_artesas: number;
      anos_tradicao: number;
      pecas_criadas: number;
      cor_fundo: string;
    };
    galeria_destaque?: {
      data?: StrapiMedia[];
    };
    video_institucional?: {
      data?: StrapiMedia;
    };
    texto_chamada_acao: string;
    link_chamada_acao: string;
    mostrar_associacoes: boolean;
    mostrar_noticias: boolean;
    mostrar_estatisticas: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface ConfiguracaoSite {
  id: number;
  attributes: {
    nome_site: string;
    subtitulo_site: string;
    logo?: {
      data?: StrapiMedia;
    };
    favicon?: {
      data?: StrapiMedia;
    };
    menu_items?: {
      label: string;
      url: string;
      ordem: number;
    }[];
    informacoes_contato?: {
      telefone: string;
      email: string;
      endereco: string;
      redes_sociais?: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
        whatsapp?: string;
      };
    };
    footer?: {
      texto_copyright: string;
      descricao_site: string;
      links_uteis?: {
        label: string;
        url: string;
      }[];
    };
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

// Funções para buscar dados
export const getAssociacoes = async (): Promise<Associacao[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<any[]>>('/associacaos?populate=*');
    // A nova estrutura do Strapi v5 não usa attributes, os dados estão diretos no objeto
    return response.data.data.map((item: any) => ({
      ...item,
      // Garantir compatibilidade com código existente
      attributes: {
        nome: item.nome,
        historia: item.historia,
        endereco_completo: item.endereco_completo,
        slug: item.slug,
        contatos: item.contatos,
        logo: item.logo,
        galeria_fotos: item.galeria_fotos,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
      }
    }));
  } catch (error) {
    console.error('Erro ao buscar associações:', error);
    return [];
  }
};

export const getAssociacaoBySlug = async (slug: string): Promise<Associacao | null> => {
  try {
    const response = await strapiApi.get<StrapiResponse<any[]>>(`/associacaos?filters[slug][$eq]=${slug}&populate=*`);
    const item = response.data.data[0];
    if (!item) return null;

    // Garantir compatibilidade com código existente
    return {
      ...item,
      attributes: {
        nome: item.nome,
        historia: item.historia,
        endereco_completo: item.endereco_completo,
        slug: item.slug,
        contatos: item.contatos,
        logo: item.logo,
        galeria_fotos: item.galeria_fotos,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
      }
    };
  } catch (error) {
    console.error('Erro ao buscar associação:', error);
    return null;
  }
};

export const getProdutos = async (): Promise<Produto[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<any[]>>('/produtos?populate=*');
    // Normalizar dados para compatibilidade
    return response.data.data.map((item: any) => ({
      ...item,
      // Garantir compatibilidade com código existente
      attributes: {
        nome: item.nome || item.attributes?.nome,
        descricao: item.descricao || item.attributes?.descricao,
        categoria: item.categoria || item.attributes?.categoria,
        slug: item.slug || item.attributes?.slug,
        preco: item.preco || item.attributes?.preco,
        disponivel: item.disponivel !== undefined ? item.disponivel : (item.attributes?.disponivel !== undefined ? item.attributes.disponivel : true),
        fotos_produto: item.fotos_produto || item.attributes?.fotos_produto,
        video_demonstrativo: item.video_demonstrativo || item.attributes?.video_demonstrativo,
        associacao_origem: item.associacao_origem || item.attributes?.associacao_origem,
        createdAt: item.createdAt || item.attributes?.createdAt,
        updatedAt: item.updatedAt || item.attributes?.updatedAt,
        publishedAt: item.publishedAt || item.attributes?.publishedAt,
      }
    }));
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
};

export const getNoticiasEventos = async (): Promise<NoticiaEvento[]> => {
  try {
    const response = await strapiApi.get<StrapiResponse<any[]>>('/noticia-eventos?populate=*&sort=createdAt:desc');
    // A nova estrutura do Strapi v5 não usa attributes, os dados estão diretos no objeto
    return response.data.data.map((item: any) => ({
      ...item,
      // Garantir compatibilidade com código existente
      attributes: {
        titulo: item.titulo,
        conteudo: item.conteudo,
        data_evento: item.data_evento,
        slug: item.slug,
        tipo: item.tipo,
        imagem_destaque: item.imagem_destaque,
        galeria: item.galeria,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        publishedAt: item.publishedAt,
      }
    }));
  } catch (error) {
    console.error('Erro ao buscar notícias/eventos:', error);
    return [];
  }
};

export const getPaginaSobre = async (): Promise<PaginaSobre | null> => {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<PaginaSobre>>('/pagina-sobre?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar página sobre:', error);
    return null;
  }
};

export const getPaginaAssociacoes = async (): Promise<any | null> => {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<any>>('/pagina-associacoes?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar página associações:', error);
    return null;
  }
};

export const getPaginaProdutos = async (): Promise<any | null> => {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<any>>('/pagina-produtos?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar página produtos:', error);
    return null;
  }
};

export const getPaginaNoticias = async (): Promise<any | null> => {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<any>>('/pagina-noticias?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar página notícias:', error);
    return null;
  }
};

export const getPaginaContato = async (): Promise<any | null> => {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<any>>('/pagina-contato?populate=*');
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar página contato:', error);
    return null;
  }
};

export const getPaginaInicial = async (): Promise<PaginaInicial | null> => {
  try {
    console.log('Fazendo requisição para:', `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pagina-inicial?populate=*`);
    const response = await strapiApi.get<StrapiSingleResponse<any>>('/pagina-inicial?populate=*');
    console.log('Resposta da API:', response.data);
    const item = response.data.data;
    if (!item) return null;

    // Normalizar dados
    return {
      ...item,
      attributes: {
        titulo_principal: item.titulo_principal || item.attributes?.titulo_principal || 'Renda de Filé de Jaguaribe',
        subtitulo: item.subtitulo || item.attributes?.subtitulo || 'Preservando a tradição artesanal',
        imagem_secao_sobre: item.imagem_secao_sobre || item.attributes?.imagem_secao_sobre,
        imagem_fundo_hero: item.imagem_fundo_hero || item.attributes?.imagem_fundo_hero,
        video_hero: item.video_hero || item.attributes?.video_hero,
        secao_sobre: item.secao_sobre || item.attributes?.secao_sobre,
        estatisticas: item.estatisticas || item.attributes?.estatisticas,
        galeria_destaque: item.galeria_destaque || item.attributes?.galeria_destaque,
        video_institucional: item.video_institucional || item.attributes?.video_institucional,
        texto_chamada_acao: item.texto_chamada_acao || item.attributes?.texto_chamada_acao || 'Conheça Nossa História',
        link_chamada_acao: item.link_chamada_acao || item.attributes?.link_chamada_acao || '/sobre',
        mostrar_associacoes: item.mostrar_associacoes !== undefined ? item.mostrar_associacoes : (item.attributes?.mostrar_associacoes !== undefined ? item.attributes.mostrar_associacoes : true),
        mostrar_noticias: item.mostrar_noticias !== undefined ? item.mostrar_noticias : (item.attributes?.mostrar_noticias !== undefined ? item.attributes.mostrar_noticias : true),
        mostrar_estatisticas: item.mostrar_estatisticas !== undefined ? item.mostrar_estatisticas : (item.attributes?.mostrar_estatisticas !== undefined ? item.attributes.mostrar_estatisticas : true),
        createdAt: item.createdAt || item.attributes?.createdAt,
        updatedAt: item.updatedAt || item.attributes?.updatedAt,
        publishedAt: item.publishedAt || item.attributes?.publishedAt,
      }
    };
  } catch (error) {
    console.error('Erro ao buscar página inicial:', error);
    return null;
  }
};

export const getConfiguracaoSite = async (): Promise<ConfiguracaoSite | null> => {
  try {
    const response = await strapiApi.get<StrapiSingleResponse<any>>('/configuracao-site?populate=*');
    const item = response.data.data;
    if (!item) return null;

    // Normalizar dados
    return {
      ...item,
      attributes: {
        nome_site: item.nome_site || item.attributes?.nome_site || 'Renda de Filé de Jaguaribe',
        subtitulo_site: item.subtitulo_site || item.attributes?.subtitulo_site || '',
        logo: item.logo || item.attributes?.logo,
        favicon: item.favicon || item.attributes?.favicon,
        menu_items: item.menu_items || item.attributes?.menu_items || [
          { label: 'Início', url: '/', ordem: 1 },
          { label: 'Sobre', url: '/sobre', ordem: 2 },
          { label: 'Associações', url: '/associacoes', ordem: 3 },
          { label: 'Produtos', url: '/produtos', ordem: 4 },
          { label: 'Notícias', url: '/noticias', ordem: 5 },
          { label: 'Contato', url: '/contato', ordem: 6 }
        ],
        informacoes_contato: item.informacoes_contato || item.attributes?.informacoes_contato,
        footer: item.footer || item.attributes?.footer,
        createdAt: item.createdAt || item.attributes?.createdAt,
        updatedAt: item.updatedAt || item.attributes?.updatedAt,
        publishedAt: item.publishedAt || item.attributes?.publishedAt,
      }
    };
  } catch (error) {
    console.error('Erro ao buscar configuração do site:', error);
    return null;
  }
};

// Função removida - usando a versão mais completa abaixo

// Função para converter rich text do Strapi em HTML
export const convertRichTextToHtml = (richText: any): string => {
  if (!richText || !Array.isArray(richText)) {
    return '';
  }

  return richText.map((block: any) => {
    if (block.type === 'paragraph') {
      const content = block.children?.map((child: any) => child.text || '').join('') || '';
      return content ? `<p>${content}</p>` : '';
    }
    return '';
  }).filter(Boolean).join('');
};

// Função para converter rich text em texto simples
export const convertRichTextToPlainText = (richText: any): string => {
  if (!richText) return '';

  if (typeof richText === 'string') {
    return richText;
  }

  if (!Array.isArray(richText)) {
    return '';
  }

  return richText.map((block: any) => {
    if (block.type === 'paragraph' && block.children) {
      return block.children.map((child: any) => {
        if (child.type === 'text') {
          return child.text || '';
        }
        return '';
      }).join('');
    }
    return '';
  }).filter(text => text.trim() !== '').join(' ');
};

// Função auxiliar para converter rich text em HTML
export const convertRichTextToHTML = (richText: any): string => {
  if (!richText) return '';

  if (typeof richText === 'string') {
    return `<p>${richText}</p>`;
  }

  if (!Array.isArray(richText)) {
    return '';
  }

  return richText.map(block => {
    if (block.type === 'paragraph' && block.children) {
      const text = block.children.map((child: any) => child.text || '').join('');
      return text.trim() ? `<p>${text}</p>` : '';
    }
    return '';
  }).filter(p => p).join('');
};

// Função para buscar notícia/evento por slug
export const getNoticiaEventoBySlug = async (slug: string) => {
  try {
    const response = await strapiApi.get(`/noticia-eventos?filters[slug][$eq]=${slug}&populate=*`);
    return response.data.data?.[0] || null;
  } catch (error) {
    console.error('Error fetching noticia/evento by slug:', error);
    return null;
  }
};



// Função auxiliar para obter URL da imagem do Strapi
export const getStrapiImageUrl = (image: any): string => {
  if (!image) return '';

  // Estrutura do Strapi v5 - imagem direta
  if (image.url) {
    return `http://localhost:1337${image.url}`;
  }

  // Estrutura do Strapi v5 - array de imagens
  if (Array.isArray(image) && image.length > 0) {
    return `http://localhost:1337${image[0].url}`;
  }

  // Estrutura do Strapi v4 (compatibilidade)
  if (image.data?.attributes?.url) {
    return `http://localhost:1337${image.data.attributes.url}`;
  }

  if (image.data?.url) {
    return `http://localhost:1337${image.data.url}`;
  }

  // Se for um objeto com data array
  if (image.data && Array.isArray(image.data) && image.data.length > 0) {
    if (image.data[0].attributes?.url) {
      return `http://localhost:1337${image.data[0].attributes.url}`;
    }
    if (image.data[0].url) {
      return `http://localhost:1337${image.data[0].url}`;
    }
  }

  return '';
};


