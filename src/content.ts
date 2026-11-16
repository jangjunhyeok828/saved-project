export interface TocItem {
  id: string;
  label: string;
  shortLabel: string;
  step?: number;
}

export interface SourceItem {
  title: string;
  url: string;
}

export const SITE_META = {
  title: '자소서 작성 가이드북',
  heroCta: '1단계부터 시작하기',
  footerNotice:
    '이 가이드는 공개 자료를 정리한 참고용이며, 지원하는 회사의 채용공고 안내가 항상 우선합니다.',
};

export const TOC_ITEMS: TocItem[] = [
  { id: 'section-0', label: '0. 한 줄 요약', shortLabel: '요약' },
  { id: 'section-1', label: '1. 평가자는 무엇을, 얼마나 읽나', shortLabel: '평가 기준' },
  { id: 'section-2', label: '2. 1단계 · 문항 해석', shortLabel: '1단계 문항 해석', step: 1 },
  { id: 'section-3', label: '3. 2단계 · 직무·회사 분석', shortLabel: '2단계 직무·회사', step: 2 },
  { id: 'section-4', label: '4. 3단계 · 소재 고르기', shortLabel: '3단계 소재', step: 3 },
  { id: 'section-5', label: '5. 4단계 · 문단 구조 짜기', shortLabel: '4단계 문단', step: 4 },
  { id: 'section-6', label: '6. 5단계 · 문장 쓰기 규칙', shortLabel: '5단계 문장', step: 5 },
  { id: 'section-7', label: '7. 문항별 작성법', shortLabel: '문항별 작성법' },
  { id: 'section-8', label: '8. 블라인드·공공기관(NCS) 작성 규칙', shortLabel: '블라인드·NCS' },
  { id: 'section-9', label: '9. AI로 작성 돕기', shortLabel: 'AI 활용' },
  { id: 'section-10', label: '10. 기업은 AI 자소서를 어떻게 보나', shortLabel: 'AI 심사 기준' },
  { id: 'section-11', label: '11. 제출 전 체크리스트', shortLabel: '체크리스트' },
  { id: 'section-12', label: '12. 출처', shortLabel: '출처' },
];

export const STEP_ITEMS = [
  { step: 1, sectionId: 'section-2', title: '문항 해석', shortTitle: '1. 문항 해석' },
  { step: 2, sectionId: 'section-3', title: '직무·회사 분석', shortTitle: '2. 직무·회사' },
  { step: 3, sectionId: 'section-4', title: '소재 고르기', shortTitle: '3. 소재 고르기' },
  { step: 4, sectionId: 'section-5', title: '문단 구조 짜기', shortTitle: '4. 문단 구조' },
  { step: 5, sectionId: 'section-6', title: '문장 쓰기 규칙', shortTitle: '5. 문장 쓰기' },
] as const;

export const SECTION_0 = {
  heading: '0. 한 줄 요약',
  summaryPrefix: '기업은 스펙보다 직무와 이어진 경험을 보고, 한 사람의 서류를 5분 안쪽으로 읽습니다. 그래서 자소서는 ',
  summaryBold: '직무 경험 하나를, 결론부터, 행동과 숫자로',
  summarySuffix: ' 쓰는 글입니다.',
  howToTitle: '이 가이드북 쓰는 법',
  howToSteps: [
    '"평가자는 무엇을 읽나"에서 5가지 원칙을 먼저 익힙니다.',
    '1~5단계를 순서대로 따라 한 문항을 완성합니다: 문항 해석 → 직무·회사 분석 → 소재 고르기 → 문단 구조 → 문장 쓰기.',
    '문항 유형에 맞춰 "문항별 작성법"을 참고합니다. 공공기관이라면 "블라인드·NCS 규칙"도 확인합니다.',
    '"AI 활용"은 각 단계를 빠르게 하는 보조 도구로 씁니다.',
    '제출 전 체크리스트로 점검합니다.',
  ],
};

