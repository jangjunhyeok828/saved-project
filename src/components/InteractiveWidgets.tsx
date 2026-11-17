import React, { useEffect, useState } from 'react';
import {
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Plus,
  RotateCcw,
  Trash2,
} from 'lucide-react';
import {
  SECTION_2,
  SECTION_3,
  SECTION_5,
  STEP_ITEMS,
} from '../content';
import type {
  CompanyAnalysisState,
  ExperienceMatrixState,
  QuestionBreakdownState,
} from '../hooks/usePersistentState';

/* 1. Section Core Callout Box */
export function SectionCoreBox({ text }: { text: string }) {
  return (
    <div className="mb-6 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-xs font-semibold tracking-wide text-blue-900 dark:text-blue-400">
        이 섹션의 핵심
      </p>
      <p className="mt-1 text-base font-medium leading-[1.75] text-slate-900 dark:text-slate-100">
        {text}
      </p>
    </div>
  );
}

/* 2. 5-Step Progress Stepper */
export function StepProgressStepper({
  completedSteps,
  activeSectionId,
}: {
  completedSteps: number[];
  activeSectionId: string;
}) {
  const completedCount = completedSteps.length;

  const scrollToStep = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className="no-print mb-10 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/70"
      aria-label="자소서 작성 5단계 진행 스테퍼"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
          실전 작성 5단계 스테퍼
        </span>
        <span className="text-sm font-medium text-blue-900 tabular-nums dark:text-blue-400">
          5단계 중 {completedCount}단계 완료
        </span>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
        {STEP_ITEMS.map((item) => {
          const isDone = completedSteps.includes(item.step);
          const isCurrent = activeSectionId === item.sectionId;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => scrollToStep(item.sectionId)}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex min-h-[44px] items-center justify-between gap-2 rounded-md border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-blue-400 ${
                isDone
                  ? 'border-blue-900 bg-blue-900 text-white dark:border-blue-500 dark:bg-blue-600'
                  : isCurrent
                    ? 'border-blue-900 bg-white text-blue-900 dark:border-blue-400 dark:bg-slate-950 dark:text-blue-300'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <span className="truncate font-medium">
                <span className="tabular-nums">{item.step}.</span> {item.title}
              </span>
              {isDone && (
                <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* 3. Per-Step Completion Toggle Button */
export function StepCompletionButton({
  step,
  title,
  isCompleted,
  onToggle,
}: {
  step: number;
  title: string;
  isCompleted: boolean;
  onToggle: (step: number) => void;
}) {
  return (
    <div className="no-print mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
      <p className="text-sm text-slate-600 dark:text-slate-400">
        {isCompleted
          ? `${step}단계 (${title})를 완료했습니다.`
          : `${step}단계 내용을 확인했다면 완료로 표시해 두세요.`}
      </p>
      <button
        type="button"
        onClick={() => onToggle(step)}
        aria-pressed={isCompleted}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-blue-400 ${
          isCompleted
            ? 'border-blue-900 bg-blue-900 text-white hover:bg-blue-800 dark:border-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500'
            : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800'
        }`}
      >
        <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{isCompleted ? '단계 완료됨' : '이 단계 완료'}</span>
      </button>
    </div>
  );
}

/* 4. Step 1 Worksheet: Question Breakdown Table */
export function QuestionBreakdownWorksheet({
  value,
  onChange,
}: {
  value: QuestionBreakdownState;
  onChange: (next: QuestionBreakdownState) => void;
}) {
  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {SECTION_2.worksheetTitle}
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          입력 내용은 브라우저에 자동 저장됩니다
        </span>
      </div>

      <div className="mb-4">
        <label
          htmlFor="ws-question-prompt"
          className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-slate-200"
        >
          {SECTION_2.worksheetQuestionLabel}
        </label>
        <textarea
          id="ws-question-prompt"
          rows={2}
          value={value.question}
          onChange={(e) => onChange({ ...value, question: e.target.value })}
          placeholder={SECTION_2.worksheetQuestionPlaceholder}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400"
        />
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <th className="w-36 px-3.5 py-2.5 font-semibold text-slate-800 dark:text-slate-200">
                분해 항목
              </th>
              <th className="px-3.5 py-2.5 font-semibold text-slate-800 dark:text-slate-200">
                내 문항 분석
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {SECTION_2.worksheetFields.map((field) => (
              <tr key={field.key}>
                <td className="px-3.5 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                  <label htmlFor={`ws-q-${field.key}`}>{field.label}</label>
                </td>
                <td className="px-3.5 py-2.5">
                  <input
                    id={`ws-q-${field.key}`}
                    type="text"
                    value={value[field.key]}
                    onChange={(e) =>
                      onChange({ ...value, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="min-h-[40px] w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 5. Step 2 Worksheet: Company & Job One-Page Summary */
export function CompanyAnalysisWorksheet({
  value,
  onChange,
}: {
  value: CompanyAnalysisState;
  onChange: (next: CompanyAnalysisState) => void;
}) {
  return (
    <div className="mt-6">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          {SECTION_3.summaryTableTitle}
        </p>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          자동 저장됨
        </span>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <table className="w-full min-w-[500px] border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <th className="w-56 px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                {SECTION_3.summaryTableColumns[0]}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                {SECTION_3.summaryTableColumns[1]}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {SECTION_3.summaryFields.map((field) => (
              <tr key={field.key}>
                <td className="px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                  <label htmlFor={`ws-company-${field.key}`}>
                    {field.label}
                  </label>
                </td>
                <td className="px-4 py-2.5">
                  <textarea
                    id={`ws-company-${field.key}`}
                    rows={2}
                    value={value[field.key]}
                    onChange={(e) =>
                      onChange({ ...value, [field.key]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="w-full rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 sm:text-base dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-blue-400 dark:focus:bg-slate-950"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 6. Step 3 Worksheet: Experience × Competency Matrix */
export function ExperienceMatrixWorksheet({
  value,
  onChange,
}: {
  value: ExperienceMatrixState;
  onChange: (next: ExperienceMatrixState) => void;
}) {
  const handleCompetencyChange = (colIdx: number, text: string) => {
    const nextCols = value.competencies.map((c, idx) =>
      idx === colIdx ? text : c
    );
    onChange({ ...value, competencies: nextCols });
  };

  const handleRowNameChange = (rowId: string, text: string) => {
    const nextRows = value.rows.map((row) =>
      row.id === rowId ? { ...row, name: text } : row
    );
    onChange({ ...value, rows: nextRows });
  };

  const handleToggleCell = (rowId: string, colIdx: number) => {
    const nextRows = value.rows.map((row) => {
      if (row.id !== rowId) return row;
      const nextChecks = row.checks.map((checked, idx) =>
        idx === colIdx ? !checked : checked
      );
      return { ...row, checks: nextChecks };
    });
    onChange({ ...value, rows: nextRows });
  };

  const handleAddRow = () => {
    const nextNum = value.rows.length + 1;
    const newRow = {
      id: `exp-${Date.now()}-${nextNum}`,
      name: `경험 ${nextNum}`,
      checks: [false, false, false, false],
    };
    onChange({ ...value, rows: [...value.rows, newRow] });
  };

  const handleRemoveRow = (rowId: string) => {
    if (value.rows.length <= 1) return;
    onChange({
      ...value,
      rows: value.rows.filter((row) => row.id !== rowId),
    });
  };

  return (
    <div className="mt-4">
      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <table className="w-full min-w-[580px] border-collapse text-left text-sm sm:text-base">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
              <th className="w-44 px-3 py-2.5 font-semibold text-slate-800 dark:text-slate-200">
                내 경험
              </th>
              {value.competencies.map((comp, colIdx) => (
                <th key={colIdx} className="px-2 py-2">
                  <input
                    type="text"
                    value={comp}
                    onChange={(e) =>
                      handleCompetencyChange(colIdx, e.target.value)
                    }
                    aria-label={`요구 역량 ${colIdx + 1} 이름`}
                    placeholder={`역량 ${colIdx + 1}`}
                    className="min-h-[38px] w-full rounded border border-slate-200 bg-white px-2.5 py-1 text-center text-sm font-semibold text-slate-900 focus:border-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-400"
                  />
                </th>
              ))}
              <th className="w-16 px-2 py-2.5 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                합계
              </th>
              <th className="no-print w-12 px-2 py-2.5 text-center text-xs font-semibold text-slate-500 dark:text-slate-400">
                삭제
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {value.rows.map((row, rowIdx) => {
              const count = row.checks.filter(Boolean).length;
              return (
                <tr key={row.id}>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        handleRowNameChange(row.id, e.target.value)
                      }
                      aria-label={`경험 ${rowIdx + 1} 이름`}
                      placeholder={`경험 ${rowIdx + 1}`}
                      className="min-h-[40px] w-full rounded border border-slate-200 bg-slate-50/60 px-2.5 py-1.5 text-sm font-medium text-slate-900 focus:border-blue-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-400 dark:focus:bg-slate-950"
                    />
                  </td>
                  {row.checks.map((checked, colIdx) => {
                    const compLabel =
                      value.competencies[colIdx] || `역량 ${colIdx + 1}`;
                    const expLabel = row.name || `경험 ${rowIdx + 1}`;
                    return (
                      <td key={colIdx} className="px-2 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleCell(row.id, colIdx)}
                          aria-pressed={checked}
                          aria-label={`${expLabel} - ${compLabel} ${
                            checked ? '선택됨 (해제하려면 누르세요)' : '선택 안 됨 (○ 표시하려면 누르세요)'
                          }`}
                          className={`inline-flex h-11 w-full min-w-[44px] items-center justify-center rounded-md border text-lg font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:focus-visible:outline-blue-400 ${
                            checked
                              ? 'border-blue-900 bg-blue-900/10 text-blue-900 dark:border-blue-400 dark:bg-blue-400/15 dark:text-blue-300'
                              : 'border-slate-200 bg-white text-slate-300 hover:border-slate-300 hover:text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-700 dark:hover:border-slate-700 dark:hover:text-slate-500'
                          }`}
                        >
                          {checked ? '○' : '·'}
                        </button>
                      </td>
                    );
                  })}
                  <td className="px-2 py-2 text-center text-sm font-semibold text-slate-700 tabular-nums dark:text-slate-300">
                    {count}
                  </td>
                  <td className="no-print px-2 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.id)}
                      disabled={value.rows.length <= 1}
                      aria-label={`${row.name || `경험 ${rowIdx + 1}`} 행 삭제`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="no-print mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          칸을 누르면 ○ 표시가 켜지거나 꺼집니다. 열 제목(역량)과 행 이름(경험)을 직접 수정할 수 있습니다.
        </p>
        <button
          type="button"
          onClick={handleAddRow}
          className="inline-flex min-h-[40px] shrink-0 items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 whitespace-nowrap transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span>경험 추가</span>
        </button>
      </div>
    </div>
  );
}

/* 7. Interactive Checklist (Material Inspection & Pre-Submission) */
export function InteractiveChecklist({
  idPrefix,
  items,
  checkedState,
  onToggle,
  onClearAll,
}: {
  idPrefix: string;
  items: string[];
  checkedState: boolean[];
  onToggle: (index: number) => void;
  onClearAll: () => void;
}) {
  const completedCount = checkedState.filter(Boolean).length;
  const totalCount = items.length;

  return (
    <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <span className="text-sm font-semibold text-blue-900 tabular-nums dark:text-blue-400">
          {totalCount}개 중 {completedCount}개 완료
        </span>
        <button
          type="button"
          onClick={onClearAll}
          disabled={completedCount === 0}
          className="no-print inline-flex min-h-[36px] items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 whitespace-nowrap transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>모두 지우기</span>
        </button>
      </div>

      <ul className="space-y-2">
        {items.map((label, idx) => {
          const checked = Boolean(checkedState[idx]);
          const inputId = `${idPrefix}-${idx}`;
          return (
            <li key={inputId}>
              <label
                htmlFor={inputId}
                className={`flex min-h-[44px] cursor-pointer items-start gap-3 rounded-md border px-3.5 py-2.5 transition-colors ${
                  checked
                    ? 'border-blue-900/30 bg-white text-slate-900 dark:border-blue-500/40 dark:bg-slate-950 dark:text-slate-100'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <input
                  id={inputId}
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(idx)}
                  className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-300 accent-blue-900 dark:border-slate-600 dark:accent-blue-500"
                />
                <span
                  className={`text-base leading-relaxed ${
                    checked
                      ? 'text-slate-900 dark:text-slate-100'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* 8. Before / After Comparison Tabs */
export function BeforeAfterComparison({
  activeTab,
  onTabChange,
}: {
  activeTab: 'before' | 'after';
  onTabChange: (tab: 'before' | 'after') => void;
}) {
  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {SECTION_5.comparisonTitle}
        </h3>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {SECTION_5.comparisonBadge}
        </span>
      </div>

      <div
        role="tablist"
        aria-label="고치기 전후 예시 비교"
        className="no-print mb-4 inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900"
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'before'}
          onClick={() => onTabChange('before')}
          className={`min-h-[40px] rounded-md px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
            activeTab === 'before'
              ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-800 dark:text-slate-100'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          {SECTION_5.beforeLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === 'after'}
          onClick={() => onTabChange('after')}
          className={`min-h-[40px] rounded-md px-4 py-1.5 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
            activeTab === 'after'
              ? 'bg-blue-900 text-white dark:bg-blue-600'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          {SECTION_5.afterLabel}
        </button>
      </div>

      {/* Screen view (tabbed) */}
      <div className="rounded-md border border-slate-200 bg-white p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950">
        {activeTab === 'before' ? (
          <div role="tabpanel" aria-label={SECTION_5.beforeLabel}>
            <p className="mb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              {SECTION_5.beforeLabel}
            </p>
            <p className="text-base leading-[1.75] text-slate-700 dark:text-slate-300">
              {SECTION_5.beforeText}
            </p>
          </div>
        ) : (
          <div role="tabpanel" aria-label={SECTION_5.afterLabel}>
            <p className="mb-2 text-xs font-semibold text-blue-900 dark:text-blue-400">
              {SECTION_5.afterLabel}
            </p>
            <p className="mb-2 text-base font-bold text-slate-900 dark:text-slate-100">
              {SECTION_5.afterHeadline}
            </p>
            <p className="text-base leading-[1.75] text-slate-800 dark:text-slate-200">
              {SECTION_5.afterText}
            </p>
          </div>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
        <strong className="font-semibold text-slate-900 dark:text-slate-100">
          {SECTION_5.comparisonDiffLabel}
        </strong>{' '}
        {SECTION_5.comparisonDiff}
      </p>
    </div>
  );
}

/* 9. Collapsible Evidence Disclosure */
export function CollapsibleEvidence({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="no-print inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        <span>{label}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
      </button>

      {open && (
        <div className="mt-2.5 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-[1.75] text-slate-700 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
          {children}
        </div>
      )}
    </div>
  );
}

/* 10. Prompt Code Block with Copy Button */
export function PromptCopyBlock({
  title,
  subtitle,
  code,
}: {
  title: string;
  subtitle?: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="print-break-inside-avoid mt-5 overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-100/80 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base dark:text-slate-100">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`${title} 프롬프트 복사`}
          className={`no-print inline-flex min-h-[36px] items-center gap-1.5 rounded-md border px-3 py-1 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 ${
            copied
              ? 'border-blue-900 bg-blue-900 text-white dark:border-blue-500 dark:bg-blue-600'
              : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-800'
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>복사됨</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>복사</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-slate-800 whitespace-pre-wrap break-words dark:text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* 11. Workbook Persistence Status & Reset Control */
export function WorkbookStorageControl({
  storageAvailable,
  updatedAt,
  hasData,
  onReset,
}: {
  storageAvailable: boolean;
  updatedAt: string | null;
  hasData: boolean;
  onReset: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  const formattedTime = updatedAt
    ? new Date(updatedAt).toLocaleString('ko-KR', {
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  return (
    <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
      <p>
        {!storageAvailable
          ? '브라우저 저장소를 사용할 수 없어 새로고침 시 초기화됩니다.'
          : formattedTime
            ? `브라우저에 자동 저장됨 (${formattedTime})`
            : '입력과 체크 상태는 브라우저에 자동 저장됩니다.'}
      </p>

      {hasData && !confirming && (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="inline-flex min-h-[34px] items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:text-slate-200"
        >
          <RotateCcw className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>저장된 작업 초기화</span>
        </button>
      )}

      {hasData && confirming && (
        <div
          role="group"
          aria-label="저장된 작업 초기화 확인"
          className="rounded-md border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-900"
        >
          <p className="mb-2 text-xs font-medium text-slate-800 dark:text-slate-200">
            저장된 워크시트와 체크리스트를 모두 지울까요?
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onReset();
                setConfirming(false);
              }}
              className="min-h-[32px] rounded border border-red-700 bg-red-700 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-800 dark:border-red-600 dark:bg-red-600 dark:hover:bg-red-500"
            >
              초기화
            </button>
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="min-h-[32px] rounded border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* 12. Auto-Save Bottom Toast Notification */
export function AutoSaveToast({ saveSuccessTick }: { saveSuccessTick: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (saveSuccessTick <= 0) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, [saveSuccessTick]);

  return (
    <div
      className="no-print pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        aria-hidden={!visible}
        className={`inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white/95 px-3.5 py-2 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-xs transition-[opacity,transform] duration-200 ease-out motion-reduce:transition-none dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 ${
          visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-2 opacity-0'
        }`}
      >
        <Check
          className="h-4 w-4 shrink-0 text-blue-900 dark:text-blue-400"
          aria-hidden="true"
        />
        <span>자동 저장됨</span>
      </div>
    </div>
  );
}

