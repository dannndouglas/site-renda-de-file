'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GuideSection {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tips?: string[];
}

const guideSections: GuideSection[] = [
  {
    id: 'menu',
    title: '🎯 Menu de Navegação Melhorado',
    description: 'O menu agora segue as melhores práticas de UX/UI design',
    steps: [
      'Indicação visual da página atual (ativa)',
      'Efeitos hover suaves com animação',
      'Sublinhado animado nos links',
      'Melhor acessibilidade com foco visível',
      'Transições suaves entre estados'
    ],
    tips: [
      'O link da página atual fica destacado em laranja',
      'Hover adiciona fundo sutil e movimento para cima',
      'Foco do teclado tem contorno visível para acessibilidade'
    ]
  },
  {
    id: 'hero-background',
    title: '🖼️ Fundo Personalizável da Seção Hero',
    description: 'Agora você pode usar uma imagem como fundo da seção principal',
    steps: [
      'Acesse Content Manager > Página Inicial no Strapi',
      'Edite o registro da página inicial',
      'No campo "Imagem Hero", faça upload da imagem',
      'Salve as alterações',
      'A imagem aparecerá automaticamente como fundo'
    ],
    tips: [
      'Use imagens em alta resolução (1920x1080px ou maior)',
      'Formatos recomendados: JPG, PNG ou WebP',
      'O sistema adiciona overlay escuro automaticamente',
      'Texto fica branco com sombra para melhor legibilidade'
    ]
  },
  {
    id: 'statistics',
    title: '📊 Estatísticas Dinâmicas',
    description: 'Personalize completamente os números e textos das estatísticas',
    steps: [
      'No Strapi, acesse Content Manager > Página Inicial',
      'Localize a seção "Estatísticas"',
      'Preencha os campos de números e labels',
      'Personalize títulos e subtítulos',
      'Salve para ver as mudanças imediatamente'
    ],
    tips: [
      'Números são animados com contagem crescente',
      'Use valores realistas e atualizados',
      'Labels devem ser curtos e descritivos',
      'Atualize periodicamente para manter relevância'
    ]
  }
];

export default function AdminGuide() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🎨 Guia de Melhorias Implementadas
        </h1>
        <p className="text-lg text-gray-600">
          Conheça as novas funcionalidades e como utilizá-las
        </p>
      </div>

      <div className="space-y-4">
        {guideSections.map((section) => (
          <motion.div
            key={section.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setActiveSection(
                activeSection === section.id ? null : section.id
              )}
              className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {section.title}
                </h3>
                <p className="text-gray-600 mt-1">
                  {section.description}
                </p>
              </div>
              <motion.svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: activeSection === section.id ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {activeSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 bg-white">
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-gray-800 mb-3">
                        📝 Como usar:
                      </h4>
                      <ol className="space-y-2">
                        {section.steps.map((step, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-amber-500 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {section.tips && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-3">
                          💡 Dicas importantes:
                        </h4>
                        <ul className="space-y-2">
                          {section.tips.map((tip, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-500 mr-2 mt-1">•</span>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
        <h3 className="text-lg font-semibold text-amber-800 mb-3">
          🚀 Benefícios das Melhorias
        </h3>
        <ul className="space-y-2 text-amber-700">
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Melhor experiência do usuário (UX)
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Design mais moderno e profissional
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Maior flexibilidade para personalização
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Melhor acessibilidade
          </li>
          <li className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            Conteúdo totalmente dinâmico via CMS
          </li>
        </ul>
      </div>
    </div>
  );
}
