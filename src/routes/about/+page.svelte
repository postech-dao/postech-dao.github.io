<script lang="ts">
  import HeroSection from '$lib/components/HeroSection.svelte';
  import HistoryTimeline from '$lib/components/HistoryTimeline.svelte';
  import { aboutIntroKeys, historyYears } from '$lib/data/history';

  const introFallbacks = [
    'PDAO는 POSTECH(Pohang University of Science and Technology, 포항공과대학교)를 기점으로 한 크립토·블록체인 커뮤니티입니다.',
    "PDAO는 2022년 초 POSTECH의 크립토 커뮤니티이자 오픈소스 개발 그룹으로 시작되어, 'DAO(Decentralized Autonomous Organization, 탈중앙화 조직)를 개방하는 DAO'라는 정체성을 바탕으로, 탈중앙화 DAO 프로토콜인 Simperby를 개발하고 이를 통해 스스로를 호스팅하여 왔습니다. 이외에도 멤버들의 각종 해커톤 참여 및 2023년 과기부 산하 오픈소스 컨트리뷰션 프로젝트 등 개발조직으로서 블록체인 산업에 기여하였습니다.",
    '2026년 현재 PDAO는 누구나 자유롭게 참여할 수 있는 커뮤니티로서, 블록체인 생태계에 관심 있는 사람들이 자유롭게 이 산업에 기여하고 자신의 커리어를 키워나갈 수 있는 여러 활동들을 기획하고 참여할 수 있습니다.'
  ];
</script>

<svelte:head>
  <title>About - PDAO</title>
  <meta name="description" content="About PDAO - Postech Decentralized Autonomous Organization" />
  <meta name="keywords" content="PDAO, blockchain, DAO, POSTECH, Web3, About" />
  <meta property="og:title" content="About - PDAO" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://dao.postech.ac.kr/about/" />
  <meta property="og:image" content="https://dao.postech.ac.kr/banner.png" />
  <meta property="og:description" content="About PDAO - Postech Decentralized Autonomous Organization" />
</svelte:head>

<main class="main-content">
  <HeroSection
    labelKey="about.aboutUs"
    titleKey="about.unlockCrypto"
    subtitleKey="about.description"
    label="WELCOME TO PDAO!"
    title="About"
    subtitle="PDAO는 포항공과대학교 (POSTECH)의 특수성에 기반하여, 커뮤니티 멤버들과 함께 크립토-블록체인 문화 확산을 주도합니다."
  />

  <section class="section">
    <div class="container">
      <div class="article-featured">
        <div class="article-featured__content">
          {#each aboutIntroKeys as key, index}
            <p class="article-featured__description" data-i18n={key}>{introFallbacks[index]}</p>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <HistoryTimeline years={historyYears} />
</main>
