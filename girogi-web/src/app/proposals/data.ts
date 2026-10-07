/** /proposals 시안 페이지 — 다섯 시안이 공유하는 목 데이터와 시안 메타 */

export const mock = {
  date: '10월 7일 화요일',
  streak: 7,
  longest: 12,
  total: 31,
  /** 월~일 */
  week: [true, true, true, false, false, false, false],
  report: [
    { label: '집밥', n: 2 },
    { label: '회사밥', n: 2 },
    { label: '외식', n: 2 },
    { label: '배달', n: 0 },
  ],
  missions: [
    { title: '아침 식사 집에서 먹기', sub: '외식·배달 대신 직접 조리', done: true },
    { title: '점심 30회 이상 씹기', sub: '천천히 먹어 포만감 높이기', done: true },
    { title: '저녁 8시 전 식사 완료', sub: '야식 방지 · 소화 시간 확보', done: false },
  ],
  meals: [
    { label: '아침', value: '집밥 · 계란국' },
    { label: '점심', value: '회사밥 · 비빔밥' },
    { label: '저녁', value: null as string | null },
  ],
  reward: { snackBox: 2, cheatDayIn: 3 },
};

export type ProposalKey = 'paper' | 'glass' | 'postit' | 'ink' | 'dark';

export const PROPOSALS: {
  key: ProposalKey;
  name: string;
  en: string;
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
    tagline: '크림 책상 위에 반투명 종이 카드. 봉칠 디자인 시스템의 기본 결 그대로.',
    why: [
      '디자인 시스템을 가장 적게 손대고 바로 쓸 수 있다 (desk-bg · BasicGlass airy · grain 칩 · TodoCheckbox).',
      '현재 GIROGI의 "테두리 없음 · 그림자 없음 · 배경색으로 구분" 원칙과 결이 같다. 흰 카드만 반투명 종이로 바뀐다.',
      '매일 여는 화면에 피로가 없다. 따뜻한 회갈 그림자라 오래 봐도 눈이 덜 아프다.',
    ],
    watch: '파스텔 세이지 하나만 포인트로 쓴다. 성공·경고를 색으로 더 넣고 싶어지면 comment-* 7색 안에서만 고를 것.',
    fit: 3,
    recommended: true,
  },
  {
    key: 'glass',
    name: '리퀴드 글라스',
    en: 'Liquid Glass',
    tagline: '색 블롭이 떠다니는 바탕 위에 굴절 유리 카드. 가장 "앱"스럽고 화려하다.',
    why: [
      'LiquidGlass + PaletteBlobs로 iOS 26 느낌을 바로 낸다. 커뮤니티·프로필처럼 보여주는 화면에 강하다.',
      '유리 뒤로 바탕색이 비쳐서 카드가 많아도 벽처럼 안 막힌다.',
    ],
    watch: '글자 뒤에 블롭이 지나가면 가독성이 흔들린다. 숫자가 많은 대시보드엔 과하다. 유리 버튼은 아이콘 전용(라벨 금지)이라 CTA 문구를 못 넣는다.',
    fit: 2,
  },
  {
    key: 'postit',
    name: '포스트잇 보드',
    en: 'Post-it Board',
    tagline: '미션 하나가 포스트잇 한 장. 냉장고에 붙여둔 메모처럼.',
    why: [
      '"오늘 할 일 세 개"라는 앱의 핵심을 종이 세 장으로 그대로 보여준다. 떼면 완료.',
      'PostItCard · deco-tape · 손글씨 결이 이미 시스템에 있어 추가 구현이 적다.',
      '자기 연민·실패 후 복귀 같은 감정적 기능에 제일 잘 어울리는 톤.',
    ],
    watch: '파스텔 종이색이 하드코딩이라 다크모드는 밝기만 낮춘다. 데이터가 늘어나면(친구 비교·차트) 종이로는 못 담는다. 홈 전용으로만.',
    fit: 2,
  },
  {
    key: 'ink',
    name: '잉크 에디토리얼',
    en: 'Ink Editorial',
    tagline: '카드 없이 선과 숫자만. 잡지 지면처럼 읽는 대시보드.',
    why: [
      '정보 밀도가 제일 높다. 숫자(연속 일수 · 횟수 · 비율)가 주인공인 화면에 맞다.',
      'ink 5단계 + border 두 종류 + primary 하나로 끝. 토큰 사용이 가장 적고 유지가 쉽다.',
    ],
    watch: '"부드러운 파스텔"이라는 현재 GIROGI 철학과 제일 멀다. 차갑게 읽힐 수 있어 격려 문구·셀프컴패션 모드가 약해진다.',
    fit: 2,
  },
  {
    key: 'dark',
    name: '다크 데스크',
    en: 'Dark Desk',
    tagline: '종이 책상의 밤 버전. 시스템 .dark 토큰을 그대로 켠다.',
    why: [
      '종이 책상과 레이아웃이 같아서 두 테마를 동시에 가져갈 수 있다 (토큰만 바뀐다).',
      '야식 유혹이 오는 밤 시간대에 켜는 앱이라 다크가 기본값이어도 말이 된다.',
      'grain 칩·토글의 오라 글로우가 어두운 바탕에서 제일 예쁘다.',
    ],
    watch: '순흑이 아니라 따뜻한 차콜을 써야 한다(토큰이 이미 그렇다). 파스텔 성공색은 다크에서 묻히니 primary-light 대신 comment-*-solid를 쓸 것.',
    fit: 3,
  },
];
