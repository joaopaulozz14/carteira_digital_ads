import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ categorias }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        categoria_id: '',
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

    const categoriaSelecionada = categorias.find(
        (c) => String(c.id) === String(data.categoria_id)
    );

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

                                {/* Passo 1 — Categoria */}
                                <div className="bg-white rounded-card shadow-card p-6">
                                    <h3 className="text-base font-semibold text-text-heading mb-4">
                                        Passo 1 — Selecione a categoria do certificado
                                    </h3>
                                    <fieldset className="border-0 p-0 m-0">
                                        <legend className="sr-only">Categoria do certificado</legend>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {categorias.map((categoria) => (
                                                <div className="relative" key={categoria.id}>
                                                    <input
                                                        type="radio"
                                                        name="categoria"
                                                        id={`cat-${categoria.id}`}
                                                        value={categoria.id}
                                                        checked={String(data.categoria_id) === String(categoria.id)}
                                                        onChange={(e) => setData('categoria_id', e.target.value)}
                                                        className="peer sr-only"
                                                    />
                                                    <label
                                                        htmlFor={`cat-${categoria.id}`}
                                                        className="block min-h-touch cursor-pointer rounded-input border border-[#E1E5EB] bg-bg-input px-4 py-3 peer-checked:border-action-blue peer-checked:bg-[#EAF1FF] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-action-blue peer-focus-visible:outline-offset-2 transition-colors"
                                                    >
                                                        <strong className="block text-sm text-text-heading">
                                                            {categoria.nome}
                                                        </strong>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </fieldset>
                                    {errors.categoria_id && (
                                        <p className="text-status-red-text text-sm mt-3">{errors.categoria_id}</p>
                                    )}
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