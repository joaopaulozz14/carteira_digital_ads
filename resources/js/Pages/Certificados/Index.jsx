import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, router, Link } from '@inertiajs/react';

const statusStyles = {
    PENDENTE: 'bg-status-amber-badge text-status-amber-text',
    APROVADO: 'bg-status-green-bg text-status-green-text',
    REJEITADO: 'bg-status-red text-white',
};

const statusIcons = {
    PENDENTE: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    APROVADO: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    REJEITADO: (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
    ),
};

const summaryCardStyles = {
    TOTAL: { bg: 'bg-navy-deep/6', text: 'text-navy-deep', icon: 'bg-navy-deep text-white' },
    PENDENTE: { bg: 'bg-status-amber-badge/40', text: 'text-status-amber-text', icon: 'bg-status-amber-badge text-status-amber-text' },
    APROVADO: { bg: 'bg-status-green-bg/50', text: 'text-status-green-text', icon: 'bg-status-green-bg text-status-green-text' },
    REJEITADO: { bg: 'bg-status-red/15', text: 'text-status-red-text', icon: 'bg-status-red text-white' },
};

export default function Index({ certificados }) {
    const { auth } = usePage().props;
    const isAdmin = auth.user.tipo === 'ADMIN';

    const handleExcluir = (certificado) => {
        if (confirm(`Tem certeza que deseja excluir o certificado "${certificado.titulo}"?`)) {
            router.delete(route('certificados.destroy', certificado.id));
        }
    };

    const total = certificados.length;
    const totalPendente = certificados.filter(c => c.status === 'PENDENTE').length;
    const totalAprovado = certificados.filter(c => c.status === 'APROVADO').length;
    const totalRejeitado = certificados.filter(c => c.status === 'REJEITADO').length;

    const resumo = [
        { label: 'Total', valor: total, key: 'TOTAL' },
        { label: 'Pendentes', valor: totalPendente, key: 'PENDENTE' },
        { label: 'Aprovados', valor: totalAprovado, key: 'APROVADO' },
        { label: 'Rejeitados', valor: totalRejeitado, key: 'REJEITADO' },
    ];

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

                    {/* Cards de resumo */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {resumo.map((item) => {
                            const style = summaryCardStyles[item.key];
                            return (
                                <div
                                    key={item.key}
                                    className={`rounded-card p-5 flex items-center gap-4 ${style.bg}`}
                                >
                                    <span
                                        className={`w-10 h-10 rounded-icon flex items-center justify-center shrink-0 font-display font-semibold text-sm ${style.icon}`}
                                        aria-hidden="true"
                                    >
                                        {item.valor}
                                    </span>
                                    <div>
                                        <p className={`text-sm font-semibold ${style.text}`}>{item.label}</p>
                                        <p className="text-xs text-text-secondary">
                                            {item.key === 'TOTAL' ? 'certificados' : 'certificado(s)'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tabela */}
                    <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                        <h1 className="font-display font-semibold text-xl text-text-heading mb-6">
                            {isAdmin ? 'Todos os Certificados' : 'Lista de Certificados'}
                        </h1>

                        <div className="overflow-x-auto rounded-card border border-[#EEF1F5]">
                            <table className="w-full min-w-[760px] table-fixed border-collapse">
                                <colgroup>
                                    {isAdmin && <col className="w-[14%]" />}
                                    <col className={isAdmin ? 'w-[18%]' : 'w-[22%]'} />
                                    <col className={isAdmin ? 'w-[26%]' : 'w-[32%]'} />
                                    <col className="w-[14%]" />
                                    <col />
                                </colgroup>
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
                                            Atividade
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
                                                className="border-t border-[#EEF1F5] odd:bg-white even:bg-bg-input/40 hover:bg-[#EAF1FF] transition-colors"
                                            >
                                                {isAdmin && (
                                                    <td className="px-6 py-4 text-base text-text-heading truncate" title={certificado.user?.name}>
                                                        {certificado.user?.name || 'Não informado'}
                                                    </td>
                                                )}
                                                <td className="px-6 py-4 text-base font-semibold text-text-heading truncate" title={certificado.titulo}>
                                                    {certificado.titulo}
                                                </td>
                                                <td
                                                    className="px-6 py-4 text-base text-text-secondary truncate"
                                                    title={certificado.atividade?.nome || ''}
                                                >
                                                    {certificado.atividade?.nome || '—'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-semibold ${
                                                            statusStyles[certificado.status] || 'bg-bg-input text-text-secondary'
                                                        }`}
                                                    >
                                                        {statusIcons[certificado.status]}
                                                        {certificado.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                                                        <Link
                                                            href={route('certificados.show', certificado.id)}
                                                            className="inline-flex items-center gap-1 text-action-blue hover:text-action-blue-dark hover:underline"
                                                            title="Ver certificado"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                                                                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                                                            </svg>
                                                            Ver
                                                        </Link>

                                                        {isAdmin && certificado.status === 'PENDENTE' && (
                                                            <>
                                                                <button
                                                                    onClick={() => router.patch(route('certificados.aprovar', certificado.id))}
                                                                    className="inline-flex items-center gap-1 text-status-green-text hover:underline"
                                                                    title="Aprovar certificado"
                                                                >
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Aprovar
                                                                </button>
                                                                <button
                                                                    onClick={() => router.patch(route('certificados.rejeitar', certificado.id))}
                                                                    className="inline-flex items-center gap-1 text-status-red-text hover:underline"
                                                                    title="Rejeitar certificado"
                                                                >
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                                        <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                                                                    </svg>
                                                                    Rejeitar
                                                                </button>
                                                            </>
                                                        )}

                                                        {podeEditar && (
                                                            <>
                                                                <Link
                                                                    href={route('certificados.edit', certificado.id)}
                                                                    className="inline-flex items-center gap-1 text-action-blue hover:text-action-blue-dark hover:underline"
                                                                    title="Editar certificado"
                                                                >
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                                        <path d="M12 20h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                                                        <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                                                                    </svg>
                                                                    Editar
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleExcluir(certificado)}
                                                                    className="inline-flex items-center gap-1 text-status-red-text hover:underline"
                                                                    title="Excluir certificado"
                                                                >
                                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                                        <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                                                    </svg>
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
                                                colSpan={isAdmin ? 5 : 4}
                                                className="px-6 py-8 text-center text-base text-text-secondary"
                                            >
                                                <div className="flex flex-col items-center gap-3">
                                                    <span className="w-14 h-14 rounded-icon bg-bg-input flex items-center justify-center">
                                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                            <path d="M4 6a2 2 0 012-2h9l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="#7D818D" strokeWidth="1.6" strokeLinejoin="round" />
                                                            <path d="M9 13h6M9 17h4" stroke="#7D818D" strokeWidth="1.6" strokeLinecap="round" />
                                                        </svg>
                                                    </span>
                                                    <p className="text-base text-text-secondary">Nenhum certificado encontrado.</p>
                                                </div>
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
