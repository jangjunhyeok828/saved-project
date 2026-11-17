import React, { useEffect, useState } from 'react';
import {
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Menu,
  Printer,
  X,
} from 'lucide-react';
import {
  SECTION_0,
  SECTION_1,
  SECTION_2,
  SECTION_3,
  SECTION_4,
  SECTION_5,
  SECTION_6,
  SECTION_7,
  SECTION_8,
  SECTION_9,
  SECTION_10,
  SECTION_11,
  SECTION_12,
  SITE_META,
  TOC_ITEMS,
} from './content';
import {
  downloadWorkbookTxt,
  hasSavedProgress,
  useWorkbookState,
} from './hooks/usePersistentState';
import {
  AutoSaveToast,
  BeforeAfterComparison,
  CollapsibleEvidence,
  CompanyAnalysisWorksheet,
  ExperienceMatrixWorksheet,
  InteractiveChecklist,
  PromptCopyBlock,
  QuestionBreakdownWorksheet,
  SectionCoreBox,
  StepCompletionButton,
  StepProgressStepper,
  WorkbookStorageControl,
} from './components/InteractiveWidgets';

function renderWhereWithLinks(
  text: string,
  links: { label: string; url: string }[]
) {
  if (!links.length) return text;
  const target = links[0];
  const parts = text.split(target.label);
  if (parts.length !== 2) return text;
  return (
    <>
      {parts[0]}
      <a
        href={target.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-0.5 font-medium text-blue-900 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
      >
        <span>{target.label}</span>
        <ExternalLink className="inline h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </a>
      {parts[1]}
    </>
  );
}

export default function App() {
  const {
    state,
    updateState,
    resetWorkbook,
    storageAvailable,
    saveSuccessTick,
  } = useWorkbookState();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSectionId, setActiveSectionId] = useState<string>('section-0');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const showRulesBasis = state.uiPreferences.showRulesBasis;
  const hasSavedData = hasSavedProgress(state);

  // Track scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const ratio = Math.min(1, Math.max(0, scrollTop / docHeight));
      setScrollProgress(ratio);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Track active section in TOC via IntersectionObserver
  useEffect(() => {
    const sectionIds = TOC_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) {
          setActiveSectionId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0,
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleToggleStep = (step: number) => {
    updateState((prev) => {
      const exists = prev.completedSteps.includes(step);
      const nextSteps = exists
        ? prev.completedSteps.filter((s) => s !== step)
        : [...prev.completedSteps, step].sort((a, b) => a - b);
      return { ...prev, completedSteps: nextSteps };
    });
  };

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    downloadWorkbookTxt(state);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 dark:bg-slate-950 dark:text-slate-200">
      {/* Top Scroll Progress Bar */}
      <div
        className="no-print fixed top-0 right-0 left-0 z-50 h-1 bg-slate-100 dark:bg-slate-900"
        role="progressbar"
        aria-label="페이지 읽기 진행률"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
      >
        <div
          className="h-full w-full origin-left bg-blue-900 transition-transform duration-150 ease-out dark:bg-blue-500"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Mobile Top Sticky Navigation Bar */}
      <header className="no-print sticky top-1 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs lg:hidden dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4">
          <a
            href="#section-0"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('section-0');
            }}
            className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 dark:text-slate-100"
          >
            {SITE_META.title}
          </a>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleExport}
              aria-label="내 작업 내보내기 (.txt)"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 whitespace-nowrap hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span>내보내기</span>
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-toc-menu"
              aria-label={mobileMenuOpen ? '목차 닫기' : '목차 열기'}
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-900 whitespace-nowrap hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Menu className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              <span>목차</span>
            </button>
          </div>
        </div>

        {/* Mobile Expandable TOC Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-toc-menu"
            aria-label="모바일 목차 내비게이션"
            className="max-h-[70vh] overflow-y-auto border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950"
          >
            <ul className="space-y-1">
              {TOC_ITEMS.map((item) => {
                const isActive = activeSectionId === item.id;
                const stepDone =
                  item.step !== undefined &&
                  state.completedSteps.includes(item.step);
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      className={`flex min-h-[44px] items-center justify-between rounded-md px-3 py-2 text-sm transition-colors ${
                        isActive
                          ? 'bg-slate-100 font-semibold text-blue-900 dark:bg-slate-900 dark:text-blue-400'
                          : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-900/50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {stepDone && (
                        <span className="text-xs font-medium text-blue-900 dark:text-blue-400">
                          완료
                        </span>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-3 space-y-3 border-t border-slate-200 pt-3 dark:border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handlePrint();
                  }}
                  className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                >
                  <Printer className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>인쇄하기</span>
                </button>
              </div>
              <WorkbookStorageControl
                storageAvailable={storageAvailable}
                updatedAt={state.updatedAt}
                hasData={hasSavedData}
                onReset={resetWorkbook}
              />
            </div>
          </nav>
        )}
      </header>

      {/* Main Layout Container (Desktop Sidebar + Content Column) */}
      <div className="mx-auto flex max-w-6xl gap-10 px-4 pt-6 pb-20 sm:px-6 lg:px-8 lg:pt-12">
        {/* Desktop Left Fixed Sidebar TOC */}
        <aside
          className="no-print hidden w-64 shrink-0 lg:block"
          aria-label="목차 사이드바"
        >
          <div className="sticky top-8 flex max-h-[calc(100vh-4rem)] flex-col justify-between">
            <div className="overflow-y-auto pr-2">
              <p className="mb-3 px-2.5 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                목차
              </p>
              <nav aria-label="가이드북 목차">
                <ul className="space-y-0.5">
                  {TOC_ITEMS.map((item) => {
                    const isActive = activeSectionId === item.id;
                    const stepDone =
                      item.step !== undefined &&
                      state.completedSteps.includes(item.step);
                    return (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.id);
                          }}
                          className={`flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-sm leading-snug transition-colors ${
                            isActive
                              ? 'bg-slate-100 font-semibold text-blue-900 dark:bg-slate-900 dark:text-blue-400'
                              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900/60 dark:hover:text-slate-200'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          {stepDone && (
                            <span className="shrink-0 text-xs font-medium text-blue-900 dark:text-blue-400">
                              완료
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>

            <div className="mt-5 space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
              <button
                type="button"
                onClick={handleExport}
                className="flex min-h-[42px] w-full items-center justify-center gap-2 rounded-md border border-blue-900 bg-blue-900 px-3 py-2 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>내 작업 내보내기 (.txt)</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex min-h-[40px] w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 whitespace-nowrap transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900"
              >
                <Printer className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>인쇄하기</span>
              </button>
              <div className="pt-2">
                <WorkbookStorageControl
                  storageAvailable={storageAvailable}
                  updatedAt={state.updatedAt}
                  hasData={hasSavedData}
                  onReset={resetWorkbook}
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Column */}
        <main className="min-w-0 flex-1 max-w-3xl">
          {/* Hero & Section 0 */}
          <section
            id="section-0"
            className="scroll-mt-20 border-b border-slate-200 pb-10 dark:border-slate-800"
          >
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
              {SITE_META.title}
            </h1>

            <div className="mt-5">
              <h2 className="sr-only">{SECTION_0.heading}</h2>
              <p className="text-lg leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_0.summaryPrefix}
                <strong className="font-bold text-slate-900 dark:text-slate-100">
                  {SECTION_0.summaryBold}
                </strong>
                {SECTION_0.summarySuffix}
              </p>
            </div>

            <div className="no-print mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => handleNavClick('section-2')}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                <span>{SITE_META.heroCta}</span>
                <ArrowDown className="h-4 w-4 shrink-0" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 whitespace-nowrap transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>내 작업 내보내기 (.txt)</span>
              </button>
            </div>

            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/60">
              <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-slate-100">
                {SECTION_0.howToTitle}
              </h3>
              <ol className="list-decimal space-y-2 pl-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_0.howToSteps.map((stepText, idx) => (
                  <li key={idx}>{stepText}</li>
                ))}
              </ol>
            </div>
          </section>

          {/* Section 1: 평가자는 무엇을, 얼마나 읽나 */}
          <section
            id="section-1"
            className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_1.heading}
            </h2>
            <SectionCoreBox text={SECTION_1.core} />

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                    {SECTION_1.statsColumns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SECTION_1.statsRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                        {row.source}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                        {row.target}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 tabular-nums dark:text-slate-300">
                        {row.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8">
              <h3 className="mb-3 text-lg font-bold text-slate-900 dark:text-slate-100">
                {SECTION_1.principlesTitle}
              </h3>
              <ol className="list-decimal space-y-3 pl-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_1.principles.map((p, idx) => (
                  <li key={idx}>
                    <strong className="font-semibold text-slate-900 dark:text-slate-100">
                      {p.title}
                    </strong>{' '}
                    {p.body}
                  </li>
                ))}
              </ol>
            </div>

            <CollapsibleEvidence label={SECTION_1.evidenceNoteLabel}>
              <p>{SECTION_1.evidenceNote}</p>
              <ul className="mt-3 space-y-1.5 border-t border-slate-200 pt-3 dark:border-slate-800">
                {SECTION_1.statsRows.map((row, idx) => (
                  <li key={idx}>
                    <a
                      href={row.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-900 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span>{row.source}</span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </CollapsibleEvidence>
          </section>

          {/* Steps 1-5 Wrapper with 5-Step Progress Stepper */}
          <div className="pt-12">
            <StepProgressStepper
              completedSteps={state.completedSteps}
              activeSectionId={activeSectionId}
            />

            {/* Section 2: 1단계 · 문항 해석 */}
            <section
              id="section-2"
              className="scroll-mt-20 border-b border-slate-200 pb-12 dark:border-slate-800"
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {SECTION_2.heading}
              </h2>
              <SectionCoreBox text={SECTION_2.core} />

              <p className="text-base leading-[1.75] text-slate-800 dark:text-slate-200">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_2.exampleLabel}
                </strong>{' '}
                — {SECTION_2.exampleSource}
              </p>

              <blockquote className="my-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3.5 text-base leading-[1.75] text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200">
                {SECTION_2.examplePrompt}
              </blockquote>

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      {SECTION_2.exampleColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_2.exampleRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="w-36 px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                          {row.item}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.detail}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_2.tip1Prefix}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_2.tip1Bold1}
                </strong>
                {SECTION_2.tip1Mid}
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_2.tip1Bold2}
                </strong>
                {SECTION_2.tip1Suffix}
              </p>

              <p className="mt-3 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_2.tip2Bold}
                </strong>
                {SECTION_2.tip2Suffix}
              </p>

              <QuestionBreakdownWorksheet
                value={state.questionBreakdown}
                onChange={(next) =>
                  updateState((prev) => ({ ...prev, questionBreakdown: next }))
                }
              />

              <StepCompletionButton
                step={1}
                title="문항 해석"
                isCompleted={state.completedSteps.includes(1)}
                onToggle={handleToggleStep}
              />
            </section>

            {/* Section 3: 2단계 · 직무·회사 분석 */}
            <section
              id="section-3"
              className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {SECTION_3.heading}
              </h2>
              <SectionCoreBox text={SECTION_3.core} />

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[580px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      {SECTION_3.guideColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_3.guideRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="w-40 px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                          {row.what}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {renderWhereWithLinks(row.where, row.links)}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.how}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CompanyAnalysisWorksheet
                value={state.companyAnalysis}
                onChange={(next) =>
                  updateState((prev) => ({ ...prev, companyAnalysis: next }))
                }
              />

              <p className="mt-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_3.aiWarning}
              </p>

              <StepCompletionButton
                step={2}
                title="직무·회사 분석"
                isCompleted={state.completedSteps.includes(2)}
                onToggle={handleToggleStep}
              />
            </section>

            {/* Section 4: 3단계 · 소재 고르기 */}
            <section
              id="section-4"
              className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {SECTION_4.heading}
              </h2>
              <SectionCoreBox text={SECTION_4.core} />

              <div className="space-y-2">
                <p className="text-base leading-[1.75] text-slate-800 dark:text-slate-200">
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">
                    {SECTION_4.step1Title}
                  </strong>{' '}
                  — {SECTION_4.step1Desc}
                </p>
                <ul className="list-disc space-y-1.5 pl-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                  {SECTION_4.inventoryTypes.map((item, idx) => (
                    <li key={idx}>
                      <strong className="font-semibold text-slate-900 dark:text-slate-100">
                        {item.label}
                      </strong>{' '}
                      {item.desc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <p className="text-base leading-[1.75] text-slate-800 dark:text-slate-200">
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">
                    {SECTION_4.step2Title}
                  </strong>{' '}
                  — {SECTION_4.step2Desc}
                </p>

                <ExperienceMatrixWorksheet
                  value={state.experienceMatrix}
                  onChange={(next) =>
                    updateState((prev) => ({
                      ...prev,
                      experienceMatrix: next,
                    }))
                  }
                />

                <p className="mt-4 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                  {SECTION_4.matrixNote}
                </p>
              </div>

              <div className="mt-8">
                <p className="text-base leading-[1.75] text-slate-800 dark:text-slate-200">
                  <strong className="font-semibold text-slate-900 dark:text-slate-100">
                    {SECTION_4.step3Title}
                  </strong>{' '}
                  — {SECTION_4.step3Desc}
                </p>

                <InteractiveChecklist
                  idPrefix="material-check"
                  items={SECTION_4.materialChecklist}
                  checkedState={state.materialChecklist}
                  onToggle={(idx) =>
                    updateState((prev) => ({
                      ...prev,
                      materialChecklist: prev.materialChecklist.map((v, i) =>
                        i === idx ? !v : v
                      ),
                    }))
                  }
                  onClearAll={() =>
                    updateState((prev) => ({
                      ...prev,
                      materialChecklist: prev.materialChecklist.map(
                        () => false
                      ),
                    }))
                  }
                />
              </div>

              <StepCompletionButton
                step={3}
                title="소재 고르기"
                isCompleted={state.completedSteps.includes(3)}
                onToggle={handleToggleStep}
              />
            </section>

            {/* Section 5: 4단계 · 문단 구조 짜기 */}
            <section
              id="section-5"
              className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {SECTION_5.heading}
              </h2>
              <SectionCoreBox text={SECTION_5.core} />

              <h3 className="mb-3 text-base font-bold text-slate-900 dark:text-slate-100">
                {SECTION_5.frameTitle}
              </h3>

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      {SECTION_5.frameColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_5.frameRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="w-36 px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                          {row.order}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.content}
                        </td>
                        <td className="w-24 px-4 py-3 align-top text-slate-700 tabular-nums dark:text-slate-300">
                          {row.length}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_5.frameTip}
              </p>

              <BeforeAfterComparison
                activeTab={state.uiPreferences.beforeAfterTab}
                onTabChange={(tab) =>
                  updateState((prev) => ({
                    ...prev,
                    uiPreferences: {
                      ...prev.uiPreferences,
                      beforeAfterTab: tab,
                    },
                  }))
                }
              />

              <StepCompletionButton
                step={4}
                title="문단 구조 짜기"
                isCompleted={state.completedSteps.includes(4)}
                onToggle={handleToggleStep}
              />
            </section>

            {/* Section 6: 5단계 · 문장 쓰기 규칙 */}
            <section
              id="section-6"
              className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
            >
              <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                {SECTION_6.heading}
              </h2>
              <SectionCoreBox text={SECTION_6.core} />

              <div className="no-print mb-3 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() =>
                    updateState((prev) => ({
                      ...prev,
                      uiPreferences: {
                        ...prev.uiPreferences,
                        showRulesBasis: !prev.uiPreferences.showRulesBasis,
                      },
                    }))
                  }
                  aria-expanded={showRulesBasis}
                  className="inline-flex min-h-[38px] items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <span>
                    {showRulesBasis
                      ? '표의 근거 접기'
                      : '표의 근거 펼쳐보기'}
                  </span>
                  {showRulesBasis ? (
                    <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                        {SECTION_6.rulesColumns[0]}
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                        {SECTION_6.rulesColumns[1]}
                      </th>
                      <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                        {SECTION_6.rulesColumns[2]}
                      </th>
                      {showRulesBasis && (
                        <th className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100">
                          {SECTION_6.rulesColumns[3]}
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_6.rulesRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                          {row.rule}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.avoid}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.better}
                        </td>
                        {showRulesBasis && (
                          <td className="px-4 py-3 align-top text-sm text-slate-600 dark:text-slate-400">
                            {row.basis}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="mt-8 mb-3 text-base font-bold text-slate-900 dark:text-slate-100">
                {SECTION_6.clichesTitle}
              </h3>

              <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[460px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      {SECTION_6.clichesColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_6.clichesRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="w-56 px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                          {row.avoid}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.direction}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <CollapsibleEvidence label={SECTION_6.evidenceNoteLabel}>
                <p>{SECTION_6.evidenceNote}</p>
              </CollapsibleEvidence>

              <StepCompletionButton
                step={5}
                title="문장 쓰기 규칙"
                isCompleted={state.completedSteps.includes(5)}
                onToggle={handleToggleStep}
              />
            </section>
          </div>

          {/* Section 7: 문항별 작성법 */}
          <section
            id="section-7"
            className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_7.heading}
            </h2>
            <SectionCoreBox text={SECTION_7.core} />

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                    {SECTION_7.columns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SECTION_7.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-3 align-top font-medium whitespace-nowrap text-slate-900 dark:text-slate-100">
                        {row.type}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                        {row.focus}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                        {row.structure}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                        {row.avoid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
              <strong className="font-semibold text-slate-900 dark:text-slate-100">
                {SECTION_7.note1Bold}
              </strong>
              {SECTION_7.note1Rest}
            </p>
            <p className="mt-3 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
              <strong className="font-semibold text-slate-900 dark:text-slate-100">
                {SECTION_7.note2Bold}
              </strong>
              {SECTION_7.note2Rest}
            </p>
          </section>

          {/* Section 8: 블라인드·공공기관(NCS) 작성 규칙 */}
          <section
            id="section-8"
            className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_8.heading}
            </h2>
            <SectionCoreBox text={SECTION_8.core} />

            <div>
              <p className="text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_8.lawTitle}
                </strong>{' '}
                — {SECTION_8.lawIntro}
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_8.lawItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <p className="text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_8.blindTitle}
                </strong>{' '}
                — {SECTION_8.blindIntro}
              </p>

              <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      {SECTION_8.blindColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_8.blindRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.allowed}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.forbidden}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.indirect}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_8.blindNote}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-base leading-[1.75] text-slate-800 dark:text-slate-200">
                <strong className="font-semibold text-slate-900 dark:text-slate-100">
                  {SECTION_8.expTitle}
                </strong>{' '}
                — {SECTION_8.expSub}
              </p>

              <div className="mt-3 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      {SECTION_8.expColumns.map((col) => (
                        <th
                          key={col}
                          className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {SECTION_8.expRows.map((row, idx) => (
                      <tr key={idx}>
                        <td className="w-48 px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                          {row.category}
                        </td>
                        <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                          {row.order}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-3 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
                {SECTION_8.expNote}
              </p>
            </div>
          </section>

          {/* Section 9: AI로 작성 돕기 */}
          <section
            id="section-9"
            className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_9.heading}
            </h2>
            <SectionCoreBox text={SECTION_9.core} />

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full min-w-[500px] border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                    {SECTION_9.tableColumns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SECTION_9.tableRows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="w-36 px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                        {row.step}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                        {row.ai}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 dark:text-slate-300">
                        {row.human}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              {SECTION_9.prompts.map((prompt) => (
                <PromptCopyBlock
                  key={prompt.id}
                  title={prompt.title}
                  subtitle={prompt.subtitle}
                  code={prompt.code}
                />
              ))}
            </div>

            <p className="mt-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
              {SECTION_9.closingNote}
            </p>
          </section>

          {/* Section 10: 기업은 AI 자소서를 어떻게 보나 */}
          <section
            id="section-10"
            className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_10.heading}
            </h2>
            <SectionCoreBox text={SECTION_10.core} />

            <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                    {SECTION_10.columns.map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 font-semibold text-slate-900 dark:text-slate-100"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SECTION_10.rows.map((row, idx) => (
                    <tr key={idx}>
                      <td className="w-24 px-4 py-3 align-top font-medium text-slate-900 tabular-nums dark:text-slate-100">
                        {row.date}
                      </td>
                      <td className="px-4 py-3 align-top font-medium text-slate-900 dark:text-slate-100">
                        {row.source}
                      </td>
                      <td className="px-4 py-3 align-top text-slate-700 tabular-nums dark:text-slate-300">
                        {row.content}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <CollapsibleEvidence label={SECTION_10.sourcesDisclosureLabel}>
              <ul className="space-y-1.5">
                {SECTION_10.rows.map((row, idx) => (
                  <li key={idx}>
                    <a
                      href={row.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-900 underline underline-offset-4 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <span>
                        {row.source} ({row.date})
                      </span>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </CollapsibleEvidence>

            <p className="mt-5 text-base leading-[1.75] text-slate-700 dark:text-slate-300">
              <strong className="font-semibold text-slate-900 dark:text-slate-100">
                {SECTION_10.detectorBold}
              </strong>
              {SECTION_10.detectorBody}
            </p>
          </section>

          {/* Section 11: 제출 전 체크리스트 */}
          <section
            id="section-11"
            className="scroll-mt-20 border-b border-slate-200 py-12 dark:border-slate-800"
          >
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_11.heading}
            </h2>
            <SectionCoreBox text={SECTION_11.core} />

            <InteractiveChecklist
              idPrefix="final-check"
              items={SECTION_11.items}
              checkedState={state.finalChecklist}
              onToggle={(idx) =>
                updateState((prev) => ({
                  ...prev,
                  finalChecklist: prev.finalChecklist.map((v, i) =>
                    i === idx ? !v : v
                  ),
                }))
              }
              onClearAll={() =>
                updateState((prev) => ({
                  ...prev,
                  finalChecklist: prev.finalChecklist.map(() => false),
                }))
              }
            />

            <div className="no-print mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-blue-900 px-4 py-2.5 text-sm font-medium text-white whitespace-nowrap transition-colors hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:bg-blue-600 dark:hover:bg-blue-500"
                >
                  <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>내 작업 내보내기 (.txt)</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 whitespace-nowrap transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <Printer className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>인쇄하기</span>
                </button>
              </div>
              <WorkbookStorageControl
                storageAvailable={storageAvailable}
                updatedAt={state.updatedAt}
                hasData={hasSavedData}
                onReset={resetWorkbook}
              />
            </div>
          </section>

          {/* Section 12: 출처 */}
          <section id="section-12" className="scroll-mt-20 py-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {SECTION_12.heading}
            </h2>
            <ul className="space-y-2.5 text-sm leading-relaxed text-slate-700 sm:text-base dark:text-slate-300">
              {SECTION_12.sources.map((src, idx) => (
                <li key={idx} className="break-words">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline items-center gap-1 text-slate-800 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-blue-900 hover:decoration-blue-900 dark:text-slate-200 dark:decoration-slate-700 dark:hover:text-blue-400 dark:hover:decoration-blue-400"
                  >
                    <span>{src.title}</span>
                    <ExternalLink
                      className="ml-1 inline h-3.5 w-3.5 shrink-0 align-text-bottom text-slate-500 dark:text-slate-400"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer */}
          <footer className="border-t border-slate-200 pt-8 text-sm leading-relaxed text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <p>{SITE_META.footerNotice}</p>
          </footer>
        </main>
      </div>
      <AutoSaveToast saveSuccessTick={saveSuccessTick} />
    </div>
  );
}
