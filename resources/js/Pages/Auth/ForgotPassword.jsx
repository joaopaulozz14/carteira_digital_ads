import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Recuperar senha" />

            <div className="mb-6">
                <h1 className="text-[20px] font-display font-semibold text-text-heading">
                    Recuperar senha
                </h1>
                <p className="text-[13.5px] font-body text-text-secondary mt-1">
                    Informe seu e-mail e enviaremos um link para você criar uma nova senha.
                </p>
            </div>

            {status && (
                <div className="mb-5 rounded-input bg-status-green-bg px-3.5 py-2.5 text-[13px] font-body font-medium text-status-green-text">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <InputLabel htmlFor="email" value="E-mail" />
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email} />

                <div className="mt-6">
                    <PrimaryButton disabled={processing}>Enviar link de recuperação</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
