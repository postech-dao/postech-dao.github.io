<script lang="ts">
  export let labelKey = '';
  export let titleKey = '';
  export let subtitleKey = '';
  export let label = '';
  export let title = '';
  export let subtitle = '';
  export let flush = false;
</script>

<section class:hero--flush={flush} class="hero">
  <div class="hero__decoration hero__decoration--circle"></div>
  <div class="hero__decoration hero__decoration--blur"></div>

  <div class="container hero__inner">
    <div class="hero__content">
      <span class="hero__label" data-i18n={labelKey || undefined}>{label}</span>
      <h1 class="hero__title" data-i18n={titleKey || undefined}>{title}</h1>
      <p class="hero__subtitle" data-i18n={subtitleKey || undefined}>{subtitle}</p>
      <slot />
    </div>
    <slot name="aside" />
  </div>
</section>
