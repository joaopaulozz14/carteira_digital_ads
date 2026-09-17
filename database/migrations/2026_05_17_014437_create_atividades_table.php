<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('atividades', function (Blueprint $table) {
            $table->id();

            $table->foreignId('categoria_id')
                ->constrained('categorias')
                ->cascadeOnDelete();

            $table->text('nome'); // changer to 'string' later if needed, but 'text' allows for longer names
            $table->string('unidade_medida'); // hora, atividade, participacao, mes, publicacao...
            $table->decimal('pontos_por_unidade', 8, 2);
            $table->text('regra_pontuacao'); // texto livre — cobre taxas condicionais/compostas
            $table->unsignedInteger('max_pontos_semestre')->nullable();
            $table->boolean('ativo')->default(true);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('atividades');
    }
};