<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('certificados', function (Blueprint $table) {
            $table->renameColumn('data_atividade', 'data_ingresso');
        });

        Schema::table('certificados', function (Blueprint $table) {
            $table->year('data_conclusao')->after('data_ingresso');
        });
    }

    public function down(): void
    {
        Schema::table('certificados', function (Blueprint $table) {
            $table->dropColumn('data_conclusao');
        });

        Schema::table('certificados', function (Blueprint $table) {
            $table->renameColumn('data_ingresso', 'data_atividade');
        });
    }
};