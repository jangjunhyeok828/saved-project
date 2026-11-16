import { useCallback, useEffect, useRef, useState } from 'react';
import {
  SECTION_2,
  SECTION_3,
  SECTION_4,
  SECTION_11,
  STEP_ITEMS,
} from '../content';

export interface QuestionBreakdownState {
  question: string;
  competency: string;
  elements: string;
  keywords: string;
  constraints: string;
}

export interface CompanyAnalysisState {
  competencies: string;
  dailyTasks: string;
  recentIssues: string;
  myRole: string;
}

export interface ExperienceMatrixRow {
  id: string;
  name: string;
  checks: boolean[];
}

export interface ExperienceMatrixState {
  competencies: string[];
  rows: ExperienceMatrixRow[];
}

export interface UiPreferencesState {
  beforeAfterTab: 'before' | 'after';
  showRulesBasis: boolean;
}

export interface GuideWorkbookState {
  completedSteps: number[];
  questionBreakdown: QuestionBreakdownState;
  companyAnalysis: CompanyAnalysisState;
  experienceMatrix: ExperienceMatrixState;
  materialChecklist: boolean[];
  finalChecklist: boolean[];
  uiPreferences: UiPreferencesState;
  updatedAt: string | null;
}

export const STORAGE_KEY = 'jasoseo_guide_workbook_v1';

export const DEFAULT_WORKBOOK_STATE: GuideWorkbookState = {
  completedSteps: [],
  questionBreakdown: {
    question: '',
    competency: '',
    elements: '',
    keywords: '',
    constraints: '',
  },
  companyAnalysis: {
    competencies: '',
    dailyTasks: '',
    recentIssues: '',
    myRole: '',
  },
  experienceMatrix: {
    competencies: ['역량 A', '역량 B', '역량 C', '역량 D'],
    rows: [
      { id: 'exp-1', name: '경험 1', checks: [false, false, false, false] },
      { id: 'exp-2', name: '경험 2', checks: [false, false, false, false] },
      { id: 'exp-3', name: '경험 3', checks: [false, false, false, false] },
    ],
  },
  materialChecklist: SECTION_4.materialChecklist.map(() => false),
  finalChecklist: SECTION_11.items.map(() => false),
  uiPreferences: {
    beforeAfterTab: 'after',
    showRulesBasis: false,
  },
  updatedAt: null,
};

function sanitizeWorkbookState(raw: string | null): GuideWorkbookState {
  if (!raw) return DEFAULT_WORKBOOK_STATE;
  try {
    const parsed = JSON.parse(raw) as Partial<GuideWorkbookState>;
    if (!parsed || typeof parsed !== 'object') {
      return DEFAULT_WORKBOOK_STATE;
    }

    const competencies =
      Array.isArray(parsed.experienceMatrix?.competencies) &&
      parsed.experienceMatrix!.competencies.length === 4
        ? parsed.experienceMatrix!.competencies.map((c) => String(c ?? ''))
        : DEFAULT_WORKBOOK_STATE.experienceMatrix.competencies;

    const rows =
      Array.isArray(parsed.experienceMatrix?.rows) &&
      parsed.experienceMatrix!.rows.length > 0
        ? parsed.experienceMatrix!.rows.map((row, idx) => ({
            id: typeof row?.id === 'string' && row.id ? row.id : `exp-${idx + 1}`,
            name: typeof row?.name === 'string' ? row.name : `경험 ${idx + 1}`,
            checks: Array.from({ length: 4 }, (_, colIdx) =>
              Boolean(row?.checks?.[colIdx])
            ),
          }))
        : DEFAULT_WORKBOOK_STATE.experienceMatrix.rows;

    return {
      completedSteps: Array.isArray(parsed.completedSteps)
        ? Array.from(
            new Set(
              parsed.completedSteps.filter(
                (n): n is number => typeof n === 'number' && n >= 1 && n <= 5
              )
            )
          ).sort((a, b) => a - b)
        : [],
      questionBreakdown: {
        question: String(parsed.questionBreakdown?.question ?? ''),
        competency: String(parsed.questionBreakdown?.competency ?? ''),
        elements: String(parsed.questionBreakdown?.elements ?? ''),
        keywords: String(parsed.questionBreakdown?.keywords ?? ''),
        constraints: String(parsed.questionBreakdown?.constraints ?? ''),
      },
      companyAnalysis: {
        competencies: String(parsed.companyAnalysis?.competencies ?? ''),
        dailyTasks: String(parsed.companyAnalysis?.dailyTasks ?? ''),
        recentIssues: String(parsed.companyAnalysis?.recentIssues ?? ''),
        myRole: String(parsed.companyAnalysis?.myRole ?? ''),
      },
      experienceMatrix: {
        competencies,
        rows,
      },
      materialChecklist: SECTION_4.materialChecklist.map((_, idx) =>
        Boolean(parsed.materialChecklist?.[idx])
      ),
      finalChecklist: SECTION_11.items.map((_, idx) =>
        Boolean(parsed.finalChecklist?.[idx])
      ),
      uiPreferences: {
        beforeAfterTab:
          parsed.uiPreferences?.beforeAfterTab === 'before' ? 'before' : 'after',
        showRulesBasis: Boolean(parsed.uiPreferences?.showRulesBasis),
      },
      updatedAt:
        typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    return DEFAULT_WORKBOOK_STATE;
  }
}

function testStorageAvailability(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const probeKey = '__jasoseo_storage_probe__';
    window.localStorage.setItem(probeKey, '1');
    window.localStorage.removeItem(probeKey);
    return true;
  } catch {
    return false;
  }
}

