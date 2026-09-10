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
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Novo Certificado
                </h2>
            }
        >
            <Head title="Novo Certificado" />

            <div className="py-6">
                <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Campo Categoria */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Categoria</label>
                            <select
                                value={data.categoria_id}
                                onChange={e => setData('categoria_id', e.target.value)}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            >
                                <option value="">Selecione uma categoria</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            {errors.categoria_id && <p className="text-red-500 text-sm mt-1">{errors.categoria_id}</p>}
                        </div>

                        {/* Campo Título */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Título</label>
                            <input
                                type="text"
                                value={data.titulo}
                                onChange={e => setData('titulo', e.target.value)}
                                placeholder="Título do certificado"
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                            {errors.titulo && <p className="text-red-500 text-sm mt-1">{errors.titulo}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data de Ingresso</label>
                            <input
                                type="date"
                                value={data.data_ingresso}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={e => setData('data_ingresso', e.target.value)}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                            {errors.data_ingresso && <p className="text-red-500 text-sm mt-1">{errors.data_ingresso}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data de Conclusão</label>
                            <input
                                type="date"
                                value={data.data_conclusao}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={e => setData('data_conclusao', e.target.value)}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                            {errors.data_conclusao && <p className="text-red-500 text-sm mt-1">{errors.data_conclusao}</p>}
                        </div>

                        {/* Campo Período */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Período</label>
                            <input
                                type="text"
                                value={data.periodo}
                                onChange={e => setData('periodo', e.target.value)}
                                placeholder="Ex: 2026.1"
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                            {errors.periodo && <p className="text-red-500 text-sm mt-1">{errors.periodo}</p>}
                        </div>

                        {/* Campo Pontuação Declarada */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Pontuação Declarada</label>
                            <input
                                type="number"
                                value={data.horas_declaradas}
                                onChange={e => setData('horas_declaradas', e.target.value)}
                                placeholder="Ex: 20"
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                            {errors.horas_declaradas && <p className="text-red-500 text-sm mt-1">{errors.horas_declaradas}</p>}
                        </div>

                        {/* Campo Arquivo (PDF) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Arquivo (PDF)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={e => setData('arquivo_path', e.target.files[0])}
                                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                            {errors.arquivo_path && <p className="text-red-500 text-sm mt-1">{errors.arquivo_path}</p>}
                        </div>

                        {/* Botão de Envio */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 font-medium transition"
                            >
                                {processing ? 'Enviando...' : 'Enviar Certificado'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}