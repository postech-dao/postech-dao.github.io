<script lang="ts">
  import { onMount } from 'svelte';
  import { withBase } from '$lib/utils/assets';
  import type { AssetItem } from '$lib/types';

  export let items: AssetItem[] = [];
  let slider: HTMLDivElement | null = null;
  let isPaused = false;

  onMount(() => {
    if (!slider) return;
    const currentSlider = slider;
    const clones = Array.from(currentSlider.children).map((node) => node.cloneNode(true));
    clones.forEach((clone) => currentSlider.appendChild(clone));

    let frame = 0;
    const onMouseOver = () => {
      isPaused = true;
    };
    const onMouseOut = () => {
      isPaused = false;
    };
    const onTouchStart = () => {
      isPaused = true;
    };
    const onTouchEnd = () => {
      setTimeout(() => {
        isPaused = false;
      }, 2000);
    };

    const tick = () => {
      if (!isPaused) {
        currentSlider.scrollLeft += 2;
        if (currentSlider.scrollLeft >= currentSlider.scrollWidth / 2) {
          currentSlider.scrollLeft = 0;
        }
      }
      frame = requestAnimationFrame(tick);
    };

    currentSlider.addEventListener('mouseover', onMouseOver);
    currentSlider.addEventListener('mouseout', onMouseOut);
    currentSlider.addEventListener('touchstart', onTouchStart);
    currentSlider.addEventListener('touchend', onTouchEnd);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      currentSlider.removeEventListener('mouseover', onMouseOver);
      currentSlider.removeEventListener('mouseout', onMouseOut);
      currentSlider.removeEventListener('touchstart', onTouchStart);
      currentSlider.removeEventListener('touchend', onTouchEnd);
    };
  });
</script>

<section class="poppin-section" id="poppin">
  <div class="poppin-bg-glow"></div>
  <div class="poppin-slider" id="poppinSlider" bind:this={slider}>
    {#each items as item}
      <div class="poppin-card">
        <img src={withBase(`/${item.image}`)} alt="Poppin Character" class="poppin-card__image" />
        <div class="poppin-card__content">
          <h3 class="poppin-card__title">{item.title}</h3>
        </div>
        <a href={withBase(`/${item.image}`)} download class="poppin-card__action">Download</a>
      </div>
    {/each}
  </div>
</section>
