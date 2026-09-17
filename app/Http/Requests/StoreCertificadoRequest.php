<?php

namespace App\Http\Requests;

use App\Rules\AtividadeValidaParaCurso;
use Illuminate\Foundation\Http\FormRequest;

class StoreCertificadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Permite que qualquer usuário autenticado envie certificados. A autorização real deve ser tratada no controlador.
    }

    public function rules(): array
    {
        return [
            'atividade_id' => [
                'required',
                'integer',
                new AtividadeValidaParaCurso($this->user()->curso_id),
            ],
            'titulo' => 'required|string|max:255',
            'data_ingresso' => 'required|date|before_or_equal:today',
            'data_conclusao' => 'required|date|after_or_equal:data_ingresso|before_or_equal:today',
            'periodo' => ['required', 'string', 'regex:/^\d{4}\.[1-2]$/'], // Formato esperado: "AAAA.N" (ex: 2026.2)
            'horas_declaradas' => 'required|integer|min:1',
            'arquivo_path' => 'required|file|mimes:pdf|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'atividade_id.required' => 'Selecione uma atividade.',
            'data_ingresso.before_or_equal' => 'A data de ingresso não pode ser no futuro.',
            'data_conclusao.after_or_equal' => 'A conclusão não pode ser anterior ao ingresso.',
            'periodo.regex' => 'Informe o período no formato "AAAA.N" (ex: 2026.2).',
            'arquivo_path.required' => 'Anexe o certificado em PDF.',
            'arquivo_path.mimes' => 'O certificado deve estar em formato PDF.',
            'arquivo_path.max' => 'O arquivo deve ter no máximo 2MB.',
            'horas_declaradas.min' => 'A carga horária deve ser de pelo menos 1 hora.',
        ];
    }
}