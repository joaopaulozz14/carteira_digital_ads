import PrimaryButton from '@/Components/PrimaryButton';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Confirme seu e-mail" />

            <div className="mb-6">
                <h1 className="text-[20px] font-display font-semibold text-text-heading">
                    Confirme seu e-mail
                </h1>
                <p className="text-[13.5px] font-body text-text-secondary mt-2 leading-relaxed">
                    Obrigado por se cadastrar! Antes de começar, confirme seu e-mail clicando no
                    link que acabamos de enviar. Não recebeu? Podemos enviar outro.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-5 rounded-input bg-status-green-bg px-3.5 py-2.5 text-[13px] font-body font-medium text-status-green-text">
                    Um novo link de confirmação foi enviado para o e-mail cadastrado.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="flex items-center justify-between">
                    <PrimaryButton disabled={processing} className="w-auto px-5">
                        Reenviar e-mail de confirmação
                    </PrimaryButton>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="text-[13px] font-body font-semibold text-text-secondary hover:text-text-heading"
                    >
                        Sair
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
