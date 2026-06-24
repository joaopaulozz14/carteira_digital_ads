import React from 'react';
import { Link } from '@inertiajs/react';

export default function Create() {

    return (
        <>
            <div>
                <h1>Novo Certificado</h1>
            </div>
            <Link href="/certificados/create">
                Novo Certificado
            </Link>
        </>
    );

}