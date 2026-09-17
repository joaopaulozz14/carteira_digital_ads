<?php

namespace Database\Seeders;

use App\Models\Instituicao;
use Illuminate\Database\Seeder;

class InstituicaoSeeder extends Seeder
{
    public function run(): void
    {
        Instituicao::firstOrCreate(
            ['sigla' => 'IFMS'],
            ['nome' => 'Instituto Federal de Mato Grosso do Sul']
        );

        // UFMS cadastrada desde já como instituição (sem curso/categorias
        // ainda), já que a arquitetura precisa suportar mais de uma
        // instituição -- os dados reais de curso/categoria/atividade da
        // UFMS entram num seeder próprio quando estiverem prontos.
        Instituicao::firstOrCreate(
            ['sigla' => 'UFMS'],
            ['nome' => 'Universidade Federal de Mato Grosso do Sul']
        );
    }
}