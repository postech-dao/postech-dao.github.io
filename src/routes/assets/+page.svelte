<script lang="ts">
  import HeroSection from '$lib/components/HeroSection.svelte';
  import LogoGallery from '$lib/components/LogoGallery.svelte';
  import PoppinSlider from '$lib/components/PoppinSlider.svelte';
  import { logoItems, poppinItems } from '$lib/data/assets';
</script>

<svelte:head>
  <title>Assets - PDAO</title>
  <meta name="description" content="PDAO Brand Assets - Logo and Poppin" />
  <meta name="keywords" content="PDAO, brand, logo, assets, Poppin, POSTECH" />
  <meta property="og:title" content="Assets - PDAO" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://dao.postech.ac.kr/assets/" />
  <meta property="og:image" content="https://dao.postech.ac.kr/banner.png" />
  <meta property="og:description" content="PDAO Brand Assets - Logo and Poppin" />
</svelte:head>

<main class="main-content">
  <HeroSection
    labelKey="assets.brandAssets"
    titleKey="assets.downloadAssets"
    subtitleKey="assets.assetsDesc"
    label="POPPINS & LOGO"
    title="ASSETS"
    subtitle="PDAO의 마스코트 POPPIN을 소개합니다!"
    flush={true}
  />

  <PoppinSlider items={poppinItems} />
  <LogoGallery items={logoItems} />
</main>
