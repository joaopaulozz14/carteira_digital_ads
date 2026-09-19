import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Entrar" />

            <div className="mb-6">
                <h1 className="text-[20px] font-display font-semibold text-text-heading">
                    Entrar na sua conta
                </h1>
                <p className="text-[13.5px] font-body text-text-secondary mt-1">
                    Acesse a Carteira Digital para acompanhar suas horas e certificados.
                </p>
            </div>

            {status && (
                <div className="mb-5 rounded-input bg-status-green-bg px-3.5 py-2.5 text-[13px] font-body font-medium text-status-green-text">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="E-mail" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Senha" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <label className="flex items-center gap-2">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="text-[13px] font-body text-text-secondary">Lembrar de mim</span>
                    </label>

                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-[13px] font-body font-semibold text-action-blue hover:text-action-blue-dark"
                        >
                            Esqueceu a senha?
                        </Link>
                    )}
                </div>

                <div className="mt-6">
                    <PrimaryButton disabled={processing}>Entrar</PrimaryButton>
                </div>

                <p className="mt-6 text-center text-[13px] font-body text-text-secondary">
                    Ainda não tem conta?{' '}
                    <Link
                        href={route('register')}
                        className="font-semibold text-action-blue hover:text-action-blue-dark"
                    >
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </GuestLayout>
    );
}
