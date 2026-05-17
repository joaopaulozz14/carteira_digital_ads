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

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function regras()
    {
        return $this->hasMany(Regra::class);
    }
}
