<?php

namespace App\Rules;

use App\Models\Atividade;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AtividadeValidaParaCurso implements ValidationRule
{
    /**
     * @param int|null $cursoId Curso ao qual a atividade deve pertencer.
     * @param int|null $atividadeAtualId Atividade já vinculada ao certificado
     *        (permite manter uma atividade desativada depois do envio).
     */
    public function __construct(
        protected ?int $cursoId,
        protected ?int $atividadeAtualId = null,
    ) {}

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! $this->cursoId) {
            $fail('Não foi possível validar a atividade: usuário sem curso definido.');
            return;
        }

        $pertenceAoCurso = fn () => Atividade::whereHas(
            'categoria',
            fn ($query) => $query->where('curso_id', $this->cursoId)
        )->whereKey($value);

        // Mantendo a mesma atividade já registrada, aceita mesmo se foi desativada depois
        if ((int) $value === $this->atividadeAtualId) {
            if (! $pertenceAoCurso()->exists()) {
                $fail('A atividade selecionada não é válida para o seu curso.');
            }
            return;
        }

        if (! $pertenceAoCurso()->where('ativo', true)->exists()) {
            $fail('A atividade selecionada não é válida para o seu curso.');
        }
    }
}