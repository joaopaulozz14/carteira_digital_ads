<?php
// app/Http/Requests/UpdateAtividadeRequest.php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAtividadeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('atividade'));
    }

    public function rules(): array
    {
        // categoria_id de propósito fora daqui -- mesma lógica de Categoria/Curso. Isto é para evitar que um ADMIN de uma instituição consiga alterar a categoria de uma atividade para uma categoria de outra instituição.
        return [
            'nome' => 'required|string|max:2000',
            'unidade_medida' => 'required|string|max:50',
            'pontos_por_unidade' => 'required|numeric|min:0.01',
            'regra_pontuacao' => 'required|string',
            'max_pontos_semestre' => 'nullable|integer|min:1',
            'ativo' => 'required|boolean',
        ];
    }
}