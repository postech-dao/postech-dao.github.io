<script lang="ts">
  import CTASection from '$lib/components/CTASection.svelte';
  import HomeLanding from '$lib/components/HomeLanding.svelte';
  import LandingExplore from '$lib/components/LandingExplore.svelte';
  import MediumFeed from '$lib/components/MediumFeed.svelte';
  import type { MediumPost } from '$lib/types';

  export let data: { posts: MediumPost[] };
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

<main class="main-content main-content--home">
  <HomeLanding />
  <MediumFeed posts={data.posts} />
  <LandingExplore />
  <CTASection />
</main>