export const SECTION_1 = {
  heading: '1. 평가자는 무엇을, 얼마나 읽나',
  core: '인사담당자 10명 중 9명은 직무 경험을 가장 중요하게 보고, 6명은 한 사람의 이력서·자소서를 5분 안에 검토합니다.',
  statsColumns: ['자료', '대상', '핵심 결과'],
  statsRows: [
    {
      source: '고용노동부 2023년 하반기 기업 채용동향조사 (2024.03 발표)',
      target: '매출 500대 기업 315곳',
      result:
        '직무능력이 중요하다 96.2% vs 학교·전공·학점 등 스펙 36.2%. 신입 채용 결정 요소 1위는 직무 관련 일경험(35.6%). 면접 중심 전형 92.1%',
      referenceUrl:
        'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=16352',
    },
    {
      source: '인크루트 인사담당자 설문 (2023.07)',
      target: '인사담당자 475명, 표본오차 ±4.5%p',
      result:
        '직무 경험을 가장 비중 있게 평가 90.1%. 지원자 1명 서류 검토 5분 미만 62.3%. 자소서 평가를 유지하겠다 85% 이상',
      referenceUrl: 'https://www.kyeonggi.com/article/20230717580004',
    },
    {
      source: 'Sackett 외, Journal of Applied Psychology (2022)',
      target: '인재 선발 도구 메타분석',
      result:
        '구조화 면접이 직무 성과를 가장 잘 예측(타당도 .42, 1위). 비구조화 면접은 .19',
      referenceUrl: 'https://doi.org/10.1037/apl0000994',
    },
    {
      source: 'Nielsen Norman Group 시선 추적 연구 (2006, 2017 재확인)',
      target: '웹 사용자 232명',
      result:
        '화면의 글은 처음 몇 줄과 각 문단의 첫 단어 위주로 훑어 읽음(F자 패턴)',
      referenceUrl:
        'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/',
    },
  ],
  principlesTitle: '5가지 작성 원칙',
  principles: [
    {
      title: '직무 경험이 주인공입니다.',
      body: '어떤 문항이든 지원 직무와 이어지는 경험으로 답합니다. 스펙 나열은 이력서에 맡깁니다.',
    },
    {
      title: '결론을 첫 문장과 소제목에 둡니다.',
      body: '5분 안에 훑어 읽는 사람에게 끝까지 읽어야 알 수 있는 글은 불리합니다.',
    },
    {
      title: '행동을 장면이 보이게 씁니다.',
      body: '자소서는 면접 질문의 재료가 되고, 구조화 면접은 과거 행동을 물어 검증합니다. 도로교통공단의 NCS 자소서 작성 안내도 "읽는 사람이 당시 상황을 그릴 수 있도록" 쓰라고 요구합니다.',
    },
    {
      title: '이 회사, 이 직무에만 맞게 씁니다.',
      body: '회사명만 바꾼 복사형 글은 감점 1순위로 꼽히고, AI 작성을 허용하는 기업도 다른 지원자와 내용이 겹치면 감점합니다.',
    },
    {
      title: '사실만, 면접에서 말할 수 있는 것만 씁니다.',
      body: '고용노동부 고용24 작성 가이드는 과장·거짓을 금지하고, 공공기관은 기재한 경력·경험을 검증 대상으로 봅니다.',
    },
  ],
  evidenceNoteLabel: '근거 메모 및 통계 출처 보기',
  evidenceNote:
    '(근거 메모) F자 패턴 연구는 웹페이지 독자 대상이어서 자소서 평가자에게 그대로 들어맞는다는 증거는 아닙니다. 다만 짧은 검토 시간과 함께 보면 두괄식을 받치는 근거가 됩니다.',
};

export const SECTION_2 = {
  heading: '2. 1단계 · 문항 해석',
  core: "문항은 '보려는 역량 + 답해야 할 요소 + 형식 조건'으로 쪼개고 시작합니다. 자소설닷컴이 2026년 4월 정리한 감점 유형 3위가 문항의 핵심 키워드에 답하지 않는 '동문서답형'입니다.",
  exampleLabel: '실제 문항으로 본 해석 예시',
  exampleSource: '도로교통공단 NCS 자소서 문항(2023)',
  examplePrompt:
    '시키는 일의 범위를 넘어서 적극적으로 도전한 경험이 있다면 소개해 주십시오. (450자 이내) — 언제, 어떤 상황이었습니까? / 어떻게 행동했습니까? / 결과에서 얻은 교훈은 무엇입니까?',
  exampleColumns: ['분해 항목', '이 문항에서는'],
  exampleRows: [
    {
      item: '보려는 역량',
      detail: '주도성 — 지시받지 않은 일을 스스로 찾아서 했는가',
    },
    {
      item: '답해야 할 요소',
      detail: '① 언제·어떤 상황 ② 내 행동 ③ 결과와 교훈 (하나라도 빠지면 동문서답)',
    },
    {
      item: '핵심 키워드',
      detail:
        "'시키는 일의 범위를 넘어' — 본문에서 원래 맡은 일과 더 한 일을 구분해 보여줘야 함",
    },
    {
      item: '형식 조건',
      detail: '450자 이내, 경험 1개',
    },
  ],
  tip1Prefix: '다른 문항에도 같은 표를 채워 보세요. 특히 ',
  tip1Bold1: '기간 조건',
  tip1Mid: '(예: "최근 5년 내에 직면했던 어려움")과 ',
  tip1Bold2: '복수 질문',
  tip1Suffix: '(지원동기와 포부를 한 문항에서 묻는 경우)을 놓치기 쉽습니다.',
  tip2Bold: '문항에 하위 질문이 없을 때',
  tip2Suffix:
    '는 대부분 위 세 요소(상황·행동·결과)를 기대한다고 보면 됩니다. NCS 자소서 양식들이 "상황·행동·결과 중심으로 구체적으로 기술하시오"처럼 같은 틀을 반복해서 요구합니다.',
  worksheetTitle: '내 문항 해석 워크시트',
  worksheetQuestionLabel: '지원 문항 원문',
  worksheetQuestionPlaceholder:
    '예: 팀 프로젝트 중 갈등을 해결하고 성과를 만든 경험을 작성해 주세요. (500자 이내)',
  worksheetFields: [
    {
      key: 'competency' as const,
      label: '보려는 역량',
      placeholder: '예: 협업, 갈등 조정, 문제 해결력',
    },
    {
      key: 'elements' as const,
      label: '답해야 할 요소',
      placeholder: '예: ① 갈등 상황 ② 내가 한 조율 행동 ③ 결과와 변화',
    },
    {
      key: 'keywords' as const,
      label: '핵심 키워드',
      placeholder: '예: 갈등 해결과 성과 — 갈등 원인과 내 개입 전후 차이를 구분해 보여줘야 함',
    },
    {
      key: 'constraints' as const,
      label: '형식 조건',
      placeholder: '예: 500자 이내, 최근 3년 내 경험 1개',
    },
  ],
};

