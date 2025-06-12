import AdminGuide from '@/components/AdminGuide';

export default function AdminGuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <AdminGuide />
    </div>
  );
}

export const metadata = {
  title: 'Guia do Administrador - Renda de Filé',
  description: 'Instruções para personalizar e gerenciar o site da Renda de Filé de Jaguaribe',
};
