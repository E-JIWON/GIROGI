/** /proposals — 다섯 시안이 공유하는 목 데이터와 시안 메타 */

export const mock = {
  date: '10월 7일 화요일',
  day: 31,
  streak: 7,
  longest: 12,
  total: 31,
  /** 월~일 */
  week: [true, true, true, false, false, false, false],
  /** 최근 5주 성공 여부 (히트맵) */
  heat: '1110111 1011011 1111001 0111111 1110000'.split(' ').map((w) => [...w].map((c) => c === '1')),
  report: [
    { label: '집밥', n: 2 },
    { label: '회사밥', n: 2 },
    { label: '외식', n: 2 },
    { label: '배달', n: 0 },
  ],
  missions: [
    { title: '아침 식사 집에서 먹기', sub: '외식·배달 대신 직접 조리', done: true, slot: '아침' },
    { title: '점심 30회 이상 씹기', sub: '천천히 먹어 포만감 높이기', done: true, slot: '점심' },
    { title: '저녁 8시 전 식사 완료', sub: '야식 방지 · 소화 시간 확보', done: false, slot: '저녁' },
  ],
  checklist: [
    { slot: '아침', time: '07:30', items: ['물 한 잔으로 시작', '아침 식사 집에서 먹기'], meal: '집밥 · 계란국' },
    { slot: '점심', time: '12:30', items: ['점심 30회 이상 씹기', '식후 10분 걷기'], meal: '회사밥 · 비빔밥' },
    { slot: '저녁', time: '18:30', items: ['저녁 8시 전 식사 완료', '야식 대신 따뜻한 차'], meal: null as string | null },
    { slot: '밤', time: '22:00', items: ['내일 아침 메뉴 정해두기'], meal: null as string | null },
  ],
  meals: [
    { label: '아침', value: '집밥 · 계란국', time: '07:40' },
    { label: '점심', value: '회사밥 · 비빔밥', time: '12:50' },
    { label: '저녁', value: null as string | null, time: '' },
  ],
  reward: { snackBox: 2, cheatDayIn: 3 },
  emotions: ['스트레스', '심심함', '습관', '보상', '배고픔'],
  alternatives: [
    { title: '심호흡 3회', sub: '4초 들이쉬고, 7초 참고, 8초 내쉬기' },
    { title: '5분 산책', sub: '바깥 공기를 마시며 잠깐 걸어보세요' },
    { title: '물 한 잔 마시기', sub: '갈증이 배고픔으로 느껴질 수 있어요' },
  ],
  future: { weight: 68, dday: 54, note: '12월 가족 여행, 가벼운 몸으로' },
  posts: [
    { who: '운동왕', tone: 'green', when: '12분 전', text: '3일째 야식 참는 중. 오늘은 따뜻한 보리차로 버텼다.', hearts: 4, fire: 2, comments: 1 },
    { who: '건강한밥', tone: 'sand', when: '1시간 전', text: '점심 도시락 싸왔다. 회사밥 대신 집밥 카운트 +1', hearts: 7, fire: 3, comments: 3 },
    { who: '다시시작', tone: 'pink', when: '어제', text: '어제 치킨 먹었는데 오늘 다시 체크리스트 켰다. 괜찮아.', hearts: 12, fire: 5, comments: 6 },
  ],
  friends: [
    { who: '운동왕', streak: 21 },
    { who: '건강한밥', streak: 9 },
    { who: '다시시작', streak: 1 },
  ],
  badges: ['첫 기록', '3일 연속', '7일 연속', '집밥 10회', '외식 0주', '친구 3명'],
  coupons: [
    { title: '과자박스', sub: '3일 연속 성공 보상', left: 2 },
    { title: '치팅데이', sub: '7일 연속 성공 보상', left: 1 },
  ],
  scribbles: [
    { kind: '미션', text: '저녁 8시 전 식사 완료', time: '18:30', done: false },
    { kind: '식사', text: '점심 — 회사밥 · 비빔밥', time: '12:50', done: true },
    { kind: '미션', text: '점심 30회 이상 씹기', time: '12:30', done: true },
    { kind: '유혹', text: '오후 3시 편의점 앞에서 10분 버팀', time: '15:10', done: true },
    { kind: '식사', text: '아침 — 집밥 · 계란국', time: '07:40', done: true },
    { kind: '미션', text: '아침 식사 집에서 먹기', time: '07:30', done: true },
  ],
};

export type ProposalKey = 'paper' | 'journal' | 'attic' | 'stream' | 'ticket';
export type ScreenKey = 'dashboard' | 'checklist' | 'emergency' | 'community' | 'profile';

export const SCREENS: { key: ScreenKey; label: string }[] = [
  { key: 'dashboard', label: '대시보드' },
  { key: 'checklist', label: '체크리스트' },
  { key: 'emergency', label: '유혹 극복' },
  { key: 'community', label: '커뮤니티' },
  { key: 'profile', label: '프로필' },
];

