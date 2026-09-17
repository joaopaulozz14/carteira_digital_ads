<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Instituicao extends Model
{
    protected $table = 'instituicoes';

    protected $fillable = [
        'nome',
        'sigla'
    ];

    public function cursos()
    {
        return $this->hasMany(Curso::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