export const SECTION_3 = {
  heading: '3. 2단계 · 직무·회사 분석',
  core: '쓰기 전에 \'평가자의 단어\'를 모읍니다. 고용24 작성 가이드는 업무 용어를 직무기술서에서 가져오라고 안내합니다. "왜 이 회사인가"는 직접 조사한 사실이 있어야 쓸 수 있습니다.',
  guideColumns: ['무엇을', '어디서', '어떻게 쓰나'],
  guideRows: [
    {
      what: '요구 역량·업무 용어',
      where:
        '채용공고의 담당업무·자격요건·우대사항, 공공기관은 공고에 함께 올라오는 NCS 직무기술서',
      how: '문단 첫 문장과 소제목에 그 용어를 그대로 씁니다',
      links: [] as { label: string; url: string }[],
    },
    {
      what: '직무의 실제 업무 단위',
      where: "NCS 홈페이지(https://www.ncs.go.kr)의 해당 직무 '능력단위'",
      how: '내 경험 중 그 업무와 닮은 부분을 고르는 기준이 됩니다',
      links: [{ label: 'NCS 홈페이지(https://www.ncs.go.kr)', url: 'https://www.ncs.go.kr' }],
    },
    {
      what: '회사가 지금 하는 일',
      where:
        "DART 전자공시(https://dart.fss.or.kr) 사업보고서의 '사업의 내용', 회사 IR·보도자료",
      how: '지원동기에 최근 사업 1~2개를 구체적으로 언급합니다',
      links: [{ label: 'DART 전자공시(https://dart.fss.or.kr)', url: 'https://dart.fss.or.kr' }],
    },
    {
      what: '인재상·핵심가치',
      where: '채용 홈페이지',
      how: '협업·가치관 문항의 소재를 고를 때 맞춥니다',
      links: [] as { label: string; url: string }[],
    },
  ],
  summaryTableTitle: '분석 결과는 한 장으로 정리해 둡니다.',
  summaryTableColumns: ['항목', '내 메모'],
  summaryFields: [
    {
      key: 'competencies' as const,
      label: '요구 역량 3~5개 (공고 표현 그대로)',
      placeholder: '예: 공정 품질 분석, 유관부서 커뮤니케이션, 데이터 기반 문제 해결',
    },
    {
      key: 'dailyTasks' as const,
      label: '이 직무가 매일 하는 일 2~3가지',
      placeholder: '예: 생산 라인 불량률 모니터링, 원인 파악 및 개선안 도출, 공정 매뉴얼 업데이트',
    },
    {
      key: 'recentIssues' as const,
      label: '회사의 최근 사업·이슈 2개 (출처)',
      placeholder: '예: ○○ 신공장 증설 투자 공시 (DART 사업보고서), 친환경 소재 전환 (보도자료)',
    },
    {
      key: 'myRole' as const,
      label: '그 사업에서 내가 맡고 싶은 역할',
      placeholder: '예: 신규 라인 안정화 단계에서 초기 불량 데이터를 수집해 수율 개선 지원',
    },
  ],
  aiWarning:
    "AI는 공고 문구를 정리하는 데는 유용하지만, 회사의 최근 사정을 정확히 알려주지는 못합니다. GPTers 실험에서도 '이 회사여야 하는 이유' 항목은 AI로 고쳐도 20점 만점에 8점 이하에 머물렀습니다.",
};

export const SECTION_4 = {
  heading: '4. 3단계 · 소재 고르기',
  core: '문항마다 직무와 가장 가까운 경험 하나를 고릅니다. 고용노동부 조사에서 기업이 선호한 일경험은 3~6개월 장기 인턴십(74.0%)과 기업 프로젝트 참여·성과 제출(68.9%)이었습니다. 그런 경험이 없다면 아르바이트·동아리·팀 프로젝트에서 직무와 닮은 장면을 찾습니다.',
  step1Title: '① 경험 인벤토리 만들기',
  step1Desc:
    '지금까지의 활동을 빠짐없이 적습니다. 공공기관 지원서는 둘을 나눠 적게 하니 처음부터 구분해 두세요.',
  inventoryTypes: [
    {
      label: '경력:',
      desc: '금전적 보수를 받고 일한 것 (인턴, 아르바이트, 계약직)',
    },
    {
      label: '경험:',
      desc: '보수 없이 한 활동 (팀 프로젝트, 동아리, 공모전, 봉사, 실습)',
    },
  ],
  step2Title: '② 경험 × 역량 매트릭스',
  step2Desc:
    '2단계에서 뽑은 요구 역량을 열로, 내 경험을 행으로 놓고 증명할 수 있는 칸에 ○를 표시합니다.',
  matrixNote:
    '○가 많은 경험이 주력 소재입니다. 같은 경험을 두 문항에 쓸 때는 문항이 보려는 역량에 맞는 다른 장면을 꺼냅니다. ○가 하나도 없는 역량은 빈칸으로 남겨두고, 면접 전까지 보완할 거리로 삼습니다.',
  step3Title: '③ 고른 소재 점검',
  step3Desc: '아래에 모두 "예"여야 쓸 만한 소재입니다.',
  materialChecklist: [
    '내가 맡은 역할을 한 문장으로 말할 수 있다',
    '내가 한 행동이 두세 개 이상 떠오른다',
    '결과를 기준이 있는 숫자로 말할 수 있다 (없으면 변화를 구체적으로)',
    '면접에서 꼬리질문을 받아도 사실대로 답할 수 있다',
  ],
};

