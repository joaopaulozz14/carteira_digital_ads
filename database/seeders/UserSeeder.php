<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@cdc.com',
            'password' => Hash::make('password'), //hash is used to encrypt the password
            'tipo' => 'ADMIN',
        ]);

        User::create([
            'name' => 'João Estudante',
            'email' => 'aluno1@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ESTUDANTE',
        ]);

        User::create([
            'name' => 'Luis Estudante',
            'email' => 'aluno2@cdc.com',
            'password' => Hash::make('password'),
            'tipo' => 'ESTUDANTE',
        ]);
    }
}
