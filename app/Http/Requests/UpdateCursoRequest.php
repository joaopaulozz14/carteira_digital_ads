<?php
// app/Http/Requests/UpdateCursoRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCursoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('curso'));
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