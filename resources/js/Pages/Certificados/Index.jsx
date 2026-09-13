import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, Link } from '@inertiajs/react';

const statusStyles = {
    PENDENTE: 'bg-status-amber-badge text-status-amber-text',
    APROVADO: 'bg-status-green-bg text-status-green-text',
    REJEITADO: 'bg-status-red text-white',
};

export default function Index({ certificados }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.tipo === 'ADMIN';

    const handleExcluir = (certificado) => {
        if (confirm(`Tem certeza que deseja excluir o certificado "${certificado.titulo}"?`)) {
            router.delete(route('certificados.destroy', certificado.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-display font-semibold text-2xl text-text-heading">
                    {isAdmin ? 'Gerenciar Certificados' : 'Meus Certificados'}
                </h2>
            }
        >
            <Head title="Certificados" />

            <div className="bg-bg-banner min-h-[calc(100vh-64px)] py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                        <h1 className="font-display font-semibold text-xl text-text-heading mb-6">
                            {isAdmin ? 'Todos os Certificados' : 'Lista de Certificados'}
                        </h1>

                        <div className="overflow-x-auto rounded-card border border-[#EEF1F5]">
                            <table className="w-full min-w-[640px] border-collapse">
                                <thead>
                                    <tr>
                                        {isAdmin && (
                                            <th scope="col" className="text-left text-sm font-semibold text-text-table-head bg-bg-input px-6 py-3.5">
                                                Aluno
                                            </th>
                                        )}
                                        <th scope="col" className="text-left text-sm font-semibold text-text-table-head bg-bg-input px-6 py-3.5">
                                            Título
                                        </th>
                                        <th scope="col" className="text-left text-sm font-semibold text-text-table-head bg-bg-input px-6 py-3.5">
                                            Status
                                        </th>
                                        <th scope="col" className="text-left text-sm font-semibold text-text-table-head bg-bg-input px-6 py-3.5">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificados.map((certificado) => {
                                        const isDono = certificado.user_id === auth.user.id;
                                        const podeEditar = isDono && certificado.status === 'PENDENTE';

                                        return (
                                            <tr
                                                key={certificado.id}
                                                className="border-t border-[#EEF1F5] hover:bg-bg-input/60 transition-colors"
                                            >
                                                {isAdmin && (
                                                    <td className="px-6 py-4 whitespace-nowrap text-base text-text-heading">
                                                        {certificado.user?.name || 'Não informado'}
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 whitespace-nowrap text-base font-semibold text-text-heading">
                                                    {certificado.titulo}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base">
                                                    <span
                                                        className={`inline-flex items-center rounded-pill px-4 py-2 text-sm font-semibold ${
                                                            statusStyles[certificado.status] || 'bg-bg-input text-text-secondary'
                                                        }`}
                                                    >
                                                        {certificado.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                                                        <Link
                                                            href={route('certificados.show', certificado.id)}
                                                            className="text-action-blue hover:text-action-blue-dark hover:underline"
                                                        >
                                                            Ver
                                                        </Link>

                                                        {isAdmin && certificado.status === 'PENDENTE' && (
                                                            <>
                                                                <button
                                                                    onClick={() => router.patch(route('certificados.aprovar', certificado.id))}
                                                                    className="text-status-green-text hover:underline"
                                                                >
                                                                    Aprovar
                                                                </button>
                                                                <button
                                                                    onClick={() => router.patch(route('certificados.rejeitar', certificado.id))}
                                                                    className="text-status-red-text hover:underline"
                                                                >
                                                                    Rejeitar
                                                                </button>
                                                            </>
                                                        )}

                                                        {podeEditar && (
                                                            <>
                                                                <Link
                                                                    href={route('certificados.edit', certificado.id)}
                                                                    className="text-action-blue hover:text-action-blue-dark hover:underline"
                                                                >
                                                                    Editar
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleExcluir(certificado)}
                                                                    className="text-status-red-text hover:underline"
                                                                >
                                                                    Excluir
                                                                </button>
                                                            </>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                    {certificados.length === 0 && (
                                        <tr className="border-t border-[#EEF1F5]">
                                            <td
                                                colSpan={isAdmin ? 4 : 3}
                                                className="px-6 py-8 text-center text-base text-text-secondary"
                                            >
                                                Nenhum certificado encontrado.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}