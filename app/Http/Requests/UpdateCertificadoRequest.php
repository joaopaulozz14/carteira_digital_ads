<?php

namespace App\Http\Requests;

use App\Rules\AtividadeValidaParaCurso;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCertificadoRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('certificado'));
    }

    public function rules(): array
    {
        $certificado = $this->route('certificado');

        return [
            'atividade_id' => [
                'required',
                'integer',
                new AtividadeValidaParaCurso($certificado->user->curso_id, $certificado->atividade_id),
            ],
            'titulo' => 'required|string|max:255',
            'data_ingresso' => 'required|date|before_or_equal:today',
            'data_conclusao' => 'required|date|after_or_equal:data_ingresso|before_or_equal:today',
            'periodo' => ['required', 'string', 'regex:/^\d{4}\.[1-2]$/'],
            'horas_declaradas' => 'required|integer|min:1',
            'arquivo_path' => 'nullable|file|mimes:pdf|max:2048',
        ];
    }
}