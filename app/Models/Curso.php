<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $fillable = [
        'instituicao_id',
        'nome',
        'campus',
        'carga_horaria_total_exigida',
        'minimo_tipos_atividade_diferentes',
    ];

    public function instituicao()
    {
        return $this->belongsTo(Instituicao::class);
    }

    public function categorias()
    {
        return $this->hasMany(Categoria::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}