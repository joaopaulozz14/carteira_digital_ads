<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Regra extends Model
{
    protected $fillable = [
        'instituicao_id',
        'categoria_id',
        'max_horas_categoria',
        'max_horas_total',
        'max_horas_semestre'
    ];

    public function instituicao()
    {
        return $this->belongsTo(Instituicao::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
