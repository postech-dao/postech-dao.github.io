<script lang="ts">
  import { withBase } from '$lib/utils/assets';
  import type { MediumPost } from '$lib/types';

  export let posts: MediumPost[] = [];

  function formatDate(isoString?: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  }

  $: featured = posts[0];
  $: listPosts = posts.slice(1, 4);
</script>

<section class="section" id="medium-section">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title section__title--articles" data-i18n="sections.insights">ARTICLES</h2>
      <a href="https://medium.com/postech-dao" target="_blank" rel="noopener noreferrer" class="section__link section__link--view-all" data-i18n="sections.viewOnMedium">VIEW ALL ↗</a>
    </div>

    <div class="medium-feed">
      <div class="medium-feed__featured">
        {#if !featured}
          <p class="empty">No posts found.</p>
        {:else}
          <div class="article-featured">
            <a href={featured.url} target="_blank" rel="noopener noreferrer" class="article-featured__image">
              <img src={featured.thumbnail || withBase('/images/poppin/6.png')} alt={featured.title} />
            </a>
            <div class="article-featured__content">
              <div class="article-featured__date">{formatDate(featured.publishedAt)}</div>
              <h3 class="article-featured__title">
                <a href={featured.url} target="_blank" rel="noopener noreferrer">{featured.title}</a>
              </h3>
              <p class="article-featured__description">{featured.summary}</p>
              <div class="article-author">
                <div class="article-author__avatar"><img src={withBase('/images/logo/favicon.png')} alt={featured.author || 'PDAO'} /></div>
                <span class="article-author__name">{featured.author || 'PDAO'}</span>
              </div>
            </div>
          </div>
        {/if}
      </div>

      <div class="medium-feed__list">
        {#each listPosts as post}
          <div class="article-item">
            <a href={post.url} target="_blank" rel="noopener noreferrer" class="article-item__image">
              <img src={post.thumbnail || withBase('/images/poppin/6.png')} alt={post.title} />
            </a>
            <div class="article-item__content">
              <div class="article-item__date">{formatDate(post.publishedAt)}</div>
              <h4 class="article-item__title"><a href={post.url} target="_blank" rel="noopener noreferrer">{post.title}</a></h4>
              <div class="article-author">
                <div class="article-author__avatar"><img src={withBase('/images/logo/favicon.png')} alt={post.author || 'PDAO'} /></div>
                <span class="article-author__name">{post.author || 'PDAO'}</span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
