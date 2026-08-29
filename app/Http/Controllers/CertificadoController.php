<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\StoreCertificadoRequest;

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
    public function store(StoreCertificadoRequest $request)
    {
        $arquivoPath = $request->file('arquivo_path')->store('certificados', 'public');

        Certificado::create([
            'user_id' => Auth::id(),
            'categoria_id' => $request->categoria_id,
            'titulo' => $request->titulo,
            'horas_declaradas' => $request->horas_declaradas,
            'status' => 'PENDENTE',
            'data_envio' => now(),
            'horas_validadas' => null,
            'justificativa' => null,
            'arquivo_path' => $arquivoPath,
        ]);

        return redirect()
            ->route('certificados.index')
            ->with('success', 'Certificado enviado com sucesso! Aguarde a validação.');
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
