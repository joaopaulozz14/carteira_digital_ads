import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Search, Check, X, ArrowUpRight } from 'lucide-react';

const RECORDS = [
  { id: 'RC-0142', student: 'Ana Beatriz Ferreira', ra: '2021044120', course: 'Curso A — Módulo 3', category: 'Curso A', hours: 12, submitted: '12/09/2026', status: 'pending', note: 'Certificado emitido pela plataforma parceira EduPass. Carga horária confere com o edital do módulo.' },
  { id: 'RC-0141', student: 'Thiago Nascimento', ra: '2020098213', course: 'Estágio Supervisionado I', category: 'Estágio', hours: 40, submitted: '11/09/2026', status: 'pending', note: 'Relatório de estágio anexado em PDF, assinado pelo supervisor. Falta o carimbo da unidade concedente.' },
  { id: 'RC-0140', student: 'Camila Rocha', ra: '2022017765', course: 'Workshop de Extensão — IA Aplicada', category: 'Sem categoria', hours: 6, submitted: '10/09/2026', status: 'pending', note: 'Curso sem categoria vinculada ainda. Atribuir categoria antes de validar as horas.' },
  { id: 'RC-0139', student: 'João Estudante', ra: '2021031456', course: 'Curso A — Módulo 3', category: 'Curso A', hours: 18, submitted: '09/09/2026', status: 'approved', note: 'Validado em 09/09/2026 por Marina Cavalcante.' },
  { id: 'RC-0138', student: 'Rafael Souza', ra: '2019012098', course: 'Curso B — Introdução', category: 'Curso B', hours: 15, submitted: '08/09/2026', status: 'approved', note: 'Validado em 08/09/2026 por Marina Cavalcante.' },
  { id: 'RC-0137', student: 'Larissa Melo', ra: '2020076541', course: 'Estágio Supervisionado II', category: 'Estágio', hours: 60, submitted: '05/09/2026', status: 'approved', note: 'Validado em 06/09/2026 por Marina Cavalcante.' },
  { id: 'RC-0136', student: 'Bruno Tavares', ra: '2022003321', course: 'Palestra de Extensão', category: 'Sem categoria', hours: 4, submitted: '03/09/2026', status: 'rejected', note: 'Rejeitado: carga horária declarada não corresponde ao certificado anexado.' },
];

const CATEGORY_CLASSES = {
  'Curso A': 'bg-action-blue',
  'Curso B': 'bg-[#7C9CF0]',
  'Estágio': 'bg-[#3FA772]',
  'Sem categoria': 'bg-[#B9C2D0]',
};

function StatusChip({ status }) {
  const map = {
    pending: { label: 'Pendente', className: 'bg-status-amber-badge text-status-amber-text' },
    approved: { label: 'Aprovado', className: 'bg-status-green-bg text-status-green-text' },
    rejected: { label: 'Rejeitado', className: 'bg-status-red text-status-red-text' },
  };
  const s = map[status];
  return (
    <span className={`${s.className} rounded-pill px-2.5 py-1 text-xs font-bold`}>
      {s.label}
    </span>
  );
}

