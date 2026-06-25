import React from 'react';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Create() {

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
                    <form
                        method="POST"
                        encType="multipart/form-data"
                    >
                        <select name="categoria_id">
                            <option value="">Selecione uma categoria</option>
                            <option value="1">Categoria 1</option>
                            <option value="2">Categoria 2</option>
                        </select>

                        <input
                            type="text"
                            name="titulo"
                            placeholder="Título"
                        />

                        <input
                            type="number"
                            name="horas_declaradas"
                            placeholder="Horas Declaradas"
                        />

                        <input
                            type="file"
                            name="arquivo_path"
                            accept=".pdf"
                        />

                        <button type="submit">
                            Enviar Certificado
                        </button>

                    </form>
                </div>
            </div>
        </AuthenticatedLayout>

    );

}