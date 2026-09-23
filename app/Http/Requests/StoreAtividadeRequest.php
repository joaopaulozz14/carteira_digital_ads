<?php
// app/Http/Requests/StoreAtividadeRequest.php

namespace App\Http\Requests;

use App\Models\Atividade;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreAtividadeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create', Atividade::class);
    }

    public function rules(): array
    {
        $instituicaoId = $this->user()->instituicao_id;

        return [
            'categoria_id' => [
                'required',
                Rule::exists('categorias', 'id')->where(function ($query) use ($instituicaoId) {
                    $query->whereIn('curso_id', function ($sub) use ($instituicaoId) {
                        $sub->select('id')->from('cursos')->where('instituicao_id', $instituicaoId); // Ensure the category belongs to a course in the user's institution
                    });
                }),
            ],
            'nome' => 'required|string|max:2000',
            'unidade_medida' => 'required|string|max:50',
            'pontos_por_unidade' => 'required|numeric|min:0.01',
            'regra_pontuacao' => 'required|string',
            'max_pontos_semestre' => 'nullable|integer|min:1',
        ];
    }
}