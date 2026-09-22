<?php
// app/Http/Controllers/CursoController.php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Http\Requests\StoreCursoRequest;
use App\Http\Requests\UpdateCursoRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CursoController extends Controller
{
    public function index()
    {
        $this->authorize('viewAny', Curso::class);

        $cursos = Curso::where('instituicao_id', Auth::user()->instituicao_id)
            ->withCount('categorias')
            ->get();

        return Inertia::render('Cursos/Index', compact('cursos'));
    }

    public function create()
    {
        $this->authorize('create', Curso::class);

        return Inertia::render('Cursos/Create');
    }

    public function store(StoreCursoRequest $request)
    {
        Curso::create([
            'instituicao_id' => Auth::user()->instituicao_id,
            'nome' => $request->nome,
            'campus' => $request->campus,
            'carga_horaria_total_exigida' => $request->carga_horaria_total_exigida,
            'minimo_tipos_atividade_diferentes' => $request->minimo_tipos_atividade_diferentes,
        ]);

        return redirect()->route('cursos.index')->with('success', 'Curso criado com sucesso.');
    }

    public function edit(Curso $curso)
    {
        $this->authorize('update', $curso);

        return Inertia::render('Cursos/Edit', compact('curso'));
    }

    public function update(UpdateCursoRequest $request, Curso $curso)
    {
        $curso->update($request->validated());

        return redirect()->route('cursos.index')->with('success', 'Curso atualizado com sucesso.');
    }

    public function destroy(Curso $curso)
    {
        $this->authorize('delete', $curso);

        if (! $this->tentarExcluir(fn () => $curso->delete())) {
            return redirect()->route('cursos.index')
                ->with('error', 'Não é possível excluir: existem categorias, atividades ou certificados vinculados a este curso.');
        }

        return redirect()->route('cursos.index')->with('success', 'Curso removido com sucesso.');
    }
}