export const SECTION_5 = {
  heading: '5. 4단계 · 문단 구조 짜기',
  core: '결론을 먼저 쓰고(두괄식), 그 근거를 상황·행동·결과(STAR) 순서로 붙입니다. 짧게 훑어 읽는 평가자는 첫 줄에서 내용을 파악하고, 면접관은 행동 부분을 바탕으로 질문합니다.',
  frameTitle: '문항 하나의 기본 틀',
  frameColumns: ['순서', '쓸 내용', '분량'],
  frameRows: [
    { order: '소제목', content: '역량 키워드 + 결과를 한 줄로', length: '1줄' },
    {
      order: '① 결론',
      content: '무엇을 해서 어떤 결과를 냈고, 그것이 어떤 역량인가',
      length: '1문장',
    },
    {
      order: '② 상황·과제 (S·T)',
      content: '내가 맡은 역할, 해결해야 했던 문제와 그 크기',
      length: '2~3문장',
    },
    {
      order: '③ 행동 (A)',
      content: '내가 한 일 2~3가지와 그렇게 판단한 이유',
      length: '가장 길게',
    },
    {
      order: '④ 결과 (R)',
      content: '기준이 있는 숫자, 배운 점',
      length: '1~2문장',
    },
    {
      order: '⑤ 직무 연결',
      content: '입사 후 어떤 업무에서 이 방식을 쓸지',
      length: '1문장',
    },
  ],
  frameTip:
    '글자수가 짧아도(300~500자) ①③④는 빼지 않습니다. 줄일 때는 ②와 ⑤를 먼저 줄입니다.',
  comparisonTitle: '고치기 전과 후',
  comparisonBadge: '(설명을 위한 가상 사례, 문항: 주도적으로 문제를 해결한 경험)',
  beforeLabel: '고치기 전',
  beforeText:
    '저는 책임감이 강하고 적극적인 사람입니다. 대학 시절 카페 아르바이트를 하며 다양한 고객을 만났고, 업무 효율을 높이기 위해 많은 노력을 했습니다. 이를 통해 주도성을 기를 수 있었습니다.',
  afterLabel: '고친 후',
  afterHeadline: '[주문 대기 12분→7분] 지시 없이 바꾼 제조 동선',
  afterText:
    '피크타임 주문 대기를 줄이려 제조 동선을 제안·적용해, 3개월간 평균 대기를 12분에서 7분으로 줄였습니다. 매장은 점심에만 주문이 몰려 대기 불만이 리뷰에 반복됐지만, 제 역할은 주문 접수를 맡은 아르바이트생이었습니다. 먼저 2주간 주문별 제조 시간을 재어 병목이 얼음·컵 위치에 있다는 것을 확인했습니다. 점장님께 기록을 보여드리고 도구 배치를 바꾸는 안을 1주일 시범 운영했습니다. 바뀐 배치는 사진과 함께 매뉴얼로 남겨 다른 근무자도 따르게 했습니다. 문제를 감으로 말하지 않고 기록으로 설득하는 방식을 생산관리 업무에서도 쓰겠습니다.',
  comparisonDiffLabel: '달라진 점:',
  comparisonDiff:
    "책임감·주도성 같은 형용사를 빼고, 행동(기록·제안·시범 운영·매뉴얼화)과 기간이 붙은 숫자로 주도성을 보여줍니다. '지시 없이'라는 문항 키워드도 소제목에 들어갔습니다.",
};