export default function Aluno() {
  const [records, setRecords] = useState(RECORDS);
  const [tab, setTab] = useState('pending');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(RECORDS.find((r) => r.status === 'pending')?.id ?? null);

  const counts = useMemo(() => {
    const c = { pending: 0, approved: 0, rejected: 0 };
    records.forEach((r) => (c[r.status] += 1));
    return c;
  }, [records]);

  const totalHours = useMemo(
    () => records.filter((r) => r.status === 'approved').reduce((a, r) => a + r.hours, 0),
    [records]
  );

  const filtered = useMemo(() => {
    return records
      .filter((r) => (tab === 'all' ? true : r.status === tab))
      .filter((r) =>
        query.trim() === ''
          ? true
          : r.student.toLowerCase().includes(query.toLowerCase()) ||
            r.course.toLowerCase().includes(query.toLowerCase())
      );
  }, [records, tab, query]);

  const selected = records.find((r) => r.id === selectedId) || null;

  const decide = (id, status) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, status, note: status === 'approved' ? 'Validado em 15/09/2026 por Marina Cavalcante.' : 'Rejeitado em 15/09/2026 por Marina Cavalcante.' }
          : r
      )
    );
  };

  const tabs = [
    { key: 'pending', label: 'Pendentes', count: counts.pending },
    { key: 'approved', label: 'Aprovados', count: counts.approved },
    { key: 'rejected', label: 'Rejeitados', count: counts.rejected },
    { key: 'all', label: 'Todos', count: records.length },
  ];

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-bg-input font-body text-text-heading">
        <div className="bg-navy-deep px-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-6 py-8">
            <div>
              <h1 className="mb-2 font-display text-[30px] font-extrabold">Fila de validação</h1>
              <p className="max-w-[420px] text-[14.5px] text-white/65">
                Revise as horas enviadas pelos estudantes antes que entrem na carteira digital deles.
              </p>
            </div>
            <div className="flex gap-3.5">
              <div className="min-w-[110px] rounded-card bg-white/[0.06] px-[22px] py-3.5">
                <div className="text-[22px] font-display font-extrabold text-[#F2C871]">{counts.pending}</div>
                <div className="text-[12.5px] text-white/60">Pendentes</div>
              </div>
              <div className="min-w-[110px] rounded-card bg-white/[0.06] px-[22px] py-3.5">
                <div className="text-[22px] font-display font-extrabold text-[#7EDBA4]">{counts.approved}</div>
                <div className="text-[12.5px] text-white/60">Aprovados</div>
              </div>
              <div className="min-w-[110px] rounded-card bg-white/[0.06] px-[22px] py-3.5">
                <div className="text-[22px] font-display font-extrabold text-[#F0918A]">{counts.rejected}</div>
                <div className="text-[12.5px] text-white/60">Rejeitados</div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className={`grid gap-5 px-8 pb-12 pt-7 ${selected ? 'grid-cols-[1.7fr_1fr]' : 'grid-cols-1'}`}>
          {/* List card */}
          <div className="rounded-card bg-white shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-[22px] py-[18px]">
              <div className="flex gap-1.5">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`flex items-center gap-1.5 rounded-btn px-3.5 py-1.5 text-[13px] font-semibold ${
                      tab === t.key ? 'bg-action-blue/10 text-action-blue' : 'text-text-secondary'
                    }`}
                  >
                    {t.label}
                    <span
                      className={`rounded-pill px-1.5 py-0.5 text-[11px] ${
                        tab === t.key ? 'bg-action-blue text-white' : 'bg-gray-200 text-text-secondary'
                      }`}
                    >
                      {t.count}
                    </span>
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-text-secondary" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar estudante ou curso"
                  className="w-[220px] rounded-input border-0 bg-bg-input py-1.5 pl-8 pr-3 text-[13px] focus:outline-none focus:ring-2 focus:ring-action-blue"
                />
              </div>
            </div>

            <div>
              {filtered.length === 0 && (
                <div className="px-[22px] py-10 text-center text-[13.5px] text-text-secondary">
                  Nada por aqui. Ajuste a busca ou volte mais tarde.
                </div>
              )}
              {filtered.map((r, idx) => {
                const isSel = r.id === selectedId;
                return (
                  <div
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className={`flex cursor-pointer items-center gap-3.5 border-l-[3px] px-[22px] py-3.5 ${
                      isSel ? 'border-action-blue bg-action-blue/5' : 'border-transparent'
                    } ${idx === filtered.length - 1 ? '' : 'border-b border-b-gray-200'}`}
                  >
                    <div
                      className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-pill text-[12.5px] font-bold text-white ${
                        CATEGORY_CLASSES[r.category] || 'bg-[#B9C2D0]'
                      }`}
                    >
                      {r.student.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13.5px] font-bold">{r.student}</div>
                      <div className="truncate text-xs text-text-secondary">
                        {r.course} · {r.category}
                      </div>
                    </div>
                    <div className="w-10 text-right text-[13px] font-bold">{r.hours}h</div>
                    <div className="w-20 text-xs text-text-table-head">{r.submitted}</div>
                    <div className="w-[100px] text-right">
                      <StatusChip status={r.status} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspector card */}
          {selected && (
            <div className="h-fit rounded-card bg-white p-6 shadow-card">
              <div className="mb-1 flex items-start justify-between">
                <div>
                  <div className="mb-1 text-xs text-text-secondary">
                    {selected.id} · RA {selected.ra}
                  </div>
                  <div className="text-[19px] font-display font-extrabold">{selected.student}</div>
                </div>
                <StatusChip status={selected.status} />
              </div>

              <div className="my-5 grid grid-cols-2 gap-4">
                {[
                  ['Curso', selected.course],
                  ['Categoria', selected.category],
                  ['Carga horária', `${selected.hours}h`],
                  ['Enviado em', selected.submitted],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="mb-0.5 text-[11.5px] text-text-secondary">{label}</div>
                    <div className="text-[13.5px] font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mb-1.5 text-[11.5px] text-text-secondary">Observação do registro</div>
              <div className="mb-[22px] rounded-input border border-gray-200 bg-bg-input p-3.5 text-[13.5px] leading-relaxed text-text-heading">
                {selected.note}
              </div>

              {selected.status === 'pending' ? (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => decide(selected.id, 'approved')}
                    className="flex min-h-touch items-center justify-center gap-2 rounded-btn bg-action-blue text-[13.5px] font-bold text-white transition-colors hover:bg-action-blue-dark"
                  >
                    <Check size={15} /> Validar horas
                  </button>
                  <button
                    onClick={() => decide(selected.id, 'rejected')}
                    className="flex min-h-touch items-center justify-center gap-2 rounded-btn bg-status-red text-[13.5px] font-bold text-status-red-text"
                  >
                    <X size={15} /> Rejeitar
                  </button>
                </div>
              ) : (
                <div
                  className={`flex items-center gap-2 text-[13px] font-semibold ${
                    selected.status === 'approved' ? 'text-status-green-text' : 'text-status-red-text'
                  }`}
                >
                  {selected.status === 'approved' ? <Check size={15} /> : <X size={15} />}
                  {selected.status === 'approved' ? 'Já consta na carteira do estudante.' : 'O estudante foi notificado da rejeição.'}
                </div>
              )}
              <a
                href="#"
                className="mt-4 flex items-center gap-1 text-[12.5px] font-semibold text-action-blue hover:text-action-blue-dark"
              >
                Ver certificado original <ArrowUpRight size={13} />
              </a>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
