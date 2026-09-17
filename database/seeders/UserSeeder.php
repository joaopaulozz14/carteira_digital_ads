<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Instituicao;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $ifms = Instituicao::where('sigla', 'IFMS')->first();
        $ufms = Instituicao::where('sigla', 'UFMS')->first();
        $curso = $ifms->cursos()->where('nome', 'Análise e Desenvolvimento de Sistemas')->first();

        User::firstOrCreate([
            'name' => 'Administrador',
            'email' => 'admin@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ADMIN',
            'instituicao_id' => $ifms->id,
        ]);

        User::firstOrCreate([
            'name' => 'João Estudante',
            'email' => 'aluno1@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ESTUDANTE',
            'instituicao_id' => $ifms->id,
            'curso_id' => $curso->id,
        ]);

        User::firstOrCreate([
            'name' => 'Luis Estudante',
            'email' => 'aluno2@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ESTUDANTE',
            'instituicao_id' => $ufms->id,
        ]);
    }
}