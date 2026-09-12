<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateCertificadoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', $this->route('certificado')); // delegate authorization to the CertificadoPolicy's update method
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
            'data_ingresso' => 'required|date|before_or_equal:today',
            'data_conclusao' => 'nullable|date|after:data_ingresso',
            'periodo' => ['required', 'string', 'regex:/^\d{4}\.[1-2]$/'], // Formato: "2026.1"
            'horas_declaradas' => 'required|integer|min:1',
            'arquivo_path' => 'nullable|file|mimes:pdf|max:2048', // Optional file upload for updates
        ];
    }

    public function messages(): array
    {
        return [
            'arquivo_path.mimes' => 'O certificado deve estar em formato PDF.',
            'arquivo_path.max' => 'O arquivo deve ter no máximo 2MB.',
        ];
    }
}
