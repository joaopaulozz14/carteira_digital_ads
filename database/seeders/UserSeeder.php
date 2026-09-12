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

        User::create([
            'name' => 'Administrador',
            'email' => 'admin@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ADMIN',
            'instituicao_id' => $ifms->id,
        ]);

        User::create([
            'name' => 'João Estudante',
            'email' => 'aluno1@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ESTUDANTE',
            'instituicao_id' => $ifms->id,
        ]);

        User::create([
            'name' => 'Luis Estudante',
            'email' => 'aluno2@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ESTUDANTE',
            'instituicao_id' => $ufms->id,
        ]);
    }
}