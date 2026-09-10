import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

const statusBadge = {
    PENDENTE: 'bg-yellow-100 text-yellow-800',
    APROVADO: 'bg-green-100 text-green-800',
    REJEITADO: 'bg-red-100 text-red-800',
};

export default function Show({ certificado }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.tipo === 'ADMIN';
    const isDono = certificado.user_id === auth.user.id;
    const podeEditar = isDono && certificado.status === 'PENDENTE';

    const handleExcluir = () => {
        if (confirm(`Tem certeza que deseja excluir o certificado "${certificado.titulo}"?`)) {
            router.delete(route('certificados.destroy', certificado.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Detalhes do Certificado
                </h2>
            }
        >
            <Head title={certificado.titulo} />

            <div className="max-w-4xl mx-auto p-6 space-y-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">{certificado.titulo}</h1>
                            {isAdmin && (
                                <p className="text-sm text-gray-500 mt-1">
                                    Enviado por {certificado.user?.name}
                                </p>
                            )}
                        </div>
                        <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusBadge[certificado.status]}`}>
                            {certificado.status}
                        </span>
                    </div>

                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Categoria</dt>
                            <dd className="mt-1 text-sm text-gray-900">{certificado.categoria?.nome}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Período</dt>
                            <dd className="mt-1 text-sm text-gray-900">{certificado.periodo}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Data de Ingresso</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {new Date(certificado.data_ingresso).toLocaleDateString('pt-BR')}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Data de Conclusão</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {new Date(certificado.data_conclusao).toLocaleDateString('pt-BR')}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Data de Envio</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {new Date(certificado.data_envio).toLocaleDateString('pt-BR')}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Pontuação Declarada</dt>
                            <dd className="mt-1 text-sm text-gray-900">{certificado.horas_declaradas}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500">Pontuação Conferida</dt>
                            <dd className="mt-1 text-sm text-gray-900">
                                {certificado.horas_validadas ?? '— Ainda não avaliado —'}
                            </dd>
                        </div>
                    </dl>

                    {certificado.status === 'REJEITADO' && certificado.justificativa && (
                        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm font-medium text-red-800">Motivo da rejeição</p>
                            <p className="text-sm text-red-700 mt-1">{certificado.justificativa}</p>
                        </div>
                    )}

                    <div className="mt-6 border-t pt-6">
                        <p className="text-sm font-medium text-gray-500 mb-3">Certificado (PDF)</p>
                        <div className="border rounded-md overflow-hidden mb-3" style={{ height: '500px' }}>
                            <iframe
                                src={`/storage/${certificado.arquivo_path}`}
                                title="Certificado PDF"
                                className="w-full h-full"
                            />
                        </div>
                        <a
                            href={`/storage/${certificado.arquivo_path}`}
                            download
                            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-900"
                        >
                            Baixar PDF
                        </a>
                    </div>

                    <div className="mt-6 border-t pt-6 flex flex-wrap gap-3">
                        <Link
                            href={route('certificados.index')}
                            className="text-sm text-gray-600 hover:text-gray-900"
                        >
                            Voltar
                        </Link>

                        {podeEditar && (
                            <>
                                <Link
                                    href={route('certificados.edit', certificado.id)}
                                    className="text-sm text-blue-600 hover:text-blue-900"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={handleExcluir}
                                    className="text-sm text-red-600 hover:text-red-900"
                                >
                                    Excluir
                                </button>
                            </>
                        )}

                        {isAdmin && certificado.status === 'PENDENTE' && (
                            <>
                                <button
                                    onClick={() => router.patch(route('certificados.aprovar', certificado.id))}
                                    className="text-sm text-green-600 hover:text-green-900"
                                >
                                    Aprovar
                                </button>
                                <button
                                    onClick={() => router.patch(route('certificados.rejeitar', certificado.id))}
                                    className="text-sm text-red-600 hover:text-red-900"
                                >
                                    Rejeitar
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}