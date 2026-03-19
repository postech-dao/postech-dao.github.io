import type { TimelineYear } from '$lib/types';

export const aboutIntroKeys = ['about.intro1', 'about.intro2', 'about.intro3'] as const;

export const historyYears: TimelineYear[] = [
  {
    year: '2026',
    events: [
      { month: '1월', title: '"AI x Web3 in 2026 | Seoul Summit (with PDAO, BlueNode)" 밋업 개최' }
    ]
  },
  {
    year: '2025',
    events: [
      { month: '12월', title: '"Web3 Online Career Session" 개최' },
      { month: '11월', title: 'Qwen Base SKYST Hackerthon 1st Prize (dydmr, blending-tea)' },
      { month: '11월', title: 'Qwen Base SKYST Hackerthon TOP 10 (sigridjin, crab)' },
      { month: '10월', title: '"Blockchains for TradFi" 밋업 개최' },
      { month: '9월', title: 'Sui-mming hackerthon seoul special prize (sigridjin)' },
      { month: '9월', title: 'Sui-mming hackerthon seoul DSRV Prize (atmosis, hyeongsoo)' },
      { month: '8월', title: 'Superteam Korea Guild Lead Phase 2 선정' },
      { month: '8월', title: '"PDAO in Seoul!" 밋업 개최' },
      { month: '8월', title: '2nd Monad Blitz Seoul 3rd prize (crab, dydmr)' },
      { month: '7월', title: '"Monad Blitz Seoul" 4th prize (seungjun, crab, dominick)' },
      { month: '6월', title: '"모바일 개발자, 블록체인 맛보기" 밋업 개최' },
      { month: '5월', title: '"Dive in Crypto Blockchain!" 밋업 개최' },
      { month: '4월', title: 'SEOULANA 2025 Astra Track 3rd (Sigridjin)' },
      { month: '1월', title: 'Superteam Korea Guild Lead Program 선정' }
    ]
  },
  {
    year: '2023',
    events: [
      { month: '9월', title: 'Simperby SDK Published' },
      { month: '9월', title: 'EthCon Korea Axelar Track Winner (Jeongseup, Sigridjin, yunsig)' },
      { month: '6월', title: '과기부 오픈소스컨트리뷰션아카데미 (OSSCA) 선정 및 운영' }
    ]
  },
  {
    year: '2022',
    events: [
      { month: '12월', title: 'PDAO Chain Genesis' },
      { month: '11월', title: 'Klaymakers 22 DAO Track 1st (Boseon, Lewis, atmosis)' },
      { month: '6월', title: 'PDAO Launch Project' },
      { month: '2월', title: 'PDAO Discord 개설' }
    ]
  }
];
