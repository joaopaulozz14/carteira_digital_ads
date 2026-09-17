<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = [
        'curso_id',
        'nome',
        'max_pontos_curso',
        'max_pontos_semestre',
        'ativo',
    ];

    protected $casts = [
        'ativo' => 'boolean',
    ];

    public function curso()
    {
        return $this->belongsTo(Curso::class);
    }

    public function atividades()
    {
        return $this->hasMany(Atividade::class);
    }
}