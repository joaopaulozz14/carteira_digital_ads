import React from 'react';
import { Link } from '@inertiajs/react';

export default function Index({ certificados }) {
    return (
        <>
            <div>
                <h1>Meus Certificados</h1>
                {certificados.map((certificado) => (
                    <div key={certificado.id}>
                        {certificado.titulo}
                    </div>
                ))}
            </div>
        </>
    )
}