<?php

namespace Database\Seeders;

use App\Models\Atividade;
use App\Models\Categoria;
use App\Models\Curso;
use Illuminate\Database\Seeder;

class CategoriaAtividadeIfmsSeeder extends Seeder
{
    public function run(): void
    {
        $curso = Curso::whereHas(
            'instituicao',
            fn ($query) => $query->where('sigla', 'IFMS')
        )->where('nome', 'Análise e Desenvolvimento de Sistemas')->firstOrFail();

        foreach ($this->categorias() as $dadosCategoria) {
            $categoria = Categoria::firstOrCreate(
                ['curso_id' => $curso->id, 'nome' => $dadosCategoria['nome']],
                [
                    'max_pontos_curso' => $dadosCategoria['max_pontos_curso'],
                    'max_pontos_semestre' => $dadosCategoria['max_pontos_semestre'],
                    'ativo' => true,
                ]
            );

            foreach ($dadosCategoria['atividades'] as $dadosAtividade) {
                Atividade::firstOrCreate(
                    ['categoria_id' => $categoria->id, 'nome' => $dadosAtividade['nome']],
                    [
                        'unidade_medida' => $dadosAtividade['unidade_medida'],
                        'pontos_por_unidade' => $dadosAtividade['pontos_por_unidade'],
                        'regra_pontuacao' => $dadosAtividade['regra_pontuacao'],
                        'max_pontos_semestre' => $dadosAtividade['max_pontos_semestre'],
                        'ativo' => true,
                    ]
                );
            }
        }
    }

