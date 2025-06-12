export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Política de Privacidade
            </h1>
            <p className="text-xl text-gray-600">
              Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2>1. Introdução</h2>
            <p>
              O Portal da Renda de Filé de Jaguaribe respeita sua privacidade e está 
              comprometido em proteger suas informações pessoais. Esta política explica 
              como coletamos, usamos e protegemos seus dados.
            </p>

            <h2>2. Informações que Coletamos</h2>
            <h3>2.1 Informações Fornecidas Voluntariamente</h3>
            <ul>
              <li>Nome e informações de contato (e-mail, telefone)</li>
              <li>Mensagens enviadas através de formulários</li>
              <li>Informações de associações cadastradas</li>
            </ul>

            <h3>2.2 Informações Coletadas Automaticamente</h3>
            <ul>
              <li>Endereço IP e localização aproximada</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de permanência</li>
              <li>Cookies e tecnologias similares</li>
            </ul>

            <h2>3. Como Usamos suas Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul>
              <li>Responder às suas mensagens e solicitações</li>
              <li>Melhorar nosso site e serviços</li>
              <li>Enviar informações sobre eventos e novidades (com seu consentimento)</li>
              <li>Manter a segurança e integridade do site</li>
              <li>Cumprir obrigações legais</li>
            </ul>

            <h2>4. Compartilhamento de Informações</h2>
            <p>
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com 
              terceiros, exceto:
            </p>
            <ul>
              <li>Com seu consentimento explícito</li>
              <li>Para cumprir obrigações legais</li>
              <li>Para proteger nossos direitos e segurança</li>
              <li>Com prestadores de serviços que nos auxiliam (sob acordos de confidencialidade)</li>
            </ul>

            <h2>5. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência no site. Você pode 
              configurar seu navegador para recusar cookies, mas isso pode afetar 
              algumas funcionalidades do site.
            </p>

            <h2>6. Segurança dos Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais para 
              proteger suas informações contra acesso não autorizado, alteração, 
              divulgação ou destruição.
            </p>

            <h2>7. Retenção de Dados</h2>
            <p>
              Mantemos suas informações apenas pelo tempo necessário para cumprir 
              os propósitos descritos nesta política ou conforme exigido por lei.
            </p>

            <h2>8. Seus Direitos</h2>
            <p>Você tem o direito de:</p>
            <ul>
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos ou incompletos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
              <li>Portabilidade de dados</li>
            </ul>

            <h2>9. Links para Sites Terceiros</h2>
            <p>
              Nosso site pode conter links para sites de terceiros. Esta política 
              de privacidade não se aplica a esses sites externos.
            </p>

            <h2>10. Menores de Idade</h2>
            <p>
              Nosso site não é direcionado a menores de 18 anos. Não coletamos 
              intencionalmente informações de menores sem o consentimento dos pais.
            </p>

            <h2>11. Alterações nesta Política</h2>
            <p>
              Podemos atualizar esta política periodicamente. Notificaremos sobre 
              mudanças significativas através do site ou por e-mail.
            </p>

            <h2>12. Contato</h2>
            <p>
              Para exercer seus direitos ou esclarecer dúvidas sobre esta política, 
              entre em contato:
            </p>
            <ul>
              <li>E-mail: privacidade@rendadefilejaguaribe.com.br</li>
              <li>Telefone: (88) 99999-9999</li>
              <li>Endereço: Jaguaribe - CE, Brasil</li>
            </ul>

            <h2>13. Base Legal (LGPD)</h2>
            <p>
              O tratamento de seus dados pessoais é baseado nas seguintes hipóteses 
              legais da Lei Geral de Proteção de Dados (LGPD):
            </p>
            <ul>
              <li>Consentimento do titular</li>
              <li>Execução de contrato ou procedimentos preliminares</li>
              <li>Legítimo interesse</li>
              <li>Cumprimento de obrigação legal</li>
            </ul>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                Encarregado de Dados
              </h3>
              <p className="text-blue-700 mb-2">
                Para questões específicas sobre proteção de dados, contate nosso 
                Encarregado de Dados:
              </p>
              <p className="text-blue-700 mb-0">
                E-mail: dpo@rendadefilejaguaribe.com.br
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Consentimento
              </h3>
              <p className="text-amber-700 mb-0">
                Ao usar nosso site, você consente com a coleta e uso de suas 
                informações conforme descrito nesta Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
