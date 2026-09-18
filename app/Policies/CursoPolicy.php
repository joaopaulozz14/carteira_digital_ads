<?php

namespace App\Policies;

use App\Models\Curso;
use App\Models\User;

class CursoPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->tipo === 'ADMIN';
    }

    public function view(User $user, Curso $curso): bool
    {
        return $user->tipo === 'ADMIN' && $user->instituicao_id === $curso->instituicao_id;
    }

    public function create(User $user): bool
    {
        return $user->tipo === 'ADMIN';
    }

    public function update(User $user, Curso $curso): bool
    {
        return $this->view($user, $curso);
    }

    public function delete(User $user, Curso $curso): bool
    {
        return $this->view($user, $curso);
    }
}