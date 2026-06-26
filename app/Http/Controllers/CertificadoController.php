<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CertificadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        if (Auth::user()->tipo === 'ADMIN') {

            $certificados = Certificado::with([
                'user',
                'categoria'
            ])->get();
        } else {

            $certificados = Certificado::with('categoria')
                ->where('user_id', Auth::id())
                ->get();
        }

        return Inertia::render(
            'Certificados/Index',
            compact('certificados')
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $categorias = Categoria::all();

        return Inertia::render('Certificados/Create', [
            'categorias' => $categorias
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // campos: user_id, categoria_id, titulo, horas_declaradas, horas_validadas, status, justificativa, arquivo_path, data_envio

        $request->validate([
            'categoria_id' => 'required|exists:categorias,id',
            'titulo' => 'required|string|max:255',
            'horas_declaradas' => 'required|integer|min:1',
            'arquivo_path' => 'required|file|mimes:pdf|max:2048', // max 2MB
        ]);

        $arquivoPath = $request->file('arquivo_path')->store('certificados', 'public');

        $certificado = new Certificado();

        $certificado->user_id = Auth::id();
        $certificado->categoria_id = $request->categoria_id;
        $certificado->titulo = $request->titulo;
        $certificado->horas_declaradas = $request->horas_declaradas;

        $certificado->status = 'PENDENTE';
        $certificado->data_envio = now();

        $certificado->horas_validadas = null;
        $certificado->justificativa = null;

        $certificado->arquivo_path = $arquivoPath;

        $certificado->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificado $certificado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificado $certificado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificado $certificado)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificado $certificado)
    {
        //
    }

    public function aprovar(Certificado $certificado)
    {
        $certificado->status = 'APROVADO';
        $certificado->save();

        return back();
    }

    public function rejeitar(Certificado $certificado)
    {
        $certificado->status = 'REJEITADO';
        $certificado->save();

        return back();
    }
}
