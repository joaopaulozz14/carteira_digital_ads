<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\Instituicao;
use Illuminate\Database\Seeder;

class CursoSeeder extends Seeder
{
    public function run(): void
    {
        $ifms = Instituicao::where('sigla', 'IFMS')->firstOrFail();

        Curso::firstOrCreate(
            ['instituicao_id' => $ifms->id, 'nome' => 'Análise e Desenvolvimento de Sistemas'],
            [
                'campus' => 'Corumbá',
                // TODO: confirmar com o PPC do curso -- valor abaixo é placeholder,
                // NÃO usar em produção sem substituir pelo número real exigido.
                'carga_horaria_total_exigida' => 120,
                'minimo_tipos_atividade_diferentes' => null, // regra específica da UFMS, não do IFMS
            ]
        );
    }
}