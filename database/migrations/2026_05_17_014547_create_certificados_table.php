<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('certificados', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('atividade_id')
                ->constrained('atividades')
                ->restrictOnDelete();

            $table->string('titulo');

            $table->date('data_ingresso');
            $table->date('data_conclusao');
            $table->string('periodo', 10); // formato: "AAAA.N" — conta o período de conclusão

            $table->integer('horas_declaradas');
            $table->integer('horas_validadas')->nullable();

            $table->enum('status', [
                'PENDENTE',
                'APROVADO',
                'REJEITADO'
            ])->default('PENDENTE');

            $table->text('justificativa')->nullable();
            $table->string('arquivo_path');

            $table->timestamp('data_envio')->useCurrent();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('certificados');
    }
};