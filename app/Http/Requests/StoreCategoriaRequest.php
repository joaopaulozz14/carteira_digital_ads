<?php
// app/Http/Requests/StoreCategoriaRequest.php

namespace App\Http\Requests;

use App\Models\Categoria;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCategoriaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Categoria::class);
    }

    public function rules(): array
    {
        $instituicaoId = $this->user()->instituicao_id;

        return [
            'curso_id' => [
                'required',
                Rule::exists('cursos', 'id')->where(fn ($query) => $query->where('instituicao_id', $instituicaoId)),
            ],
            'nome' => 'required|string|max:255',
            'max_pontos_curso' => 'nullable|integer|min:1',
            'max_pontos_semestre' => 'nullable|integer|min:1',
        ];
    }
}