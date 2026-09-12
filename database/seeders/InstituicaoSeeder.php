<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Instituicao;

class InstituicaoSeeder extends Seeder
{
    public function run(): void
    {
        Instituicao::create([
            'nome' => 'Instituto Federal de Mato Grosso do Sul',
            'sigla' => 'IFMS',
        ]);

        Instituicao::create([
            'nome' => 'Universidade Federal de Mato Grosso do Sul',
            'sigla' => 'UFMS',
        ]);
    }
}