export const SECTION_6 = {
  heading: '6. 5단계 · 문장 쓰기 규칙',
  core: '좋은 문장은 평가자가 확인할 수 있는 사실을 담습니다.',
  rulesColumns: ['규칙', '피할 문장', '이렇게', '근거'],
  rulesRows: [
    {
      rule: '추상어는 사례로 증명',
      avoid: '"열정과 소통, 성실함을 갖춘 인재입니다"',
      better: '그 단어를 빼고 그 태도가 드러난 행동을 씁니다',
      basis: '자소설닷컴 감점 유형 4위(추상어를 사례 없이 나열)',
    },
    {
      rule: '주장에는 근거를',
      avoid: '의견·포부만 있는 문단',
      better: '주장 바로 뒤에 경험이나 성과를 붙입니다',
      basis: "감점 유형 '근거 부족 주장 나열형'",
    },
    {
      rule: '숫자에는 기준을',
      avoid: '"매출을 30% 올렸습니다"',
      better:
        '기간·모수·비교 대상을 붙입니다: "3개월간 월평균 200만 원에서 260만 원으로"',
      basis: '고용24(성과는 수치로), GPTers(모수·예산·기간 없으면 검증 불가)',
    },
    {
      rule: '업무 용어는 공고에서',
      avoid: '내가 만든 표현',
      better: '채용공고·직무기술서의 용어를 씁니다',
      basis: '고용24 작성 가이드',
    },
    {
      rule: '시행착오도 쓰기',
      avoid: '매끄럽기만 한 성공담',
      better: '막혔던 점과 바꾼 판단을 한 문장 넣습니다',
      basis: "감점 유형 2위 '완벽한 AI 스타일형'",
    },
    {
      rule: '번호·일반론 피하기',
      avoid: '"첫째, 둘째, 셋째", "이를 통해 OO 역량을 길렀습니다"',
      better: '경험의 흐름대로 쓰고, 배운 점은 바뀐 행동으로 보여줍니다',
      basis: '무하유가 공개한 AI 작성 자소서의 특징',
    },
    {
      rule: '회사·직무명 확인',
      avoid: '다른 회사 이름이 남은 글',
      better: '지원할 때마다 고유명사를 다시 확인합니다',
      basis: "감점 유형 1위 '복사 & 붙여넣기형'",
    },
  ],
  clichesTitle: '상투어 바꾸기',
  clichesColumns: ['피할 표현', '바꾸는 방향'],
  clichesRows: [
    {
      avoid: '귀사에 기여하겠습니다',
      direction: '입사 후 맡을 업무와 거기서 쓸 내 기술을 명시',
    },
    {
      avoid: '최선을 다했습니다',
      direction: '한 일, 들인 시간·횟수',
    },
    {
      avoid: '소통의 중요성을 깨달았습니다',
      direction: '그 뒤 달라진 내 행동 한 가지',
    },
    {
      avoid: '어릴 때부터 꿈이었습니다',
      direction: '이 직무에 관심을 갖게 된 구체적 계기',
    },
  ],
  evidenceNoteLabel: '근거 메모 펼쳐보기',
  evidenceNote:
    '(근거 메모) 자소설닷컴 감점 유형은 컨설턴트의 첨삭 사례를 정리한 것이고 통계는 아닙니다. 다만 인사담당자 설문(직무 경험 중시)과 연합뉴스 취재(내용이 겹치면 감점)와 방향이 같아 함께 실었습니다.',
};

export const SECTION_7 = {
  heading: '7. 문항별 작성법',
  core: "분량과 공은 경험 문항에 가장 많이 들입니다. 인크루트 설문에서 인사담당자들이 '빼도 된다'고 많이 꼽은 문항이 입사 후 포부(48.6%)와 성격의 장단점(24.4%)이었습니다. 이 두 문항은 화려하게 쓰기보다 짧고 구체적으로 쓰면 충분합니다.",
  columns: ['문항', '평가자가 보는 것', '구조', '피할 것'],
  rows: [
    {
      type: '직무역량·경험',
      focus: '이 일을 해본 적이 있는가',
      structure: '4단계 기본 틀 그대로',
      avoid: '경험 여러 개 나열',
    },
    {
      type: '지원동기',
      focus: '왜 이 회사, 왜 이 직무인가',
      structure: '회사의 최근 사업(사실) → 그와 이어지는 내 경험 → 입사 후 맡고 싶은 업무',
      avoid: '회사 칭찬, 공고 문구 베끼기, 어느 회사에나 맞는 문장',
    },
    {
      type: '협업·갈등',
      focus: '내가 팀 안에서 한 행동',
      structure: '갈등의 원인 → 내가 한 커뮤니케이션 행동 → 결과',
      avoid: '감정 묘사, 상대 비난',
    },
    {
      type: '실패·극복',
      focus: '책임감과 배우는 방식',
      structure: '내가 통제할 수 있었던 실수 → 수습 행동 → 그 뒤 바뀐 일하는 방식',
      avoid: '남·환경 탓, 실패 같지 않은 실패',
    },
    {
      type: '성장과정·가치관',
      focus: '일하는 태도의 뿌리',
      structure: '지금의 태도를 만든 계기 하나 → 그것이 드러난 최근 행동',
      avoid: '어린 시절부터 시간순 나열, 가족 소개',
    },
    {
      type: '입사 후 포부',
      focus: '직무 이해와 현실감',
      structure: '입사 초기에 익힐 것 → 1~3년 안에 맡고 싶은 업무 → 기여, 단계마다 기한',
      avoid: '"최고의 전문가가 되겠습니다" 같은 다짐',
    },
    {
      type: '성격의 장단점',
      focus: '일하는 방식',
      structure: '장점 하나 + 드러난 사례 / 단점 하나 + 보완하는 구체적 방법',
      avoid: '장점 같은 단점, 사례 없는 형용사',
    },
  ],
  note1Bold: '가치관·포부 문항은 특히 직접 쓰세요.',
  note1Rest:
    ' 무하유가 2023년 하반기 자소서 26만여 건을 분석했을 때, 미래 계획·가치관을 묻는 문항의 AI 사용 의심 비율(33.7%)은 일반 문항(평균 3% 내외)보다 훨씬 높았습니다. 비슷한 글이 몰리는 문항이라는 뜻입니다.',
  note2Bold: '공공기관(NCS) 자소서',
  note2Rest:
    '는 일대기식 성장과정 대신 지원동기, 조직 적합성(핵심가치·인재상), 직업기초능력을 묻는 문항으로 구성됩니다. 대부분 경험 문항이므로 4단계 기본 틀을 그대로 씁니다.',
};

