<?php

namespace App\Policies;

use App\Models\Certificado;
use App\Models\User;

class CertificadoPolicy
{

    // Determine whether the user can view the certificado. 
    public function view(User $user, Certificado $certificado): bool
    {
        if ($user->tipo === 'ADMIN') {
            return $user->instituicao_id === $certificado->user->instituicao_id;
        }

        return $user->id === $certificado->user_id;
    }

    // Determine whether the user can create certificados.
    public function update(User $user, Certificado $certificado): bool
    {
        if ($user->tipo === 'ADMIN') {
            return $user->instituicao_id === $certificado->user->instituicao_id;
        }

        return $user->id === $certificado->user_id && $certificado->status === 'PENDENTE';
    }

    // Determine whether the user can delete the certificado.
    public function delete(User $user, Certificado $certificado): bool
    {
        if ($user->tipo === 'ADMIN') {
            return $user->instituicao_id === $certificado->user->instituicao_id;
        }

        return $user->id === $certificado->user_id && $certificado->status === 'PENDENTE';
    }

    // Determine whether the user can approve or reject the certificado.
    public function aprovar(User $user, Certificado $certificado): bool
    {
        return $user->tipo === 'ADMIN'
            && $user->instituicao_id === $certificado->user->instituicao_id;
    }

    // Determine whether the user can reject the certificado.
    public function rejeitar(User $user, Certificado $certificado): bool
    {
        return $this->aprovar($user, $certificado);
    }
}