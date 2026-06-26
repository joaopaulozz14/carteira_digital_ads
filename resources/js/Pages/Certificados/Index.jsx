import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react'; // usePage para pegar o auth

export default function Index({ certificados }) {
    // Captura os dados compartilhados pelo Inertia (como o usuário logado)
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Meus Certificados
                </h2>
            }
        >
            <Head title="Meus Certificados" />

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">Lista de Certificados</h1>
                
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="border-b">
                            {/* Só mostra a coluna "Aluno" se for ADMIN */}
                            {auth.user.tipo === 'ADMIN' && (
                                <th className="text-left p-2">Aluno</th>
                            )}
                            <th className="text-left p-2">Título</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {certificados.map((certificado) => (
                            <tr key={certificado.id} className="border-b">
                                {/* Só mostra o nome do aluno se for ADMIN */}
                                {auth.user.tipo === 'ADMIN' && (
                                    <td className="p-2">{certificado.user?.name || 'N/A'}</td>
                                )}
                                <td className="p-2">{certificado.titulo}</td>
                                <td className="p-2">{certificado.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}