export const SECTION_8 = {
  heading: '8. 블라인드·공공기관(NCS) 작성 규칙',
  core: '직무와 관계없는 개인정보는 쓰지 않습니다. 블라인드 채용에서는 간접적으로 드러나도 위반이 될 수 있습니다.',
  lawTitle: '법이 정한 기준',
  lawIntro:
    '채용절차법 제4조의3(2019 신설)은 상시 30명 이상 사업장이 직무에 필요하지 않은 아래 정보를 자소서 등에 요구하지 못하게 합니다. 요구하지 않았는데 스스로 쓸 필요도 없습니다.',
  lawItems: [
    '용모·키·체중 등 신체적 조건',
    '출신지역·혼인여부·재산',
    '부모 등 직계 존비속과 형제자매의 학력·직업·재산',
  ],
  blindTitle: '공공기관 블라인드 채용',
  blindIntro:
    '학교명, 가족관계, 출신지역 등을 암시하는 내용도 금지하는 경우가 많고, 위반하면 감점·불합격될 수 있습니다. 한국예술인복지재단의 블라인드 위배 기준 안내가 제시한 예시입니다.',
  blindColumns: ['쓸 수 있는 것 (직무능력 정보)', '쓰면 안 되는 것', '간접 노출 예'],
  blindRows: [
    {
      allowed: '전공, 학위, 자격증, 직장명, 담당업무, 수상 기록',
      forbidden: '학교명, 연령, 성별, 출생지, 가족사항, 종교, 신체조건',
      indirect: '"행정병으로 복무하며"(성별), "월드컵 당시 중학생이던"(연령)',
    },
  ],
  blindNote:
    '이 기준은 기관마다 조금씩 다릅니다. 같은 학교명도 어떤 기관은 마스킹(OO대학교)을 요구하므로, 공고의 작성 유의사항을 먼저 읽으세요.',
  expTitle: '경력·경험기술서 쓰는 법',
  expSub: '도로교통공단 채용 안내(2023) 기준',
  expColumns: ['구분', '쓸 내용 순서'],
  expRows: [
    {
      category: '경력 (보수를 받은 일)',
      order: '직무 영역 → 수행 내용 → 본인의 역할과 구체적 행동 → 주요 성과',
    },
    {
      category: '경험 (직무 관련 기타 활동)',
      order: '수행한 활동 내용 → 조직 안에서의 역할 → 활동 결과',
    },
  ],
  expNote:
    '기재한 경력·경험은 증빙 서류로 검증하는 기관이 많습니다. 증명할 수 있는 날짜·기간으로 쓰세요.',
};

