import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router } from '@inertiajs/react';

export default function Index({ certificados }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.tipo === 'ADMIN';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isAdmin ? 'Gerenciar Certificados' : 'Meus Certificados'}
                </h2>
            }
        >
            <Head title="Certificados" />

            <div className="max-w-7xl mx-auto p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        {isAdmin ? 'Todos os Certificados' : 'Lista de Certificados'}
                    </h1>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {isAdmin && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aluno
                                        </th>
                                    )}
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Título
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    {isAdmin && (
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ações
                                        </th>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {certificados.map((certificado) => (
                                    <tr key={certificado.id} className="hover:bg-gray-50">
                                        {isAdmin && (
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {certificado.user?.name || 'Não informado'}
                                            </td>
                                        )}
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {certificado.titulo}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${certificado.status === 'PENDENTE' ? 'bg-yellow-100 text-yellow-800' : ''}
                                                ${certificado.status === 'APROVADO' ? 'bg-green-100 text-green-800' : ''}
                                                ${certificado.status === 'REJEITADO' ? 'bg-red-100 text-red-800' : ''}
                                            `}>
                                                {certificado.status}
                                            </span>
                                        </td>
                                        {isAdmin && (
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                                                {certificado.status === 'PENDENTE' ? (
                                                    <>
                                                        <button
                                                            onClick={() => router.patch(route('certificados.aprovar', certificado.id))}
                                                            className="text-green-600 hover:text-green-900"
                                                        >
                                                            Aprovar
                                                        </button>
                                                        <button
                                                            onClick={() => router.patch(route('certificados.rejeitar', certificado.id))}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Rejeitar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <span className="text-gray-400 font-normal">Sem ações</span>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
