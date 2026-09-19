import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Confirmar senha" />

            <div className="mb-6">
                <h1 className="text-[20px] font-display font-semibold text-text-heading">
                    Confirme sua senha
                </h1>
                <p className="text-[13.5px] font-body text-text-secondary mt-1">
                    Esta é uma área protegida. Confirme sua senha antes de continuar.
                </p>
            </div>

            <form onSubmit={submit}>
                <InputLabel htmlFor="password" value="Senha" />
                <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    isFocused={true}
                    autoComplete="current-password"
                    onChange={(e) => setData('password', e.target.value)}
                />
                <InputError message={errors.password} />

                <div className="mt-6">
                    <PrimaryButton disabled={processing}>Confirmar</PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
