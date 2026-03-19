<script lang="ts">
  import { onMount } from 'svelte';
  import type { TimelineYear } from '$lib/types';
  export let years: TimelineYear[] = [];
  let activeYear = years[0]?.year ?? '';

  onMount(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>('.history-section');
      const triggerY = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0];
      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY;
        if (sectionTop <= triggerY) current = section;
        else break;
      }
      if (current?.dataset.year) activeYear = current.dataset.year;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });
</script>

<section class="section" id="history">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title section__title--articles" data-i18n="about.history">History</h2>
    </div>

    <div class="history-timeline">
      {#each years as year}
        <div class:active={activeYear === year.year} class="history-section" data-year={year.year}>
          <div class="history-section__marker"><span class="history-section__marker-year">{year.year}</span></div>
          <div class="history-section__year">{year.year}</div>
          <div class="history-section__events">
            {#each year.events as event}
              <div class="history-event">
                <span class="history-event__month">{event.month}</span>
                <p class="history-event__title">{event.title}</p>
              </div>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
