<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreCertificadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow all users to make this request. Adjust as needed for your application.
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'categoria_id' => 'required|exists:categorias,id',
            'titulo' => 'required|string|max:255',
            'data_atividade' => 'required|date|before_or_equal:today',
            'periodo' => ['required', 'string', 'regex:/^\d{4}\.[1-2]$/'], // Formato: "2026.1" ou "2026.2"
            'horas_declaradas' => 'required|integer|min:1',
            'arquivo_path' => 'required|file|mimes:pdf|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'data_atividade.before_or_equal' => "A data da atividade não pode ser no futuro.",
            'periodo.regex' => 'O período deve estar no formato "YYYY.X" (ex: 2026.1 ou 2026.2).',
            'arquivo_path.required' => 'Anexe o certificado em PDF.',
            'arquivo_path.mimes' => 'O certificado deve estar em formato PDF.',
            'arquivo_path.max' => 'O arquivo deve ter no máximo 2MB.',
            'horas_declaradas.min' => 'A carga horária deve ser de pelo menos 1 hora',
        ];
    }
}
