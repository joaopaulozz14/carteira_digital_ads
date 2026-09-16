<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cursos', function (Blueprint $table) {
            $table->id();

            $table->foreignId('instituicao_id')
                ->constrained('instituicoes')
                ->cascadeOnDelete();

            $table->string('nome');
            $table->string('campus')->nullable();
            $table->unsignedInteger('carga_horaria_total_exigida');
            $table->unsignedInteger('minimo_tipos_atividade_diferentes')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cursos');
    }
};