export const SECTION_9 = {
  heading: '9. AI로 작성 돕기',
  core: 'AI는 생각을 꺼내고 점검하는 데 쓰고, 경험·회사 사실·최종 문장은 직접 책임집니다. 연합뉴스가 2025년 확인한 대기업·공기업 중 가장 많은 5곳이 허용한 범위도 문장 교정이었고, 2곳은 AI 사용 자체를 금지했습니다.',
  tableColumns: ['단계', 'AI에게 맡길 일', '직접 할 일'],
  tableRows: [
    {
      step: '1 문항 해석',
      ai: '문항을 역량·요소·조건으로 분해',
      human: '분해 결과 확인',
    },
    {
      step: '2 직무·회사 분석',
      ai: '공고에서 요구 역량 뽑기(원문 인용)',
      human: '회사의 최근 사업 조사',
    },
    {
      step: '3 소재 고르기',
      ai: '질문을 던져 경험을 STAR로 정리',
      human: '사실대로 답하기',
    },
    {
      step: '4·5 구조·문장',
      ai: '맞춤법·문장 다듬기, 글자수 줄이기',
      human: '초안 쓰기',
    },
    {
      step: '제출 전',
      ai: '엄격한 채점, 예상 면접 질문',
      human: '지적받은 부분 내 말로 고치기',
    },
  ],
  prompts: [
    {
      id: 'guardrail',
      title: '모든 프롬프트에 넣을 안전장치',
      subtitle: '',
      code: `- 내가 준 재료에 없는 경험·숫자·사실은 만들지 말고 (확인 필요)로 표시해.
- 칭찬은 하지 말고 문제점부터 말해.
- 정보가 부족하면 먼저 나에게 질문해.`,
    },
    {
      id: 'extract',
      title: '① 경험 재료 추출 (3단계)',
      subtitle: '',
      code: `너는 취업 컨설턴트야. 자소서는 쓰지 말고 질문만 해.
내 경험 메모: [두서없이 적은 경험]

- 상황·역할·행동·결과·배운 점을 채울 수 있도록 한 번에 하나씩, 10개 이내로 질문해.
- 결과에는 숫자를 물어보고, 숫자에는 기간·모수·비교 대상을 물어봐.
- 끝나면 [상황 / 역할 / 행동 / 결과 / 배운 점] 표로 정리해.`,
    },
    {
      id: 'grade',
      title: '② 엄격한 채점 (제출 전)',
      subtitle: '메모리를 끄고 새 대화창에서 합니다.',
      code: `너는 하루에 자소서 수백 장을 읽는 [기업명] [직무] 서류 심사자야.
[채용공고] [문항 원문] [내 자소서]

1) 첫 3초 판정: 계속 읽을지, 넘길지와 이유.
2) 문항 적합성 / 직무 연관성 / 숫자·구체성 / 이 회사여야 하는 이유 / 문장·분량을 각 20점 만점으로 채점.
3) 탈락 사유 3가지를 해당 문장을 인용해 제시.
4) 지금 재료만으로 가능한 수정안과, 재료가 더 필요한 부분을 나눠서.`,
    },
    {
      id: 'interview',
      title: '③ 면접 질문 예측 (제출 전)',
      subtitle: '',
      code: `너는 [기업명] [직무] 실무 면접관이야. [제출할 자소서]
- 가장 약한 지점을 파고드는 질문 10개와 각 질문의 의도를 적어.
- 답하지 못하면 탈락 위험이 큰 질문 3개를 표시해.`,
    },
  ],
  closingNote:
    'AI 채점 점수는 실행할 때마다 달라지고 합격 기준도 아닙니다. 총점보다 항목별 점수와 탈락 사유를 보세요.',
};

export const SECTION_10 = {
  heading: '10. 기업은 AI 자소서를 어떻게 보나',
  core: 'AI를 쓴 사실보다, 내 경험 없이 AI가 대신 쓴 글이 불이익을 받습니다. 허용 범위는 회사마다 다르니 공고의 안내를 먼저 확인하세요.',
  columns: ['시점', '자료', '내용'],
  rows: [
    {
      date: '2026.01',
      source: '무하유 2026 AI 채용 트렌드 리포트',
      content:
        '자사 탐지기 기준 AI 작성 의심 자소서 2024년 48.5% → 2025년 64.4%. 탐지기 판매사의 자체 수치이고 판정 기준은 비공개',
      referenceUrl: 'https://www.tech42.co.kr/?p=113339',
    },
    {
      date: '2025.11',
      source: '고용노동부 2025년 기업 채용동향조사 (500대 기업 396곳)',
      content:
        '채용에 AI를 쓰는 기업 21.7%, 도입·확대 계획 74.5%. AI를 쓴 청년의 77.2%가 자소서·이력서 작성에 사용',
      referenceUrl: 'https://v.daum.net/v/20251128120116525',
    },
    {
      date: '2025.09',
      source: '연합뉴스 팩트체크 (대기업 계열사·공기업 14곳)',
      content:
        '9곳이 자소서 AI 표절률 확인(8곳 감점, 1곳 탈락). 문장 교정은 5곳 허용, 2곳은 AI 사용 금지. 다른 지원자와 내용이 겹치면 감점',
      referenceUrl: 'https://v.daum.net/v/K8dILeYctq',
    },
    {
      date: '2024.03',
      source: '고용노동부 2023년 하반기 조사 (500대 기업 315곳)',
      content:
        '챗GPT 자소서에 64.1%가 부정적, 확인되면 감점 42.2%·불합격 23.2%',
      referenceUrl:
        'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=16352',
    },
  ],
  detectorBold: 'AI 탐지기는 틀릴 수 있습니다.',
  detectorBody:
    ' OpenAI는 자사 탐지기가 AI 글의 26%만 잡고 사람 글의 9%를 오판해 2023년 7월 서비스를 종료했습니다. 스탠퍼드 연구에서는 탐지기 7종이 비원어민의 영어 에세이 절반 이상(평균 61.3%)을 AI로 오판했습니다. 한국어 탐지기의 정확도를 독립적으로 검증한 공개 자료는 찾지 못했습니다. 그러니 탐지기 점수를 낮추는 요령보다, 내 경험이 드러나는 글을 쓰는 데 집중하세요.',
  sourcesDisclosureLabel: '통계·연구 출처 펼쳐보기',
};

export const SECTION_11 = {
  heading: '11. 제출 전 체크리스트',
  core: '제출 직전 아래 11개 항목을 하나씩 확인해 빈틈을 줄입니다.',
  items: [
    '공고의 작성 유의사항(블라인드, AI 활용 안내, 글자수)을 지켰다',
    '문항의 핵심 키워드와 하위 질문에 빠짐없이 답했다',
    '소제목과 첫 문장만 읽어도 내용이 전달된다',
    '경험이 지원 직무와 이어진다는 문장이 있다',
    '행동 부분이 가장 길고, 내가 한 일이 구체적이다',
    '숫자에 기간·모수·비교 대상이 붙어 있다',
    '추상어(열정·소통·성실)에는 모두 사례가 붙어 있다',
    '"왜 이 회사인가"에 내가 조사한 사실이 들어갔다',
    '모든 내용이 사실이고, 꼬리질문에도 답할 수 있다',
    '회사명·직무명·맞춤법을 확인했다',
    '소리 내어 읽었을 때 내 말투로 들린다',
  ],
};

