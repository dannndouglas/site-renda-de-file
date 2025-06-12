import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="w-32 h-32 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-6xl">404</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Página não encontrada
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors duration-200"
          >
            Voltar ao Início
          </Link>
          <Link 
            href="/associacoes" 
            className="block border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors duration-200"
          >
            Ver Associações
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Se você acredita que isso é um erro, entre em contato conosco:</p>
          <Link 
            href="/contato" 
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Página de Contato
          </Link>
        </div>
      </div>
    </div>
  );
}
