<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    protected $fillable = [
        'nome'
    ];

    public function certificados()
    {
        return $this->hasMany(Certificado::class);
    }

    public function regras()
    {
        return $this->hasMany(Regra::class);
    }
}