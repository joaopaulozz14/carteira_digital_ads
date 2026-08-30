import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Edit({ certificado, categorias }) {
    const { data, setData, post, processing, errors } = useForm({
        categoria_id: certificado.categoria_id,
        titulo: certificado.titulo,
        horas_declaradas: certificado.horas_declaradas,
        arquivo_path: null,
        _method: 'put',
    });

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
                            <InputLabel htmlFor="categoria_id" value="Categoria" />
                            <select
                                id="categoria_id"
                                name="categoria_id"
                                value={data.categoria_id}
                                onChange={(e) => setData('categoria_id', e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {categorias.map((categoria) => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.categoria_id} className="mt-2" />
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
                            <InputLabel htmlFor="horas_declaradas" value="Horas Declaradas" />
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