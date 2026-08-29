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
        $certificado = $this->route('certificado'); // If it breaks in a unit test, you might need to adjust this line to get the certificado from the request data instead of the route.
        
        $user = $this->user();

        if ($user->tipo === 'ADMIN') {
            return true; // admins podem editar qualquer certificado
        }

        if ($user->tipo === 'ESTUDANTE' && $certificado->user_id === $user->id && $certificado->status === 'PENDENTE') {
            return true; // estudante só edita o próprio certificado, e só enquanto PENDENTE
        }

        return false;
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
