import type { ProfileSectionData } from '$lib/types';

export const profileSections: ProfileSectionData[] = [
  {
    id: 'founder',
    title: 'Founder',
    members: [
      {
        name: 'Junha Yang',
        tag: 'Founder / Lead Dev',
        image: 'images/profile/Junha_Yang.png',
        socials: [
          { platform: 'x', href: 'https://x.com/junha_yang', label: 'X (Twitter)' },
          {
            platform: 'linkedin',
            href: 'https://www.linkedin.com/in/junha-y-5923061b6/',
            label: 'LinkedIn',
          },
        ],
        bio: [
          '[2023-2026] CTO and CISO, Hyperithm',
          '[2022-2024] Founder & Lead Developer, PDAO',
          '[2021-2022] Infra Team Head, Hyperithm',
          '[2019-2021] Software Engineer, Kodebox',
          '[2018] AI Researcher, Netmarble',
          '[2016-2023] B.S. in CSE, POSTECH',
        ],
      },
    ],
  },
  {
    id: 'organizer',
    title: 'Organizer (Head) / Director',
    members: [
      {
        name: 'Seungjun Oh',
        tag: 'Organizer (Head) / Genesis Member',
        image: 'images/profile/Seungjun_Oh.png',
        socials: [
          { platform: 'x', href: 'https://x.com/seungjun_x', label: 'X (Twitter)' },
          {
            platform: 'linkedin',
            href: 'https://www.linkedin.com/in/basten1209/',
            label: 'LinkedIn',
          },
        ],
        bio: [
          '[2025-Present] Tech BD, B-Harvest',
          '[2025-Present] Organizer, PDAO',
          '[2025-Present] Based Advocate, Base Korea',
          '[2022-2023] Researcher, Bithumb',
          '[2021-Present] BS Program in IME, POSTECH',
        ],
      },
      {
        name: 'Yongwon Seo',
        alias: 'paduck',
        tag: 'Director',
        image: 'images/profile/Yongwon_Seo.png',
        socials: [
          { platform: 'x', href: 'https://x.com/paohree', label: 'X (Twitter)' },
          { platform: 'linkedin', href: 'https://www.linkedin.com/in/paduck/', label: 'LinkedIn' },
        ],
        bio: [
          '[2025-Present] Director, PDAO',
          '[2025] Learner, Apple Developer Academy @POSTECH',
          '[2023-2024] Business Developer, Streami',
          '[2023] GOPAX Guardians Member, Streami',
          '[2018-2025] B.S. in CSE, Handong Global Univ',
        ],
      },
      {
        name: 'Hyunjae Chung',
        alias: 'crab',
        tag: 'Director',
        image: 'images/profile/Hyunjae_Chung.jpg',
        socials: [{ platform: 'x', href: 'https://x.com/0xlidar', label: 'X (Twitter)' }],
        bio: [
          '[2025-Present] SWE, Keplr',
          '[2025-Present] Director, PDAO',
          '[2025] 3rd prize in 2nd Monad Blitz Seoul',
          '[2025] 4th prize in Monad Blitz Seoul',
        ],
      },
      {
        name: 'Sanghyeok Choi',
        alias: 'Xayu',
        tag: 'Director',
        image: 'images/profile/Sanghyeok_Choi.png',
        socials: [{ platform: 'x', href: 'https://x.com/DydmrXc', label: 'X (Twitter)' }],
        bio: [
          '[2025-Present] Director, PDAO',
          '[2025] 3rd prize in 2nd Monad Blitz Seoul',
          '[2025] 1st Prize in Qwen Base SKYST Hackathon',
        ],
      },
    ],
  },
  {
    id: 'contributor',
    title: 'Contributor',
    members: [
      {
        name: 'Taehoon Kim',
        tag: 'Governance Committee',
        image: 'images/profile/Taehoon_Kim.jpeg',
        socials: [
          { platform: 'x', href: 'https://x.com/fakedev9999', label: 'X (Twitter)' },
          {
            platform: 'linkedin',
            href: 'https://www.linkedin.com/in/taehoon-kim-393796185/',
            label: 'LinkedIn',
          },
          { platform: 'github', href: 'https://github.com/fakedev9999', label: 'GitHub' },
          { platform: 'telegram', href: 'https://t.me/fakedev9999tg', label: 'Telegram' },
        ],
        bio: [
          '[2025-Present] Software Engineer, Succinct',
          '[2023-2025] ZK Engineer, Kroma',
          '[2022-Present] Governance Committee, PDAO',
          '[2022-2024] M.S. in ECE, Seoul National University',
          '[2018-2022] B.S. in CSE, POSTECH',
        ],
      },
      {
        name: 'Juyoung Jeong',
        tag: 'Official Website Developer',
        image: 'images/profile/Juyoung_Jeong.png',
        socials: [
          {
            platform: 'linkedin',
            href: 'https://www.linkedin.com/in/juyoung-jeong/',
            label: 'LinkedIn',
          },
          { platform: 'github', href: 'https://github.com/youngjungju', label: 'GitHub' },
        ],
        bio: [
          '[2025-Present] Governance Committee, PDAO',
          '[2025] Software Engineer, Appbuildchat',
          '[2023] Software Engineer, Aribio',
          '[2021-2022] Software Engineer',
          '[2020-2026] B.S. in CSE, Handong Global Univ',
        ],
      },
    ],
  },
];
