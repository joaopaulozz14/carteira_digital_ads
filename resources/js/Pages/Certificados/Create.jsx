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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-display font-semibold text-2xl text-text-heading">
                    Novo Certificado
                </h2>
            }
        >
            <Head title="Novo Certificado" />

            <div className="bg-bg-banner min-h-[calc(100vh-64px)] py-10">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-card shadow-card p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Campo Categoria */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Categoria
                                </label>
                                <select
                                    value={data.categoria_id}
                                    onChange={e => setData('categoria_id', e.target.value)}
                                    className="ds-select w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading focus:border-action-blue focus:outline-none"
                                >
                                    <option value="">Selecione uma categoria</option>
                                    {categorias.map(categoria => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoria_id && (
                                    <p className="text-status-red-text text-sm mt-1.5">{errors.categoria_id}</p>
                                )}
                            </div>

                            {/* Campo Título */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    value={data.titulo}
                                    onChange={e => setData('titulo', e.target.value)}
                                    placeholder="Título do certificado"
                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading placeholder:text-text-secondary focus:border-action-blue focus:outline-none"
                                />
                                {errors.titulo && (
                                    <p className="text-status-red-text text-sm mt-1.5">{errors.titulo}</p>
                                )}
                            </div>

                            {/* Data de Ingresso */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Data de Ingresso
                                </label>
                                <input
                                    type="date"
                                    value={data.data_ingresso}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={e => setData('data_ingresso', e.target.value)}
                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading focus:border-action-blue focus:outline-none"
                                />
                                {errors.data_ingresso && (
                                    <p className="text-status-red-text text-sm mt-1.5">{errors.data_ingresso}</p>
                                )}
                            </div>

                            {/* Data de Conclusão */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Data de Conclusão
                                </label>
                                <input
                                    type="date"
                                    value={data.data_conclusao}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={e => setData('data_conclusao', e.target.value)}
                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading focus:border-action-blue focus:outline-none"
                                />
                                {errors.data_conclusao && (
                                    <p className="text-status-red-text text-sm mt-1.5">{errors.data_conclusao}</p>
                                )}
                            </div>

                            {/* Campo Período */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Período
                                </label>
                                <input
                                    type="text"
                                    value={data.periodo}
                                    onChange={e => setData('periodo', e.target.value)}
                                    placeholder="Ex: 2026.1"
                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading placeholder:text-text-secondary focus:border-action-blue focus:outline-none"
                                />
                                {errors.periodo && (
                                    <p className="text-status-red-text text-sm mt-1.5">{errors.periodo}</p>
                                )}
                            </div>

                            {/* Campo Pontuação Declarada */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Pontuação Declarada
                                </label>
                                <input
                                    type="number"
                                    value={data.horas_declaradas}
                                    onChange={e => setData('horas_declaradas', e.target.value)}
                                    placeholder="Ex: 20"
                                    className="w-full min-h-touch px-4 py-3 bg-bg-input border border-transparent rounded-input text-base text-text-heading placeholder:text-text-secondary focus:border-action-blue focus:outline-none"
                                />
                                {errors.horas_declaradas && (
                                    <p className="text-status-red-text text-sm mt-1.5">{errors.horas_declaradas}</p>
                                )}
                            </div>

                            {/* Campo Arquivo (PDF) */}
                            <div>
                                <label className="block text-base font-medium text-text-heading mb-2">
                                    Arquivo (PDF)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={e => setData('arquivo_path', e.target.files[0])}
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

                            {/* Botão de Envio */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full min-h-touch px-5 py-3 rounded-btn bg-action-blue text-white text-base font-semibold hover:bg-action-blue-dark disabled:opacity-50 transition-colors"
                                >
                                    {processing ? 'Enviando...' : 'Enviar Certificado'}
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}