import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function Aluno(){
    return(
        <AuthenticatedLayout>
            <div>
                <h1>ADMIN DASHBOARD</h1>
            </div>
        </AuthenticatedLayout>
    );
}