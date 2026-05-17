<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificado extends Model
{
    protected $fillable = [
        'user_id',
        'categoria_id',
        'titulo',
        'horas_declaradas',
        'horas_validadas',
        'status',
        'justificativa',
        'arquivo_path',
        'data_envio'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }
}
