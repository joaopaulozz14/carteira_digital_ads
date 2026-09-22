<?php

namespace App\Policies;

use App\Models\Atividade;
use App\Models\User;

class AtividadePolicy
{
    public function viewAny(User $user): bool
    {
        return $user->tipo === 'ADMIN';
    }

    public function view(User $user, Atividade $atividade): bool
    {
        return $user->tipo === 'ADMIN'
            && $user->instituicao_id === $atividade->categoria->curso->instituicao_id;
    }

    public function create(User $user): bool
    {
        return $user->tipo === 'ADMIN';
    }

    public function update(User $user, Atividade $atividade): bool
    {
        return $this->view($user, $atividade);
    }

    public function delete(User $user, Atividade $atividade): bool
    {
        return $this->view($user, $atividade);
    }
}