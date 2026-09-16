import React, { useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ certificado, atividades }) {
    const { data, setData, post, processing, errors } = useForm({
        atividade_id: certificado.atividade_id,
        titulo: certificado.titulo,
        data_ingresso: certificado.data_ingresso,
        data_conclusao: certificado.data_conclusao,
        periodo: certificado.periodo,
        horas_declaradas: certificado.horas_declaradas,
        arquivo_path: null,
        _method: 'put',
    });

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

    const submit = (e) => {
        e.preventDefault();
        post(route('certificados.update', certificado.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Certificado
                </h2>
            }
        >
            <Head title="Editar Certificado" />

            <div className="max-w-3xl mx-auto p-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <InputLabel htmlFor="atividade_id" value="Atividade" />
                            <select
                                id="atividade_id"
                                name="atividade_id"
                                value={data.atividade_id}
                                onChange={(e) => setData('atividade_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {atividadesPorCategoria.map(([nomeCategoria, itens]) => (
                                    <optgroup key={nomeCategoria} label={nomeCategoria}>
                                        {itens.map((atividade) => (
                                            <option key={atividade.id} value={atividade.id}>
                                                {atividade.nome}
                                                {!atividade.ativo ? ' (inativa)' : ''}
                                            </option>
                                        ))}
                                    </optgroup>
                                ))}
                            </select>
                            <InputError message={errors.atividade_id} className="mt-2" />

                            {atividadeSelecionada && (
                                <div className="mt-2 rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-600">
                                    <strong className="text-gray-800">Regra de pontuação:</strong>{' '}
                                    {atividadeSelecionada.regra_pontuacao}
                                </div>
                            )}
                        </div>

                        <div>
                            <InputLabel htmlFor="titulo" value="Título" />
                            <TextInput
                                id="titulo"
                                name="titulo"
                                value={data.titulo}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('titulo', e.target.value)}
                            />
                            <InputError message={errors.titulo} className="mt-2" />
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
                                min={data.data_ingresso || undefined}
                                max={new Date().toISOString().split('T')[0]}
                                onChange={e => setData('data_conclusao', e.target.value)}
                                className="mt-1 block w-full rounded border-gray-300 shadow-sm"
                            />
                            {errors.data_conclusao && <p className="text-red-500 text-sm mt-1">{errors.data_conclusao}</p>}
                        </div>

                        <div>
                            <InputLabel htmlFor="periodo" value="Período" />
                            <p className="text-sm text-gray-500 mb-1">
                                Use o período em que a atividade foi <strong>concluída</strong>, não o de início.
                            </p>
                            <TextInput
                                id="periodo"
                                name="periodo"
                                placeholder="ex: 2026.1"
                                value={data.periodo}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('periodo', e.target.value)}
                            />
                            <InputError message={errors.periodo} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="horas_declaradas" value="Pontuação Declarada" />
                            <TextInput
                                id="horas_declaradas"
                                type="number"
                                name="horas_declaradas"
                                min="1"
                                value={data.horas_declaradas}
                                className="mt-1 block w-full"
                                onChange={(e) => setData('horas_declaradas', e.target.value)}
                            />
                            <InputError message={errors.horas_declaradas} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="arquivo_path" value="Certificado (PDF)" />
                            <p className="text-sm text-gray-500 mb-1">
                                Envie um novo arquivo apenas se quiser substituir o atual.{' '}
                                <a
                                    href={`/storage/${certificado.arquivo_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:underline"
                                >
                                    Ver arquivo atual
                                </a>
                            </p>
                            <input
                                id="arquivo_path"
                                type="file"
                                name="arquivo_path"
                                accept="application/pdf"
                                className="mt-1 block w-full text-sm text-gray-700"
                                onChange={(e) => setData('arquivo_path', e.target.files[0])}
                            />
                            <InputError message={errors.arquivo_path} className="mt-2" />
                        </div>

                        <div className="flex items-center gap-4">
                            <PrimaryButton disabled={processing}>
                                Salvar Alterações
                            </PrimaryButton>
                            <Link
                                href={route('certificados.show', certificado.id)}
                                className="text-sm text-gray-600 hover:text-gray-900"
                            >
                                Cancelar
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}