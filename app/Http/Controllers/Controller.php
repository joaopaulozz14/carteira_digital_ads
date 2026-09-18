<?php

namespace App\Http\Controllers;

use Illuminate\Database\QueryException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

abstract class Controller
{
    use AuthorizesRequests;

    /**
     * Executa uma exclusão, convertendo violação de FK (restrictOnDelete)
     * em `false` em vez de deixar a QueryException estourar como 500.
     */
    protected function tentarExcluir(\Closure $delete): bool
    {
        try {
            $delete();
            return true;
        } catch (QueryException $e) {
            if ((int) $e->getCode() === 23000) {
                return false;
            }
            throw $e;
        }
    }
}