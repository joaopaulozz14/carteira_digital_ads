import React, { useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CORES = ['#0057FF', '#8EC37D', '#FCE7B1', '#BF8DD6', '#C0E9F3', '#CF928B'];

const statusStyles = {
    PENDENTE: { icon: 'bg-status-amber-badge text-status-amber-text' },
    APROVADO: { icon: 'bg-status-green-bg text-status-green-text' },
    REJEITADO: { icon: 'bg-status-red text-white' },
};

export default function Aluno() {

    const certificados = useMemo(() => {
        // Simulação de dados de certificados
        return [
            { id: 1, categoria: { nome: 'Curso A' }, horas_validadas: 10, status: 'APROVADO' },
            { id: 2, categoria: { nome: 'Curso B' }, horas_validadas: 5, status: 'PENDENTE' },
            { id: 3, categoria: { nome: 'Curso A' }, horas_validadas: 8, status: 'APROVADO' },
            { id: 4, categoria: { nome: 'Curso C' }, horas_validadas: 12, status: 'REJEITADO' },
            { id: 5, categoria: null, horas_validadas: 7, status: 'APROVADO' },
        ];
    }, []);
    const dadosGrafico = useMemo(() => {
        const agrupado = {};

        certificados
            .filter((c) => c.status === 'APROVADO')
            .forEach((c) => {
                const nome = c.categoria?.nome || 'Sem categoria';
                const horas = Number(c.horas_validadas || c.horas_declaradas || 0);
                agrupado[nome] = (agrupado[nome] || 0) + horas;
            });

        return Object.entries(agrupado).map(([nome, horas]) => ({
            name: nome,
            value: horas,
        }));
    }, [certificados]);

    const totalHorasValidadas = dadosGrafico.reduce((acc, item) => acc + item.value, 0);

    const totalPendente = certificados.filter((c) => c.status === 'PENDENTE').length;
    const totalAprovado = certificados.filter((c) => c.status === 'APROVADO').length;
    const totalRejeitado = certificados.filter((c) => c.status === 'REJEITADO').length;

    const resumo = [
        { label: 'Pendentes', valor: totalPendente, key: 'PENDENTE' },
        { label: 'Aprovados', valor: totalAprovado, key: 'APROVADO' },
        { label: 'Rejeitados', valor: totalRejeitado, key: 'REJEITADO' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* ===================== HERO ===================== */}
            <section className="bg-navy-deep text-white py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                    <div className="lg:max-w-[560px]">
                        <h1 className="font-display font-semibold text-white text-[28px] md:text-4xl leading-tight">
                            Minha Carteira Digital
                        </h1>
                        <p className="mt-4 text-[#C9D3E0] text-base leading-relaxed max-w-[58ch]">
                            Acompanhe suas horas validadas por categoria e o status dos seus certificados.
                        </p>
                        <div className="mt-6">
                            <Link
                                href={route('certificados.index')}
                                className="inline-flex items-center justify-center min-h-touch px-5 py-3 rounded-btn bg-action-blue text-white text-sm font-semibold hover:bg-action-blue-dark transition-colors"
                            >
                                Ver todos os certificados
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:w-[480px] lg:shrink-0 gap-4">
                        {resumo.map((item) => {
                            const style = statusStyles[item.key];
                            return (
                                <div key={item.key} className="bg-navy-secondary rounded-card shadow-card p-5">
                                    <span
                                        className={`inline-flex items-center justify-center w-9 h-9 rounded-icon font-display font-semibold text-sm mb-3 ${style.icon}`}
                                    >
                                        {item.valor}
                                    </span>
                                    <p className="text-sm text-white font-semibold">{item.label}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===================== GRÁFICO ===================== */}
            <section className="bg-navy-deep/6 py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6">

                        {/* Gráfico de rosca */}
                        <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                            <h2 className="font-display font-semibold text-xl text-text-heading mb-1">
                                Horas validadas por categoria
                            </h2>
                            <p className="text-sm text-text-secondary mb-6">
                                Considera apenas certificados com status aprovado
                            </p>

                            {dadosGrafico.length === 0 ? (
                                <div className="flex flex-col items-center justify-center gap-3 py-16">
                                    <span className="w-14 h-14 rounded-icon bg-bg-input flex items-center justify-center">
                                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                            <path d="M4 6a2 2 0 012-2h9l5 5v9a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" stroke="#7D818D" strokeWidth="1.6" strokeLinejoin="round" />
                                            <path d="M9 13h6M9 17h4" stroke="#7D818D" strokeWidth="1.6" strokeLinecap="round" />
                                        </svg>
                                    </span>
                                    <p className="text-base text-text-secondary">
                                        Nenhum certificado aprovado ainda.
                                    </p>
                                </div>
                            ) : (
                                <div className="h-[320px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={dadosGrafico}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={70}
                                                outerRadius={110}
                                                paddingAngle={3}
                                            >
                                                {dadosGrafico.map((_, index) => (
                                                    <Cell key={index} fill={CORES[index % CORES.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value) => [`${value}h`, 'Horas validadas']}
                                                contentStyle={{
                                                    borderRadius: '8px',
                                                    border: '1px solid #EEF1F5',
                                                    fontSize: '13px',
                                                }}
                                            />
                                            <Legend
                                                verticalAlign="bottom"
                                                height={36}
                                                iconType="circle"
                                                wrapperStyle={{ fontSize: '13px', color: '#7D818D' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>

                        {/* Resumo lateral */}
                        <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                            <h2 className="font-display font-semibold text-xl text-text-heading mb-6">
                                Resumo geral
                            </h2>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-12 rounded-icon bg-action-blue flex items-center justify-center shrink-0">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                        <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.8" />
                                        <path d="M12 7v5l3.5 2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-2xl font-display font-semibold text-text-heading">
                                        {totalHorasValidadas}h
                                    </p>
                                    <p className="text-sm text-text-secondary">Total de horas validadas</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {dadosGrafico.map((item, index) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between text-sm py-2 border-b border-[#EEF1F5] last:border-0"
                                    >
                                        <span className="flex items-center gap-2 text-text-heading font-medium">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full shrink-0"
                                                style={{ backgroundColor: CORES[index % CORES.length] }}
                                            />
                                            {item.name}
                                        </span>
                                        <span className="font-semibold text-text-heading">{item.value}h</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}