<script lang="ts">
  import { onMount } from 'svelte';
  import CTASection from '$lib/components/CTASection.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import MediumFeed from '$lib/components/MediumFeed.svelte';
  import type { MediumPost } from '$lib/types';

  export let data: { posts: MediumPost[] };

  onMount(() => {
    let cleanup = () => {};
    void import('$lib/legacy/hero-3d').then((module) => {
      cleanup = module.initHero3D();
    });
    return () => cleanup();
  });
</script>

<svelte:head>
  <title>PDAO - POSTECH DAO</title>
  <meta name="description" content="POSTECH Decentralized Autonomous Organization - Unlock Web3 with Clarity" />
  <meta name="keywords" content="PDAO, blockchain, DAO, Simperby, POSTECH, Web3" />
  <meta property="og:title" content="PDAO - POSTECH DAO" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://dao.postech.ac.kr/" />
  <meta property="og:image" content="https://dao.postech.ac.kr/banner.png" />
  <meta property="og:description" content="POSTECH Decentralized Autonomous Organization" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="PDAO" />
  <meta name="twitter:description" content="POSTECH Decentralized Autonomous Organization" />
</svelte:head>

<main class="main-content">
  <HeroSection
    labelKey="hero.label"
    titleKey="hero.title"
    subtitleKey="hero.subtitle"
    title="POSTECH-DAO"
    subtitle="PDAO는 포스텍 기반 비영리 블록체인 오픈소스 커뮤니티입니다."
  >
    <div class="hero__actions">
      <a href="https://discord.gg/tf9v5hHpzW" target="_blank" class="btn btn--primary" data-i18n="buttons.joinDiscord">
        PDAO 최신 소식 지금 바로 확인하기
      </a>
    </div>
    <svelte:fragment slot="aside">
      <div id="hero-3d-container" class="hero__3d"></div>
    </svelte:fragment>
  </HeroSection>

  <MediumFeed posts={data.posts} />
  <CTASection />
</main>