    /**
     * Dados extraídos da planilha "mapeamento_regras_categorias_IFMS.xlsx".
     * `regra_pontuacao` reproduz o texto da coluna "Carga Horária
     * Integralizada" (incluindo condicionais) + a comprovação exigida,
     * que a planilha também especifica mas que não vira coluna própria
     * no schema -- fica embutida aqui como referência para o estudante.
     */
    private function categorias(): array
    {
        return [
            [
                'nome' => 'Atividades de aperfeiçoamento e enriquecimento cultural e esportivo',
                'max_pontos_curso' => 120,
                'max_pontos_semestre' => 80,
                'atividades' => [
                    [
                        'nome' => 'Participação como agente em atividades culturais: filme, teatro, apresentações artísticas, feiras, exposições, festivais e competições esportivas, bandas, coral, olimpíadas em geral.',
                        'unidade_medida' => 'atividade',
                        'pontos_por_unidade' => 5,
                        'regra_pontuacao' => '5 pontos por atividade. Comprovação exigida: Relatório ou Comprovante de Participação.',
                        'max_pontos_semestre' => 30,
                    ],
                    [
                        'nome' => 'Visitas técnicas e culturais: patrimônios tombados, cidades históricas, monumentos, museus, memoriais, escola-modelo, creches, berçários, ONGs, APAE e entidades afins, hospitais laboratórios, instituições de ensino e pesquisa, empresas públicas e privadas e outras de interesse do curso.',
                        'unidade_medida' => 'visita',
                        'pontos_por_unidade' => 5,
                        'regra_pontuacao' => '5 pontos por visita. Comprovação exigida: Relatório ou Comprovante de Participação.',
                        'max_pontos_semestre' => 30,
                    ],
                    [
                        'nome' => 'Realização de cursos de língua estrangeira, informática e outros de formação cultural, social ou específica do âmbito do curso.',
                        'unidade_medida' => 'hora',
                        'pontos_por_unidade' => 1,
                        'regra_pontuacao' => '1 ponto por hora. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 40,
                    ],
                    [
                        'nome' => 'Trabalho voluntário, atividades comunitárias, associações de bairros, brigadas de incêndio e associações escolares.',
                        'unidade_medida' => 'participação',
                        'pontos_por_unidade' => 10,
                        'regra_pontuacao' => '10 pontos por participação. Comprovação exigida: Declaração.',
                        'max_pontos_semestre' => 40,
                    ],
                ],
            ],
            [
                'nome' => 'Atividade de divulgação científica e de iniciação à docência',
                'max_pontos_curso' => 100,
                'max_pontos_semestre' => 60,
                'atividades' => [
                    [
                        'nome' => 'Monitoria remunerada ou voluntária.',
                        'unidade_medida' => 'participação',
                        'pontos_por_unidade' => 15,
                        'regra_pontuacao' => '15 pontos por participação. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 60,
                    ],
                    [
                        'nome' => 'Membro atuante em atividades técnico-científicas, tais como apresentação de trabalhos científicos, ministrar palestras, orientações técnicas supervisionadas e participação em bancas de debate.',
                        'unidade_medida' => 'participação',
                        'pontos_por_unidade' => 10,
                        'regra_pontuacao' => '10 pontos por participação ou 15 pontos, caso o trabalho seja da área específica do curso. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 30,
                    ],
                    [
                        'nome' => 'Participação em atividades pedagógicas de observação.',
                        'unidade_medida' => 'participação',
                        'pontos_por_unidade' => 5,
                        'regra_pontuacao' => '5 pontos por participação. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 20,
                    ],
                ],
            ],
            [
                'nome' => 'Atividades de vivência acadêmica e profissional complementar',
                'max_pontos_curso' => 100,
                'max_pontos_semestre' => 60,
                'atividades' => [
                    [
                        'nome' => 'Organização de eventos acadêmicos e festivais.',
                        'unidade_medida' => 'hora',
                        'pontos_por_unidade' => 1,
                        'regra_pontuacao' => '1 ponto por hora ou 10 pontos por evento, caso o documento de aprovação não apresente a carga horária. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 30,
                    ],
                    [
                        'nome' => 'Representação discente em Conselhos e Entidades estudantis, liderança de turma, órgãos de classe e conselhos representativos.',
                        'unidade_medida' => 'participação',
                        'pontos_por_unidade' => 5,
                        'regra_pontuacao' => '5 pontos por participação. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 20,
                    ],
                    [
                        'nome' => 'Participação como ouvinte em eventos acadêmicos, tais como bancas de TCC, dissertação, teses.',
                        'unidade_medida' => 'participação',
                        'pontos_por_unidade' => 3,
                        'regra_pontuacao' => '3 pontos por participação. Comprovação exigida: Relatório/Declaração.',
                        'max_pontos_semestre' => 18,
                    ],
                    [
                        'nome' => 'Participação como ouvinte em congressos, seminários, simpósios e demais eventos relacionados ao curso de graduação ou áreas afins.',
                        'unidade_medida' => 'hora',
                        'pontos_por_unidade' => 1,
                        'regra_pontuacao' => '1 ponto por hora ou 10 pontos por evento, caso o documento de comprovação não apresente a carga horária. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 40,
                    ],
                    [
                        'nome' => 'Participação em visita técnica relacionada à área de atuação.',
                        'unidade_medida' => 'hora',
                        'pontos_por_unidade' => 1,
                        'regra_pontuacao' => '1 ponto por hora ou 8 pontos por evento, caso o documento de comprovação não apresente a carga horária. Comprovação exigida: Relatório da visita, com anuência do professor responsável.',
                        'max_pontos_semestre' => 20,
                    ],
                    [
                        'nome' => 'Participação em projetos de incubação.',
                        'unidade_medida' => 'mês',
                        'pontos_por_unidade' => 7.5,
                        'regra_pontuacao' => '7,5 pontos por mês. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 45,
                    ],
                ],
            ],
            [
                'nome' => 'Atividades de pesquisa ou extensão e publicações',
                'max_pontos_curso' => 100,
                'max_pontos_semestre' => 80,
                'atividades' => [
                    [
                        'nome' => 'Participação em projetos e grupos de pesquisa.',
                        'unidade_medida' => 'mês',
                        'pontos_por_unidade' => 7.5,
                        'regra_pontuacao' => '7,5 pontos por mês. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 45,
                    ],
                    [
                        'nome' => 'Participação em projetos e grupos de extensão.',
                        'unidade_medida' => 'mês',
                        'pontos_por_unidade' => 7.5,
                        'regra_pontuacao' => '7,5 pontos por mês. Comprovação exigida: Certificado/Declaração.',
                        'max_pontos_semestre' => 45,
                    ],
                    [
                        'nome' => 'Publicação de artigo científico completo em revista ou periódico.',
                        'unidade_medida' => 'publicação',
                        'pontos_por_unidade' => 25,
                        'regra_pontuacao' => '25 pontos por publicação ou 30 pontos por publicação em revista ou periódico da área. Comprovação exigida: Artigo Publicado.',
                        'max_pontos_semestre' => 50,
                    ],
                    [
                        'nome' => 'Publicação de resumos de artigo científico em revista ou periódico.',
                        'unidade_medida' => 'publicação',
                        'pontos_por_unidade' => 15,
                        'regra_pontuacao' => '15 pontos por publicação ou 20 pontos por publicação em revista ou periódico da área. Comprovação exigida: Resumo Publicado.',
                        'max_pontos_semestre' => 50,
                    ],
                    [
                        'nome' => 'Publicação de matérias ou notas em jornais e meios eletrônicos.',
                        'unidade_medida' => 'publicação',
                        'pontos_por_unidade' => 5,
                        'regra_pontuacao' => '5 pontos por publicação. Comprovação exigida: Publicação.',
                        'max_pontos_semestre' => 10,
                    ],
                ],
            ],
        ];
    }
}