function safeReadStorage(): GuideWorkbookState {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return DEFAULT_WORKBOOK_STATE;
    }
    return sanitizeWorkbookState(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_WORKBOOK_STATE;
  }
}

function safeWriteStorage(state: GuideWorkbookState): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

function safeRemoveStorage(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    window.localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function hasSavedProgress(state: GuideWorkbookState): boolean {
  if (state.completedSteps.length > 0) return true;
  if (Object.values(state.questionBreakdown).some((v) => v.trim().length > 0)) {
    return true;
  }
  if (Object.values(state.companyAnalysis).some((v) => v.trim().length > 0)) {
    return true;
  }
  if (state.materialChecklist.some(Boolean)) return true;
  if (state.finalChecklist.some(Boolean)) return true;
  if (
    state.experienceMatrix.rows.length !==
      DEFAULT_WORKBOOK_STATE.experienceMatrix.rows.length ||
    state.experienceMatrix.rows.some(
      (r, idx) =>
        r.name !== `경험 ${idx + 1}` || r.checks.some(Boolean)
    ) ||
    state.experienceMatrix.competencies.some(
      (c, idx) => c !== DEFAULT_WORKBOOK_STATE.experienceMatrix.competencies[idx]
    )
  ) {
    return true;
  }
  return false;
}

export function useWorkbookState() {
  const [state, setState] = useState<GuideWorkbookState>(() => safeReadStorage());
  const [storageAvailable, setStorageAvailable] = useState<boolean>(() =>
    testStorageAvailability()
  );
  const latestStateRef = useRef<GuideWorkbookState>(state);
  const hasInteractedRef = useRef<boolean>(false);

  useEffect(() => {
    latestStateRef.current = state;
  }, [state]);

  const updateState = useCallback(
    (updater: (prev: GuideWorkbookState) => GuideWorkbookState) => {
      hasInteractedRef.current = true;
      setState((prev) => {
        const nextRaw = updater(prev);
        const next: GuideWorkbookState = {
          ...nextRaw,
          updatedAt: new Date().toISOString(),
        };
        latestStateRef.current = next;
        const ok = safeWriteStorage(next);
        setStorageAvailable(ok);
        return next;
      });
    },
    []
  );

  const resetWorkbook = useCallback(() => {
    hasInteractedRef.current = false;
    const fresh: GuideWorkbookState = {
      ...DEFAULT_WORKBOOK_STATE,
      experienceMatrix: {
        competencies: [...DEFAULT_WORKBOOK_STATE.experienceMatrix.competencies],
        rows: DEFAULT_WORKBOOK_STATE.experienceMatrix.rows.map((r) => ({
          ...r,
          checks: [...r.checks],
        })),
      },
      materialChecklist: [...DEFAULT_WORKBOOK_STATE.materialChecklist],
      finalChecklist: [...DEFAULT_WORKBOOK_STATE.finalChecklist],
      uiPreferences: { ...DEFAULT_WORKBOOK_STATE.uiPreferences },
      updatedAt: null,
    };
    latestStateRef.current = fresh;
    safeRemoveStorage();
    setState(fresh);
    setStorageAvailable(testStorageAvailability());
  }, []);

  // Flush latest state on page hide / tab switch / browser close
  useEffect(() => {
    const flushToStorage = () => {
      if (!hasInteractedRef.current && !latestStateRef.current.updatedAt) {
        return;
      }
      safeWriteStorage(latestStateRef.current);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushToStorage();
      }
    };

    window.addEventListener('pagehide', flushToStorage);
    window.addEventListener('beforeunload', flushToStorage);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('pagehide', flushToStorage);
      window.removeEventListener('beforeunload', flushToStorage);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Synchronize state when modified in another browser tab
  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) return;
      const synced = sanitizeWorkbookState(event.newValue);
      latestStateRef.current = synced;
      setState(synced);
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  return { state, updateState, resetWorkbook, storageAvailable };
}

export function buildExportText(state: GuideWorkbookState): string {
  const lines: string[] = [];
  lines.push('==================================================');
  lines.push('자소서 작성 가이드북 — 내 작업 정리');
  lines.push(`내보낸 시각: ${new Date().toLocaleString('ko-KR')}`);
  lines.push('==================================================');
  lines.push('');

  lines.push('[1~5단계 진행 현황]');
  STEP_ITEMS.forEach((item) => {
    const done = state.completedSteps.includes(item.step);
    lines.push(`- ${item.step}단계 (${item.title}): ${done ? '완료' : '진행 전'}`);
  });
  lines.push('');

  lines.push('[1단계 · 문항 해석]');
  lines.push(
    `- 지원 문항: ${state.questionBreakdown.question.trim() || '(미입력)'}`
  );
  SECTION_2.worksheetFields.forEach((field) => {
    const val = state.questionBreakdown[field.key].trim() || '(미입력)';
    lines.push(`- ${field.label}: ${val}`);
  });
  lines.push('');

  lines.push('[2단계 · 직무·회사 분석 한 장 정리]');
  SECTION_3.summaryFields.forEach((field) => {
    const val = state.companyAnalysis[field.key].trim() || '(미입력)';
    lines.push(`- ${field.label}: ${val}`);
  });
  lines.push('');

  lines.push('[3단계 · 경험 × 역량 매트릭스]');
  const header = ['내 경험', ...state.experienceMatrix.competencies].join(' | ');
  lines.push(header);
  state.experienceMatrix.rows.forEach((row) => {
    const cells = row.checks.map((c) => (c ? '○' : '·'));
    lines.push([row.name || '(이름 없음)', ...cells].join(' | '));
  });
  lines.push('');

  lines.push('[3단계 · 고른 소재 점검]');
  SECTION_4.materialChecklist.forEach((item, idx) => {
    const checked = state.materialChecklist[idx];
    lines.push(`[${checked ? 'v' : ' '}] ${item}`);
  });
  lines.push('');

  lines.push('[11. 제출 전 체크리스트]');
  SECTION_11.items.forEach((item, idx) => {
    const checked = state.finalChecklist[idx];
    lines.push(`[${checked ? 'v' : ' '}] ${item}`);
  });

  return lines.join('\n');
}

export function downloadWorkbookTxt(state: GuideWorkbookState): void {
  try {
    const text = buildExportText(state);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    anchor.href = url;
    anchor.download = `jasoseo-workbook-${dateStamp}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  } catch {
    // Graceful fallback if download fails
  }
}
