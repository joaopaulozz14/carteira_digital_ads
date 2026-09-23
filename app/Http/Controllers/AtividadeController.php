<?php
// app/Http/Controllers/AtividadeController.php

namespace App\Http\Controllers;

use App\Models\Atividade;
use App\Models\Categoria;
use App\Http\Requests\StoreAtividadeRequest;
use App\Http\Requests\UpdateAtividadeRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AtividadeController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Atividade::class);

        $atividades = Atividade::whereHas('categoria.curso', fn ($q) => $q->where('instituicao_id', Auth::user()->instituicao_id))
            ->with('categoria.curso')
            ->get();

        return Inertia::render('Atividades/Index', compact('atividades'));
    }

    public function create()
    {
        $this->authorize('create', Atividade::class);

        $categorias = Categoria::whereHas('curso', fn ($q) => $q->where('instituicao_id', Auth::user()->instituicao_id))
            ->where('ativo', true)
            ->with('curso')
            ->get();

        return Inertia::render('Atividades/Create', compact('categorias'));
    }

    public function store(StoreAtividadeRequest $request)
    {
        Atividade::create([
            'categoria_id' => $request->categoria_id,
            'nome' => $request->nome,
            'unidade_medida' => $request->unidade_medida,
            'pontos_por_unidade' => $request->pontos_por_unidade,
            'regra_pontuacao' => $request->regra_pontuacao,
            'max_pontos_semestre' => $request->max_pontos_semestre,
            'ativo' => true,
        ]);

        return redirect()->route('atividades.index')->with('success', 'Atividade criada com sucesso.');
    }

    public function edit(Atividade $atividade)
    {
        $this->authorize('update', $atividade);

        return Inertia::render('Atividades/Edit', [
            'atividade' => $atividade->load('categoria.curso'),
        ]);
    }

    public function update(UpdateAtividadeRequest $request, Atividade $atividade)
    {
        $atividade->update($request->validated());

        return redirect()->route('atividades.index')->with('success', 'Atividade atualizada com sucesso.');
    }

    public function destroy(Atividade $atividade)
    {
        $this->authorize('delete', $atividade);

        if (! $this->tentarExcluir(fn () => $atividade->delete())) {
            return redirect()->route('atividades.index')
                ->with('error', 'Não é possível excluir: existem certificados vinculados a esta atividade. Considere desativá-la.');
        }

        return redirect()->route('atividades.index')->with('success', 'Atividade removida com sucesso.');
    }

    public function toggleAtivo(Atividade $atividade)
    {
        $this->authorize('update', $atividade);

        $atividade->update(['ativo' => ! $atividade->ativo]);

        return back()->with('success', $atividade->ativo ? 'Atividade reativada.' : 'Atividade desativada.');
    }
}