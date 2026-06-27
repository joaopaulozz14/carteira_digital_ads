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
                        <tr>

                            {auth.user.tipo === 'ADMIN' && (
                                <th>Aluno</th>
                            )}

                            <th>Título</th>

                            <th>Status</th>

                            {auth.user.tipo === 'ADMIN' && (
                                <th>Ações</th>
                            )}

                        </tr>
                    </thead>
                    <tbody>

                        {certificados.map(certificado => (

                            <tr key={certificado.id}>

                                {auth.user.tipo === 'ADMIN' && (
                                    <td>{certificado.user?.name}</td>
                                )}

                                <td>{certificado.titulo}</td>

                                <td>{certificado.status}</td>

                                {auth.user.tipo === 'ADMIN' && (
                                    <td>

                                        <button>
                                            Aprovar
                                        </button>

                                        <button>
                                            Rejeitar
                                        </button>

                                    </td>
                                )}

                            </tr>

                        ))}

                    </tbody>
                </table>
            </div>
        </AuthenticatedLayout>
    );
}