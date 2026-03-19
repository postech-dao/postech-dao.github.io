<script lang="ts">
  import type { LogoItem } from '$lib/types';
  import { withBase } from '$lib/utils/assets';
  export let items: LogoItem[] = [];
</script>

<section class="section" id="logo">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title section__title--articles" data-i18n="assets.logo">Logo</h2>
    </div>

    <div class="card-grid card-grid--3col">
      {#each items as item}
        <article class="card">
          <div class="card__image-wrapper card__image-wrapper--logo-preview">
            <img src={withBase(`/${item.image}`)} alt={item.alt} class="card__image--contain" />
          </div>
          <div class="card__content">
            <span class="card__tag">{item.tag}</span>
            <h3 class="card__title">{item.title}</h3>
            <div class="mt-md">
              <a href={withBase(`/${item.image}`)} download class="btn btn--secondary">Download PNG</a>
            </div>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
