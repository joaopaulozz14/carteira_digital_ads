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
            'horas_declaradas' => 'required|integer|min:1',
            'arquivo_path' => 'required|file|mimes:pdf|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'arquivo_path.required' => 'Anexe o certificado em PDF.',
            'arquivo_path.mimes' => 'O certificado deve estar em formato PDF.',
            'arquivo_path.max' => 'O arquivo deve ter no máximo 2MB.',
            'horas_declaradas.min' => 'A carga horária deve ser de pelo menos 1 hora.',
        ];
    }
}
