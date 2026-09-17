<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atividade extends Model
{
    protected $fillable = [
        'categoria_id',
        'nome',
        'unidade_medida',
        'pontos_por_unidade',
        'regra_pontuacao',
        'max_pontos_semestre',
        'ativo',
    ];

    protected $casts = [
        'pontos_por_unidade' => 'decimal:2',
        'ativo' => 'boolean',
    ];

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function certificados()
    {
        return $this->hasMany(Certificado::class);
    }
}