export const SECTION_12 = {
  heading: '12. 출처',
  sources: [
    {
      title:
        '고용노동부·한국고용정보원, 2023년 하반기 기업 채용동향조사 보도자료 (2024.03.24)',
      url: 'https://www.moel.go.kr/news/enews/report/enewsView.do?news_seq=16352',
    },
    {
      title: '2025년 기업 채용동향조사 보도 (고용노동부 발표 인용, 2025.11.28)',
      url: 'https://v.daum.net/v/20251128120116525',
    },
    {
      title: '경기일보, 인크루트 인사담당자 설문 (2023.07.17)',
      url: 'https://www.kyeonggi.com/article/20230717580004',
    },
    {
      title:
        '도로교통공단 채용 안내 — NCS 자기소개서·경험 및 경력기술서 (2023.04)',
      url: 'https://dym-upload.saramin.co.kr/upload/dym2_5/667/2743/filedown/2023-04-20/koroad_down_recruit_230420.pdf',
    },
    {
      title: '고용노동부 고용24, 이력서·자소서 작성가이드',
      url: 'https://m.work24.go.kr/wk/r/d/1110/resumeSelfIntroGuide1.do',
    },
    {
      title: '채용절차의 공정화에 관한 법률 (제4조의3)',
      url: 'https://ko.wikisource.org/wiki/%EC%B1%84%EC%9A%A9%EC%A0%88%EC%B0%A8%EC%9D%98_%EA%B3%B5%EC%A0%95%ED%99%94%EC%97%90_%EA%B4%80%ED%95%9C_%EB%B2%95%EB%A5%A0_(%EB%B2%95%EB%A5%A0_%EC%A0%9C16321%ED%98%B8,_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD)',
    },
    {
      title: '한국예술인복지재단, 블라인드 위배 기준 안내',
      url: 'https://job.skuniv.ac.kr/wp-content/uploads/2024/11/첨부3._블라인드_채용_안내문.pdf',
    },
    {
      title: '진학사 캐치, NCS 채용가이드 — 입사지원서',
      url: 'https://www.catch.co.kr/Guide/NCSGuideAtoZ3',
    },
    {
      title:
        'Sackett 외, Revisiting meta-analytic estimates of validity in personnel selection (Journal of Applied Psychology, 2022)',
      url: 'https://doi.org/10.1037/apl0000994',
    },
    {
      title:
        'Nielsen Norman Group, F-Shaped Pattern For Reading Web Content',
      url: 'https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/',
    },
    {
      title: "자소설닷컴, 서류 전형 '감점 1순위' 자소서 유형 공개 (2026.04.08)",
      url: 'https://jasoseol.com/blog/?p=6259',
    },
    {
      title:
        '연합뉴스 팩트체크, 신입사원 공채 자소서 AI로 썼다간 불합격? (2025.09.29)',
      url: 'https://v.daum.net/v/K8dILeYctq',
    },
    {
      title: '테크42, 무하유 2026 AI 채용 트렌드 리포트 보도 (2026.01.08)',
      url: 'https://www.tech42.co.kr/?p=113339',
    },
    {
      title: 'ITWorld, 무하유 2023년 하반기 자소서 분석 보도',
      url: 'https://www.itworld.co.kr/article/3563287/%EC%B1%97gpt-%EA%B0%9C%EB%B0%9C%EC%A7%81-%EC%A7%80%EC%9B%90%EC%9E%90%EA%B0%80-%EB%B9%84%EA%B0%9C%EB%B0%9C-%EC%A7%81%EA%B5%B0%EB%B3%B4%EB%8B%A4-%EC%B5%9C%EB%8C%80-8%EB%B0%B0-%EC%9D%B4.html',
    },
    {
      title:
        'OpenAI, New AI classifier for indicating AI-written text (2023, 종료 공지 포함)',
      url: 'https://openai.com/blog/new-ai-classifier-for-indicating-ai-written-text/',
    },
    {
      title:
        'Liang 외, GPT detectors are biased against non-native English writers (Patterns, 2023)',
      url: 'https://www.cell.com/patterns/fulltext/S2666-3899(23)00130-7',
    },
    {
      title: 'GPTers, AI 자소서 프롬프트 7가지 (2026.08.31)',
      url: 'https://www.gpters.org/news/post/ai-jasoseo-peurompeuteu-7gaji-nae-jasoseo-neoheoboni-100jeom-manjeome-kq4NjHs9d6VXGQi',
    },
    {
      title: '링커리어, 자소서 프롬프트 추천 2026 총정리 (2026.07.22)',
      url: 'https://community.linkareer.com/employment_data/6273451',
    },
  ] satisfies SourceItem[],
};
