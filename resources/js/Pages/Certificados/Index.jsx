import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ certificados }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Meus Certificados
                </h2>
            }
        >
            <Head title= "Meus Certificados"/>

            <div>
                <h1>Meus Certificados</h1>
                {certificados.map((certificado) => (
                    <div key={certificado.id}>
                        {certificado.titulo}
                    </div>
                ))}
            </div>
        </AuthenticatedLayout>
    )
}