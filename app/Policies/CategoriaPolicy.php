<?php
// app/Policies/CategoriaPolicy.php

namespace App\Policies;

use App\Models\Categoria;
use App\Models\User;

class CategoriaPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->tipo === 'ADMIN';
    }

    public function view(User $user, Categoria $categoria): bool
    {
        return $user->tipo === 'ADMIN'
            && $user->instituicao_id === $categoria->curso->instituicao_id;
    }

    public function create(User $user): bool
    {
        return $user->tipo === 'ADMIN';
    }

    public function update(User $user, Categoria $categoria): bool
    {
        return $this->view($user, $categoria);
    }

    public function delete(User $user, Categoria $categoria): bool
    {
        return $this->view($user, $categoria);
    }
}