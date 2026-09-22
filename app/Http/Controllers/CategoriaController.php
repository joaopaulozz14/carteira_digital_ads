<?php
// app/Http/Controllers/CategoriaController.php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Curso;
use App\Http\Requests\StoreCategoriaRequest;
use App\Http\Requests\UpdateCategoriaRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Categoria::class);

        $categorias = Categoria::whereHas('curso', fn ($q) => $q->where('instituicao_id', Auth::user()->instituicao_id))
            ->with('curso')
            ->withCount('atividades')
            ->get();

        return Inertia::render('Categorias/Index', compact('categorias'));
    }

    public function create()
    {
        $this->authorize('create', Categoria::class);

        $cursos = Curso::where('instituicao_id', Auth::user()->instituicao_id)->get();

        return Inertia::render('Categorias/Create', compact('cursos'));
    }

    public function store(StoreCategoriaRequest $request)
    {
        Categoria::create([
            'curso_id' => $request->curso_id,
            'nome' => $request->nome,
            'max_pontos_curso' => $request->max_pontos_curso,
            'max_pontos_semestre' => $request->max_pontos_semestre,
            'ativo' => true,
        ]);

        return redirect()->route('categorias.index')->with('success', 'Categoria criada com sucesso.');
    }

    public function edit(Categoria $categoria)
    {
        $this->authorize('update', $categoria);

        return Inertia::render('Categorias/Edit', [
            'categoria' => $categoria->load('curso'),
        ]);
    }

    public function update(UpdateCategoriaRequest $request, Categoria $categoria)
    {
        $categoria->update($request->validated());

        return redirect()->route('categorias.index')->with('success', 'Categoria atualizada com sucesso.');
    }

    public function destroy(Categoria $categoria)
    {
        $this->authorize('delete', $categoria);

        if (! $this->tentarExcluir(fn () => $categoria->delete())) {
            return redirect()->route('categorias.index')
                ->with('error', 'Não é possível excluir: existem atividades ou certificados vinculados a esta categoria. Considere desativá-la.');
        }

        return redirect()->route('categorias.index')->with('success', 'Categoria removida com sucesso.');
    }

    public function toggleAtivo(Categoria $categoria)
    {
        $this->authorize('update', $categoria);

        $categoria->update(['ativo' => ! $categoria->ativo]);

        return back()->with('success', $categoria->ativo ? 'Categoria reativada.' : 'Categoria desativada.');
    }
}