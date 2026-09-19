<?php
// app/Http/Requests/StoreCursoRequest.php

namespace App\Http\Requests;

use App\Models\Curso;
use Illuminate\Foundation\Http\FormRequest;

class StoreCursoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Curso::class);
    }

    public function rules(): array
    {
        return [
            'nome' => 'required|string|max:255',
            'campus' => 'nullable|string|max:255',
            'carga_horaria_total_exigida' => 'required|integer|min:1',
            'minimo_tipos_atividade_diferentes' => 'nullable|integer|min:1',
        ];
    }
}