export const PROPOSALS: {
  key: ProposalKey;
  name: string;
  en: string;
  from: string;
  tagline: string;
  why: string[];
  watch: string;
  fit: 1 | 2 | 3;
  recommended?: boolean;
}[] = [
  {
    key: 'paper',
    name: '종이 책상',
    en: 'Paper Desk',
    from: 'design-system · desk-bg + BasicGlass airy',
    tagline: '크림 책상 위에 반투명 종이 카드. 다섯 화면 전부를 같은 결로.',
    why: [
      '디자인 시스템을 가장 적게 손대고 바로 쓴다 (desk-bg · BasicGlass airy · grain 칩 · TodoCheckbox · Segmented).',
      '현재 GIROGI의 "테두리 없음 · 그림자 없음 · 배경색으로 구분" 원칙과 결이 같다. 흰 카드만 반투명 종이로 바뀐다.',
      '위 화면 탭으로 대시보드·체크리스트·유혹 극복·커뮤니티·프로필이 어떻게 되는지 전부 볼 수 있다.',
    ],
    watch: '포인트 색은 세이지 하나. 감정·반응 색이 필요하면 comment-* 7색 안에서만 고를 것. 다크는 .dark 토큰을 켜면 그대로 따라온다.',
    fit: 3,
    recommended: true,
  },
  {
    key: 'journal',
    name: '저널 셸',
    en: 'Journal Shell',
    from: 'bongchil-diary · app-frame + JournalBar + BottomDock',
    tagline: '일기장의 셸 그대로. 책상 위 둥근 카드 한 장, 상단 저널 바, 하단 중앙 독.',
    why: [
      '일기장과 같은 몸체라 두 앱을 오가도 손이 안 헷갈린다. 사이드바를 버리고 "카드 한 장 + 독"으로 PC·모바일을 한 레이아웃으로 처리한다.',
      '저널 바의 통계 칩(기록 · 서랍)이 GIROGI에선 연속 · 총 기록 · 배지가 된다. 카테고리 필터는 식사 장소 필터로 1:1 치환.',
      '하단 독 [날짜 · 서랍장 · 통계 · +기록]이 바로 [캘린더 · 미션 · 통계 · +식사]다.',
    ],
    watch: '카드 안에서 main이 따로 스크롤한다 (h-dvh). 체크리스트처럼 긴 화면은 중첩 스크롤을 주의. 하단 독이 모바일 탭바를 대체하므로 5개 메뉴를 4칸 독에 눌러 담아야 한다.',
    fit: 3,
  },
  {
    key: 'attic',
    name: '다락방 벽',
    en: 'Attic Wall',
    from: 'bongchil-diary · records-canvas (사진 · 포스트잇 · 테이프)',
    tagline: '식사 사진은 폴라로이드로, 미션은 포스트잇으로 벽에 붙인다.',
    why: [
      '"기록이 쌓인다"가 눈에 보인다. 한 달 치 식사 사진이 벽을 채우는 것 자체가 보상.',
      '포스트잇 · 테이프 · 폴라로이드 · 빈티지 필터가 전부 시스템에 있어 추가 구현이 거의 없다.',
    ],
    watch: '숫자 대시보드로는 못 쓴다. 홈을 대체하기보다 "프로필 > 벽" 같은 한 탭으로 두는 게 맞다. 드래그·줌은 일기장 캔버스 코드를 그대로 옮겨야 한다.',
    fit: 2,
  },
  {
    key: 'stream',
    name: '끄적끄적 스트림',
    en: 'Scribble Stream',
    from: 'bongchil-diary · scribbles (문득 · 다짐 · 바람)',
    tagline: '미션 · 식사 · 유혹을 한 줄씩 시간순으로. 입력창 하나로 다 적는다.',
    why: [
      '체크리스트 + 식사 기록 + 유혹 극복 세 화면이 입력창 하나와 스트림 하나로 합쳐진다. 화면 수가 준다.',
      '일기장의 다짐(체크) · 문득(메모) · 바람(위시) 세 종류가 GIROGI의 미션 · 식사 · 유혹과 정확히 대응한다.',
      '실패 기록("치킨 먹음")도 같은 줄에 적히니 자기 연민 모드가 자연스럽다. 숨기지 않고 흘려보낸다.',
    ],
    watch: '주간 통계·친구 비교 같은 집계 화면은 따로 필요하다. 스트림만으로는 "이번 주 외식 2회"가 안 보인다.',
    fit: 2,
  },
  {
    key: 'ticket',
    name: '하루 티켓',
    en: 'Day Ticket',
    from: 'bongchil-diary · archive-ticket (뒤집히는 감상 티켓)',
    tagline: '하루가 티켓 한 장. 뒤집으면 상세, 이미지로 저장해 공유.',
    why: [
      '"오늘 성공" 판정이 티켓 발권으로 보인다. 연속 7일이면 티켓 7장이 꽂힌다.',
      '일기장 티켓의 플립 · 틸트 · 이미지 저장이 그대로 쓰인다. 커뮤니티 공유물이 자동으로 생긴다.',
    ],
    watch: '티켓은 하루 단위 요약이라 체크리스트(실시간 체크)에는 안 맞는다. 홈 상단 한 장 + 프로필의 티켓북 정도가 적정.',
    fit: 2,
  },
];
