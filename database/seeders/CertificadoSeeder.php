<?php

namespace Database\Seeders;

use App\Models\Atividade;
use App\Models\Certificado;
use App\Models\User;
use Illuminate\Database\Seeder;

class CertificadoSeeder extends Seeder
{
    public function run(): void
    {
        $aluno1 = User::where('email', 'aluno1@cdc.com')->first();
        $aluno2 = User::where('email', 'aluno2@cdc.com')->first();

        $atividadeCursoInformatica = Atividade::where('nome', 'like', 'Realização de cursos de língua estrangeira%')->firstOrFail();
        $atividadeOuvinteEvento = Atividade::where('nome', 'like', 'Participação como ouvinte em congressos%')->firstOrFail();
        $atividadeMonitoria = Atividade::where('nome', 'like', 'Monitoria remunerada%')->firstOrFail();
        $atividadeExtensao = Atividade::where('nome', 'like', 'Participação em projetos e grupos de extensão%')->firstOrFail();

        $certificados = [
            [
                'user_id' => $aluno1->id,
                'atividade_id' => $atividadeCursoInformatica->id,
                'titulo' => 'Curso de Lógica de Programação',
                'data_ingresso' => '2025-02-10',
                'data_conclusao' => '2025-04-15',
                'periodo' => '2025.1',
                'horas_declaradas' => 40,
                'horas_validadas' => 40,
                'status' => 'APROVADO',
                'justificativa' => null,
                'arquivo_path' => 'certificados/exemplo1.pdf',
                'data_envio' => '2025-04-20 09:30:00',
            ],
            [
                'user_id' => $aluno1->id,
                'atividade_id' => $atividadeOuvinteEvento->id,
                'titulo' => 'Semana Acadêmica de Tecnologia',
                'data_ingresso' => '2025-06-02',
                'data_conclusao' => '2025-06-06',
                'periodo' => '2025.1',
                'horas_declaradas' => 20,
                'horas_validadas' => null,
                'status' => 'PENDENTE',
                'justificativa' => null,
                'arquivo_path' => 'certificados/exemplo2.pdf',
                'data_envio' => '2025-06-10 14:00:00',
            ],
            [
                'user_id' => $aluno1->id,
                'atividade_id' => $atividadeMonitoria->id,
                'titulo' => 'Monitoria de Banco de Dados',
                'data_ingresso' => '2025-03-01',
                'data_conclusao' => '2025-07-01',
                'periodo' => '2025.1',
                'horas_declaradas' => 60,
                'horas_validadas' => 0,
                'status' => 'REJEITADO',
                'justificativa' => 'Documento sem assinatura do responsável.',
                'arquivo_path' => 'certificados/exemplo3.pdf',
                'data_envio' => '2025-07-05 11:15:00',
            ],
            [
                'user_id' => $aluno2->id,
                'atividade_id' => $atividadeExtensao->id,
                'titulo' => 'Projeto de Extensão Comunitária',
                'data_ingresso' => '2025-05-01',
                'data_conclusao' => '2025-08-01',
                'periodo' => '2025.2',
                'horas_declaradas' => 30,
                'horas_validadas' => 30,
                'status' => 'APROVADO',
                'justificativa' => null,
                'arquivo_path' => 'certificados/exemplo4.pdf',
                'data_envio' => '2025-08-03 10:00:00',
            ],
            [
                'user_id' => $aluno2->id,
                'atividade_id' => $atividadeCursoInformatica->id,
                'titulo' => 'Minicurso de Git e GitHub',
                'data_ingresso' => '2025-09-01',
                'data_conclusao' => '2025-09-03',
                'periodo' => '2025.2',
                'horas_declaradas' => 8,
                'horas_validadas' => null,
                'status' => 'PENDENTE',
                'justificativa' => null,
                'arquivo_path' => 'certificados/exemplo5.pdf',
                'data_envio' => '2025-09-05 16:45:00',
            ],
        ];

        foreach ($certificados as $certificado) {
            Certificado::create($certificado);
        }
    }
}