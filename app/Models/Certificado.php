<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Certificado extends Model
{
    protected $fillable = [
        'user_id',
        'atividade_id',
        'titulo',
        'data_ingresso',
        'data_conclusao',
        'periodo',
        'horas_declaradas',
        'horas_validadas',
        'status',
        'justificativa',
        'arquivo_path',
        'data_envio',
    ];

    protected $casts = [
        'data_ingresso' => 'date',
        'data_conclusao' => 'date',
        'data_envio' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function atividade()
    {
        return $this->belongsTo(Atividade::class);
    }
}
