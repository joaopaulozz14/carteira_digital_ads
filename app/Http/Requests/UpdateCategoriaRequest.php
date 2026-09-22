<?php
// app/Http/Requests/UpdateCategoriaRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCategoriaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('categoria'));
    }

    public function rules(): array
    {
        // curso_id de propósito fora daqui -- (lembre-se da imutabilidade: uma vez que a categoria é criada, ela não pode ser movida para outro curso, somente desativada e reativada)
        return [
            'nome' => 'required|string|max:255',
            'max_pontos_curso' => 'nullable|integer|min:1',
            'max_pontos_semestre' => 'nullable|integer|min:1',
            'ativo' => 'required|boolean',
        ];
    }
}