export default function TermosPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Termos de Uso
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
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e usar o Portal da Renda de Filé de Jaguaribe, você concorda em cumprir 
              e estar vinculado aos seguintes termos e condições de uso.
            </p>

            <h2>2. Descrição do Serviço</h2>
            <p>
              O Portal da Renda de Filé de Jaguaribe é uma plataforma digital dedicada a 
              preservar e promover a cultura da Renda de Filé, conectando artesãs, associações 
              e interessados nesta arte tradicional.
            </p>

            <h2>3. Uso Aceitável</h2>
            <p>Você concorda em usar este site apenas para fins legais e de maneira que não:</p>
            <ul>
              <li>Viole qualquer lei ou regulamento aplicável</li>
              <li>Infrinja os direitos de terceiros</li>
              <li>Transmita conteúdo ofensivo, difamatório ou inadequado</li>
              <li>Interfira no funcionamento normal do site</li>
            </ul>

            <h2>4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo deste site, incluindo textos, imagens, logos e design, 
              é protegido por direitos autorais e outras leis de propriedade intelectual. 
              O uso não autorizado é estritamente proibido.
            </p>

            <h2>5. Conteúdo do Usuário</h2>
            <p>
              Ao enviar conteúdo através de formulários ou outros meios, você garante que:
            </p>
            <ul>
              <li>Possui todos os direitos necessários sobre o conteúdo</li>
              <li>O conteúdo não viola direitos de terceiros</li>
              <li>O conteúdo é preciso e não enganoso</li>
            </ul>

            <h2>6. Privacidade</h2>
            <p>
              Sua privacidade é importante para nós. Consulte nossa Política de Privacidade 
              para entender como coletamos, usamos e protegemos suas informações.
            </p>

            <h2>7. Limitação de Responsabilidade</h2>
            <p>
              O Portal da Renda de Filé de Jaguaribe é fornecido "como está" sem garantias 
              de qualquer tipo. Não nos responsabilizamos por danos diretos, indiretos, 
              incidentais ou consequenciais resultantes do uso deste site.
            </p>

            <h2>8. Links para Sites Terceiros</h2>
            <p>
              Este site pode conter links para sites de terceiros. Não somos responsáveis 
              pelo conteúdo ou práticas de privacidade desses sites externos.
            </p>

            <h2>9. Modificações dos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação no site.
            </p>

            <h2>10. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar seu acesso ao site a qualquer momento, 
              sem aviso prévio, por violação destes termos.
            </p>

            <h2>11. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa será 
              resolvida nos tribunais competentes do Brasil.
            </p>

            <h2>12. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <ul>
              <li>E-mail: contato@rendadefilejaguaribe.com.br</li>
              <li>Telefone: (88) 99999-9999</li>
              <li>Endereço: Jaguaribe - CE, Brasil</li>
            </ul>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Importante
              </h3>
              <p className="text-amber-700 mb-0">
                Ao continuar a usar nosso site, você confirma que leu, entendeu e 
                concorda com estes Termos de Uso.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
