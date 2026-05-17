<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('certificados', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('categoria_id')
                ->constrained('categorias')
                ->restrictOnDelete();

            $table->string('titulo');

            $table->integer('horas_declaradas');

            $table->integer('horas_validadas')
                ->nullable();

            $table->enum('status', [
                'PENDENTE',
                'APROVADO',
                'REJEITADO'
            ])->default('PENDENTE');

            $table->text('justificativa')
                ->nullable();

            $table->string('arquivo_path');

            $table->timestamp('data_envio')
                ->useCurrent();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certificados');
    }
};
