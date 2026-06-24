<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $categorias = [
            'Curso',
            'Evento',
            'Monitoria',
            'Pesquisa',
            'Extensão',
            'Minicurso',
            'Palestra',
            'Congresso',
            'Workshop',
            'Projeto Acadêmico'
        ];

        foreach ($categorias as $categoria) {
            Categoria::firstOrCreate([
                'nome' => $categoria
            ]);
        }
    }
}
