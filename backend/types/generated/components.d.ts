import type { Schema, Struct } from '@strapi/strapi';

export interface ContatoInformacoesContato extends Struct.ComponentSchema {
  collectionName: 'components_contato_informacoes_contatos';
  info: {
    description: 'Informa\u00E7\u00F5es de contato da organiza\u00E7\u00E3o';
    displayName: 'Informa\u00E7\u00F5es de Contato';
  };
  attributes: {
    email: Schema.Attribute.Email;
    endereco: Schema.Attribute.Text;
    redes_sociais: Schema.Attribute.Component<'contato.redes-sociais', false>;
    telefone: Schema.Attribute.String;
  };
}

export interface ContatoRedesSociais extends Struct.ComponentSchema {
  collectionName: 'components_contato_redes_sociais';
  info: {
    description: 'Links para redes sociais';
    displayName: 'Redes Sociais';
  };
  attributes: {
    facebook: Schema.Attribute.String;
    instagram: Schema.Attribute.String;
    linkedin: Schema.Attribute.String;
    twitter: Schema.Attribute.String;
    whatsapp: Schema.Attribute.String;
    youtube: Schema.Attribute.String;
  };
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    description: 'Configura\u00E7\u00F5es do rodap\u00E9 do site';
    displayName: 'Footer';
  };
  attributes: {
    descricao_site: Schema.Attribute.Text;
    links_uteis: Schema.Attribute.Component<'navegacao.link-util', true>;
    texto_copyright: Schema.Attribute.String;
  };
}

export interface NavegacaoItemMenu extends Struct.ComponentSchema {
  collectionName: 'components_navegacao_item_menus';
  info: {
    description: 'Item individual do menu de navega\u00E7\u00E3o';
    displayName: 'Item de Menu';
  };
  attributes: {
    abrir_nova_aba: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    ordem: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface NavegacaoLinkUtil extends Struct.ComponentSchema {
  collectionName: 'components_navegacao_link_utils';
  info: {
    description: 'Link \u00FAtil para o footer';
    displayName: 'Link \u00DAtil';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SecoesEstatisticas extends Struct.ComponentSchema {
  collectionName: 'components_secoes_estatisticas';
  info: {
    description: 'N\u00FAmeros e estat\u00EDsticas para a p\u00E1gina inicial';
    displayName: 'Estat\u00EDsticas';
  };
  attributes: {
    anos_tradicao: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<50>;
    cor_fundo: Schema.Attribute.Enumeration<
      ['amber', 'orange', 'blue', 'green']
    > &
      Schema.Attribute.DefaultTo<'amber'>;
    numero_artesas: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<150>;
    numero_associacoes: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<5>;
    pecas_criadas: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<1000>;
    subtitulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'N\u00FAmeros que representam nossa dedica\u00E7\u00E3o \u00E0 arte da Renda de Fil\u00E9'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Preservando Tradi\u00E7\u00F5es, Criando Futuro'>;
  };
}

export interface SecoesSecaoSobre extends Struct.ComponentSchema {
  collectionName: 'components_secoes_secao_sobres';
  info: {
    description: 'Conte\u00FAdo da se\u00E7\u00E3o sobre na p\u00E1gina inicial';
    displayName: 'Se\u00E7\u00E3o Sobre';
  };
  attributes: {
    conteudo: Schema.Attribute.Blocks & Schema.Attribute.Required;
    imagem: Schema.Attribute.Media<'images'>;
    link_botao: Schema.Attribute.String & Schema.Attribute.DefaultTo<'/sobre'>;
    texto_botao: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Saiba mais sobre nossa hist\u00F3ria'>;
    titulo: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Uma Arte Milenar'>;
  };
}

export interface SharedDepoimento extends Struct.ComponentSchema {
  collectionName: 'components_shared_depoimentos';
  info: {
    description: 'Depoimento de artes\u00E3s ou pessoas relacionadas \u00E0 Renda de Fil\u00E9';
    displayName: 'Depoimento';
  };
  attributes: {
    associacao: Schema.Attribute.String;
    cargo_funcao: Schema.Attribute.String;
    depoimento: Schema.Attribute.Text & Schema.Attribute.Required;
    foto: Schema.Attribute.Media<'images'>;
    nome: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedEstatisticas extends Struct.ComponentSchema {
  collectionName: 'components_shared_estatisticas';
  info: {
    description: 'Estat\u00EDsticas sobre a Renda de Fil\u00E9 de Jaguaribe';
    displayName: 'Estat\u00EDsticas';
  };
  attributes: {
    anos_tradicao: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    familias_beneficiadas: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    municipios_atendidos: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    pecas_produzidas: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    total_artesas: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    total_associacoes: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'contato.informacoes-contato': ContatoInformacoesContato;
      'contato.redes-sociais': ContatoRedesSociais;
      'layout.footer': LayoutFooter;
      'navegacao.item-menu': NavegacaoItemMenu;
      'navegacao.link-util': NavegacaoLinkUtil;
      'secoes.estatisticas': SecoesEstatisticas;
      'secoes.secao-sobre': SecoesSecaoSobre;
      'shared.depoimento': SharedDepoimento;
      'shared.estatisticas': SharedEstatisticas;
    }
  }
}
