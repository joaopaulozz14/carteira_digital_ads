import React, { useEffect, useMemo, useRef, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';


function AtividadeSelect({ grupos, value, onChange, placeholder = 'Selecione uma atividade' }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Encontra o nome da atividade selecionada (para exibir no botão)
    const atividadeSelecionada = useMemo(() => {
        for (const [, itens] of grupos) {
            const encontrada = itens.find((item) => String(item.id) === String(value));
            if (encontrada) return encontrada;
        }
        return null;
    }, [grupos, value]);

    // Fecha o dropdown ao clicar fora dele
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === 'Escape') setIsOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    const handleSelect = (id) => {
        onChange(String(id));
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                className="ds-select w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-left text-text-heading focus:border-action-blue focus:outline-none flex items-center justify-between gap-2"
            >
                <span className={atividadeSelecionada ? 'text-text-heading' : 'text-text-secondary'}>
                    {atividadeSelecionada ? atividadeSelecionada.nome : placeholder}
                </span>
                <svg
                    className={`w-4 h-4 shrink-0 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {isOpen && (
                <div
                    role="listbox"
                    className="absolute left-0 right-0 top-full mt-2 z-20 max-h-72 overflow-y-auto rounded-input border border-[#E1E5EB] bg-white shadow-float py-2"
                >
                    <button
                        type="button"
                        role="option"
                        aria-selected={value === ''}
                        onClick={() => handleSelect('')}
                        className="w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-input transition-colors"
                    >
                        {placeholder}
                    </button>

                    {grupos.map(([nomeCategoria, itens]) => (
                        <div key={nomeCategoria}>
                            <div className="sticky top-0 bg-white px-4 pt-2 pb-1 text-xs font-semibold uppercase tracking-wide text-text-secondary">
                                {nomeCategoria}
                            </div>
                            {itens.map((atividade) => (
                                <button
                                    key={atividade.id}
                                    type="button"
                                    role="option"
                                    aria-selected={String(value) === String(atividade.id)}
                                    onClick={() => handleSelect(atividade.id)}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-bg-input ${
                                        String(value) === String(atividade.id)
                                            ? 'bg-[#EAF1FF] text-action-blue font-medium'
                                            : 'text-text-heading'
                                    }`}
                                >
                                    {atividade.nome}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function Create({ atividades }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        atividade_id: '',
        titulo: '',
        data_ingresso: '',
        data_conclusao: '',
        periodo: '',
        horas_declaradas: '',
        arquivo_path: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('certificados.store'), {
            onSuccess: () => reset(),
        });
    };

    // Agrupa as atividades por categoria, na ordem em que chegam do backend
    const atividadesPorCategoria = useMemo(() => {
        const grupos = new Map();

        for (const atividade of atividades) {
            const nomeCategoria = atividade.categoria?.nome ?? 'Outras';
            if (!grupos.has(nomeCategoria)) {
                grupos.set(nomeCategoria, []);
            }
            grupos.get(nomeCategoria).push(atividade);
        }

        return Array.from(grupos.entries());
    }, [atividades]);

    const atividadeSelecionada = atividades.find(
        (atividade) => String(atividade.id) === String(data.atividade_id)
    );

    const categoriaSelecionada = atividadeSelecionada?.categoria ?? null;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-display font-semibold text-2xl text-text-heading">
                    Novo Certificado
                </h2>
            }
        >
            <Head title="Novo Certificado" />

            <div className="bg-navy-deep/6 min-h-[calc(100vh-64px)] py-10">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h1 className="font-display font-semibold text-xl text-text-heading mb-6">
                        Monte seu certificado
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">

                            {/* Coluna principal */}
                            <div className="flex-1 space-y-4">

                                {/* Passo 1 — Atividade */}
                                <div className="bg-white rounded-card shadow-card p-6">
                                    <h3 className="text-base font-semibold text-text-heading mb-4">
                                        Passo 1 — Selecione a atividade do certificado
                                    </h3>

                                    <div>
                                        <label className="block text-base font-medium text-text-heading mb-2">
                                            Atividade
                                        </label>
                                        <AtividadeSelect
                                            grupos={atividadesPorCategoria}
                                            value={data.atividade_id}
                                            onChange={(id) => setData('atividade_id', id)}
                                        />
                                        {errors.atividade_id && (
                                            <p className="text-status-red-text text-sm mt-1.5">{errors.atividade_id}</p>
                                        )}

                                        {/* Regra de pontuação da atividade escolhida */}
                                        {atividadeSelecionada && (
                                            <div className="mt-3 rounded-input bg-bg-input px-4 py-3 text-sm text-text-secondary">
                                                <strong className="text-text-heading">Regra de pontuação:</strong>{' '}
                                                {atividadeSelecionada.regra_pontuacao}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Passo 2 — Informações do certificado */}
                                <div className="bg-white rounded-card shadow-card p-6">
                                    <h3 className="text-base font-semibold text-text-heading mb-4">
                                        Passo 2 — Informe os dados da atividade
                                    </h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-base font-medium text-text-heading mb-2">
                                                Título
                                            </label>
                                            <input
                                                type="text"
                                                value={data.titulo}
                                                onChange={(e) => setData('titulo', e.target.value)}
                                                placeholder="Título do certificado"
                                                className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading placeholder:text-text-secondary focus:border-action-blue focus:outline-none"
                                            />
                                            {errors.titulo && (
                                                <p className="text-status-red-text text-sm mt-1.5">{errors.titulo}</p>
                                            )}
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-base font-medium text-text-heading mb-2">
                                                    Data de Ingresso
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.data_ingresso}
                                                    max={new Date().toISOString().split('T')[0]}
                                                    onChange={(e) => setData('data_ingresso', e.target.value)}
                                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading focus:border-action-blue focus:outline-none"
                                                />
                                                {errors.data_ingresso && (
                                                    <p className="text-status-red-text text-sm mt-1.5">{errors.data_ingresso}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-base font-medium text-text-heading mb-2">
                                                    Data de Conclusão
                                                </label>
                                                <input
                                                    type="date"
                                                    value={data.data_conclusao}
                                                    max={new Date().toISOString().split('T')[0]}
                                                    onChange={(e) => setData('data_conclusao', e.target.value)}
                                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading focus:border-action-blue focus:outline-none"
                                                />
                                                {errors.data_conclusao && (
                                                    <p className="text-status-red-text text-sm mt-1.5">{errors.data_conclusao}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Passo 3 — Período letivo */}
                                <div className="bg-white rounded-card shadow-card p-6">
                                    <h3 className="text-base font-semibold text-text-heading mb-4">
                                        Passo 3 — Selecione o período letivo
                                    </h3>
                                    <p className="text-sm text-text-secondary mb-4">
                                        Informe o semestre ou ano letivo ao qual a atividade se refere, para que o certificado seja corretamente vinculado ao seu histórico.
                                    </p>
                                    <div>
                                        <label className="block text-base font-medium text-text-heading mb-2">
                                            Período letivo
                                        </label>
                                        <input
                                            type="text"
                                            value={data.periodo}
                                            onChange={(e) => setData('periodo', e.target.value)}
                                            placeholder="Ex: 2026.1"
                                            className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading placeholder:text-text-secondary focus:border-action-blue focus:outline-none"
                                        />
                                        {errors.periodo && (
                                            <p className="text-status-red-text text-sm mt-1.5">{errors.periodo}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Passo 4 — Pontuação e arquivo */}
                                <div className="bg-white rounded-card shadow-card p-6">
                                    <h3 className="text-base font-semibold text-text-heading mb-4">
                                        Passo 4 — Pontuação e arquivo do certificado
                                    </h3>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-base font-medium text-text-heading mb-2">
                                                Pontuação Declarada
                                            </label>
                                            <input
                                                type="number"
                                                value={data.horas_declaradas}
                                                onChange={(e) => setData('horas_declaradas', e.target.value)}
                                                placeholder="Ex: 20"
                                                className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading placeholder:text-text-secondary focus:border-action-blue focus:outline-none"
                                            />
                                            {errors.horas_declaradas && (
                                                <p className="text-status-red-text text-sm mt-1.5">{errors.horas_declaradas}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-base font-medium text-text-heading mb-2">
                                                Arquivo (PDF)
                                            </label>
                                            <input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => setData('arquivo_path', e.target.files[0])}
                                                className="block w-full text-base text-text-secondary
                                                    file:mr-4 file:min-h-touch file:px-4 file:py-3
                                                    file:rounded-btn file:border-0
                                                    file:text-base file:font-semibold
                                                    file:bg-bg-input file:text-action-blue
                                                    hover:file:bg-[#E5ECFF] cursor-pointer"
                                            />
                                            {errors.arquivo_path && (
                                                <p className="text-status-red-text text-sm mt-1.5">{errors.arquivo_path}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Resumo lateral fixo */}
                            <div className="lg:w-80 lg:shrink-0 lg:sticky lg:top-6">
                                <div className="bg-white rounded-card shadow-float p-6">
                                    <h3 className="text-base font-semibold text-text-heading mb-4">
                                        Resumo do certificado
                                    </h3>

                                    <div className="flex justify-between gap-2 py-3 border-b border-[#EEF1F5] text-sm">
                                        <span className="text-text-secondary">Categoria:</span>
                                        <span className="font-semibold text-right text-text-heading">
                                            {categoriaSelecionada ? categoriaSelecionada.nome : '[categoria selecionada]'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-2 py-3 border-b border-[#EEF1F5] text-sm">
                                        <span className="text-text-secondary">Título:</span>
                                        <span className="font-semibold text-right text-text-heading">
                                            {data.titulo || '[título do certificado]'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between gap-2 py-3 text-sm">
                                        <span className="text-text-secondary">Período letivo:</span>
                                        <span className="font-semibold text-right text-text-heading">
                                            {data.periodo || '[período selecionado]'}
                                        </span>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full mt-4 min-h-touch px-5 py-3 rounded-btn bg-action-blue text-white text-base font-semibold hover:bg-action-blue-dark disabled:opacity-50 transition-colors"
                                    >
                                        {processing ? 'Enviando...' : 'Adicionar à carteira'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
