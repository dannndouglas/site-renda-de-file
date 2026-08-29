import DynamicHomePage from '@/components/DynamicHomePage';
import { getAssociacoes, getPaginaInicial, getProdutos } from '@/lib/strapi';

export const revalidate = 300;

export default async function Home() {
  const [paginaInicial, produtos, associacoes] = await Promise.all([
    getPaginaInicial(),
    getProdutos(),
    getAssociacoes(),
  ]);

  return (
    <DynamicHomePage
      paginaInicial={paginaInicial}
      produtos={produtos}
      associacoes={associacoes}
    />
  );
}
