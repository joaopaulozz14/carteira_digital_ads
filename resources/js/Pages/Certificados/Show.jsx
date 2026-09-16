import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

const statusStyles = {
    PENDENTE: 'bg-status-amber-badge text-status-amber-text',
    APROVADO: 'bg-status-green-bg text-status-green-text',
    REJEITADO: 'bg-status-red text-white',
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
                <h2 className="font-display font-semibold text-2xl text-text-heading">
                    Detalhes do Certificado
                </h2>
            }
        >
            <Head title={certificado.titulo} />

            <div className="bg-bg-banner min-h-[calc(100vh-64px)] py-10">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="bg-white rounded-card shadow-card p-6 md:p-8">

                        {/* Cabeçalho */}
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                            <div>
                                <h1 className="font-display font-semibold text-xl text-text-heading">
                                    {certificado.titulo}
                                </h1>
                                {isAdmin && (
                                    <p className="text-base text-text-secondary mt-1">
                                        Enviado por {certificado.user?.name}
                                    </p>
                                )}
                            </div>
                            <span
                                className={`inline-flex items-center rounded-pill px-4 py-2 text-sm font-semibold ${statusStyles[certificado.status] || 'bg-bg-input text-text-secondary'
                                    }`}
                            >
                                {certificado.status}
                            </span>
                        </div>
                        {/* Dados do certificado */}
                        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 border-t border-[#EEF1F5] pt-6">
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Atividade</dt>
                                <dd className="mt-1 text-base text-text-heading">{certificado.atividade?.nome}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Categoria</dt>
                                <dd className="mt-1 text-base text-text-heading">{certificado.atividade?.categoria?.nome}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Período</dt>
                                <dd className="mt-1 text-base text-text-heading">{certificado.periodo}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Data de Ingresso</dt>
                                <dd className="mt-1 text-base text-text-heading">
                                    {new Date(certificado.data_ingresso).toLocaleDateString('pt-BR')}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Data de Conclusão</dt>
                                <dd className="mt-1 text-base text-text-heading">
                                    {new Date(certificado.data_conclusao).toLocaleDateString('pt-BR')}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Data de Envio</dt>
                                <dd className="mt-1 text-base text-text-heading">
                                    {new Date(certificado.data_envio).toLocaleDateString('pt-BR')}
                                </dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Pontuação Declarada</dt>
                                <dd className="mt-1 text-base text-text-heading">{certificado.horas_declaradas}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-text-secondary">Pontuação Conferida</dt>
                                <dd className="mt-1 text-base text-text-heading">
                                    {certificado.horas_validadas ?? '— Ainda não avaliado —'}
                                </dd>
                            </div>
                        </dl>

                        {certificado.atividade?.regra_pontuacao && (
                            <div className="mt-4 rounded-input bg-bg-input px-4 py-3 text-sm text-text-secondary">
                                <strong className="text-text-heading">Regra de pontuação:</strong>{' '}
                                {certificado.atividade.regra_pontuacao}
                            </div>
                        )}

                        {/* Justificativa de rejeição */}
                        {certificado.status === 'REJEITADO' && certificado.justificativa && (
                            <div className="mt-6 p-4 bg-status-red/10 border border-status-red rounded-input">
                                <p className="text-sm font-semibold text-status-red-text">Motivo da rejeição</p>
                                <p className="text-base text-status-red-text mt-1">{certificado.justificativa}</p>
                            </div>
                        )}

                        {/* Visualização do PDF */}
                        <div className="mt-6 border-t border-[#EEF1F5] pt-6">
                            <p className="text-sm font-medium text-text-secondary mb-3">Certificado (PDF)</p>
                            <div className="rounded-input border border-[#EEF1F5] overflow-hidden mb-3" style={{ height: '500px' }}>
                                <iframe
                                    src={`/storage/${certificado.arquivo_path}`}
                                    title="Certificado PDF"
                                    className="w-full h-full"
                                />
                            </div>
                            <a
                                href={`/storage/${certificado.arquivo_path}`}
                                download
                                className="inline-flex items-center text-base font-semibold text-action-blue hover:text-action-blue-dark hover:underline"
                            >
                                Baixar PDF
                            </a>
                        </div>

                        {/* Ações */}
                        <div className="mt-6 border-t border-[#EEF1F5] pt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
                            <Link
                                href={route('certificados.index')}
                                className="text-base text-text-secondary hover:text-text-heading"
                            >
                                Voltar
                            </Link>

                            {podeEditar && (
                                <>
                                    <Link
                                        href={route('certificados.edit', certificado.id)}
                                        className="text-base text-action-blue hover:text-action-blue-dark hover:underline"
                                    >
                                        Editar
                                    </Link>
                                    <button
                                        onClick={handleExcluir}
                                        className="text-base text-status-red-text hover:underline"
                                    >
                                        Excluir
                                    </button>
                                </>
                            )}

                            {isAdmin && certificado.status === 'PENDENTE' && (
                                <>
                                    <button
                                        onClick={() => router.patch(route('certificados.aprovar', certificado.id))}
                                        className="text-base text-status-green-text hover:underline"
                                    >
                                        Aprovar
                                    </button>
                                    <button
                                        onClick={() => router.patch(route('certificados.rejeitar', certificado.id))}
                                        className="text-base text-status-red-text hover:underline"
                                    >
                                        Rejeitar
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}