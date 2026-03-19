<script lang="ts">
  import '@fontsource/roboto/300.css';
  import '@fontsource/roboto/400.css';
  import '@fontsource/roboto/500.css';
  import '@fontsource/roboto/700.css';
  import '@fontsource/roboto/900.css';
  import '$lib/legacy-css/assets/style.css';
  import '$lib/legacy-css/assets/components/poppin-slider.css';

  import { onMount, tick } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { initI18n, translatePage } from '$lib/legacy/i18n';
  import { initSidebar } from '$lib/legacy/sidebar';
  import { initScrollAwareNav, setActiveNav } from '$lib/legacy/shell';

  let cleanupScrollAwareNav = () => {};

  async function syncUi(): Promise<void> {
    await tick();
    translatePage();
    cleanupScrollAwareNav();
    setActiveNav(window.location.pathname, window.location.hash);
    cleanupScrollAwareNav = initScrollAwareNav(window.location.pathname, window.location.hash);
  }

  onMount(() => {
    void (async () => {
      await initI18n();
      initSidebar();
      await syncUi();
    })();

    return () => {
      cleanupScrollAwareNav();
    };
  });

  afterNavigate(() => {
    void syncUi();
  });
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="theme-color" content="#C80864" />
  <meta name="twitter:site" content="@postech_dao" />
</svelte:head>

<Sidebar />
<slot />
<Footer />
