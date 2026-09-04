<?php
// database/migrations/xxxx_xx_xx_add_data_atividade_and_periodo_to_certificados_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('certificados', function (Blueprint $table) {
            $table->date('data_atividade')->after('titulo');
            $table->string('periodo', 10)->after('data_atividade'); // formato: "2026.1"
        });
    }

    public function down(): void
    {
        Schema::table('certificados', function (Blueprint $table) {
            $table->dropColumn(['data_atividade', 'periodo']);
        });
    }
};