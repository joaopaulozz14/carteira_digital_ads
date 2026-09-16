<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('instituicao_id')
                ->nullable()
                ->after('tipo')
                ->constrained('instituicoes')
                ->nullOnDelete();

            $table->foreignId('curso_id')
                ->nullable()
                ->after('instituicao_id')
                ->constrained('cursos')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropConstrainedForeignId('curso_id');
            $table->dropConstrainedForeignId('instituicao_id');
        });
    }
};