<?php

namespace App\Http\Controllers;

use App\Models\Certificado;
use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Requests\StoreCertificadoRequest;
use App\Http\Requests\UpdateCertificadoRequest;
use Illuminate\Support\Facades\Storage;


class CertificadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // For now, there's still not a separation between institutions, so we will show all certificates to admins and only the user's own certificates to students.
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
        $this->authorizeView($certificado);

        return Inertia::render('Certificados/Show', [
            'certificado' => $certificado->load('categoria', 'user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificado $certificado)
    {
        $this->authorizeView($certificado);

        if ($certificado->status !== 'PENDENTE' && Auth::user()->tipo !== 'ADMIN') {
            return redirect()
                ->route('certificados.show', $certificado)
                ->with('error', 'Este certificado já foi analisado e não pode mais ser editado.');
        }

        return Inertia::render('Certificados/Edit', [
            'certificado' => $certificado->load('categoria'),
            'categorias' => Categoria::all(),
        ]);
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCertificadoRequest $request, Certificado $certificado)
    {
        $dados = $request->only(['categoria_id', 'titulo', 'horas_declaradas']);

        if ($request->hasFile('arquivo_path')) {
            Storage::disk('public')->delete($certificado->arquivo_path);
            $dados['arquivo_path'] = $request->file('arquivo_path')->store('certificados', 'public');
        }

        $certificado->update($dados);

        return redirect()
            ->route('certificados.show', $certificado)
            ->with('success', 'Certificado atualizado com sucesso.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificado $certificado)
    {
        $this->authorizeView($certificado);

        Storage::disk('public')->delete($certificado->arquivo_path);
        $certificado->delete();

        return redirect()
            ->route('certificados.index')
            ->with('success', 'Certificado excluído com sucesso.');
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

    private function authorizeView(Certificado $certificado): void
    {
        if ($certificado->user_id !== Auth::id() && Auth::user()->tipo !== 'ADMIN') {
            abort(403);
        }
    }
}
