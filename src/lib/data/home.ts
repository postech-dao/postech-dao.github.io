export const homeDestinations = [
  {
    id: 'about',
    href: '/about/',
    titleKey: 'landing.aboutTitle',
    title: 'PDAO 소개',
    descriptionKey: 'landing.exploreAbout',
    description: '프로젝트와 활동 기록',
  },
  {
    id: 'assets',
    href: '/assets/',
    titleKey: 'landing.assetsTitle',
    title: 'Poppin·로고',
    descriptionKey: 'landing.exploreAssets',
    description: 'Poppin 이미지와 로고 다운로드',
  },
  {
    id: 'profile',
    href: '/profile/',
    titleKey: 'landing.peopleTitle',
    title: '멤버',
    descriptionKey: 'landing.explorePeople',
    description: '운영진과 기여자',
  },
] as const;
