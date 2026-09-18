<script lang="ts">
  import { onMount } from 'svelte';
  import { withBase } from '$lib/utils/assets';

  onMount(() => {
    let active = true;
    let cleanup = () => {};
    void import('$lib/legacy/hero-3d').then((module) => {
      if (active) cleanup = module.initHero3D();
    });
    return () => {
      active = false;
      cleanup();
    };
  });
</script>

<section class="landing-hero" aria-labelledby="landing-title">
  <a class="landing-hero__github" href="https://github.com/postech-dao" target="_blank" rel="noopener noreferrer">
    GitHub <span aria-hidden="true">↗</span>
  </a>

  <div class="landing-hero__layout">
    <div class="landing-hero__copy">
      <h1 id="landing-title" class="landing-hero__wordmark">PDAO<span>.</span></h1>
      <p class="landing-hero__lead" data-i18n="landing.lead">포스텍 기반 비영리 블록체인<br />오픈소스 커뮤니티입니다.</p>
      <div class="landing-hero__actions">
        <a class="btn btn--primary" href="https://discord.gg/tf9v5hHpzW" target="_blank" rel="noopener noreferrer">
          <span data-i18n="landing.join">커뮤니티 참여하기</span>
          <span class="btn__arrow" aria-hidden="true">↗</span>
        </a>
        <a class="text-link" href={withBase('/about/')}>
          <span data-i18n="landing.about">PDAO 알아보기</span><span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>

    <div class="landing-hero__visual">
      <div class="landing-hero__orbit" aria-hidden="true"></div>
      <div id="hero-3d-container" class="hero__3d" role="img" aria-label="PDAO logo">
        <img class="hero__3d-fallback" src={withBase('/images/logo/hero-outline.svg')} alt="" />
      </div>
    </div>
  </div>
</section>
