<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import type { ArchiveEra } from '$lib/types';
  import { buildProfileSearchUrl, readProfileSearch } from '$lib/utils/profile-search';

  export let eras: ArchiveEra[] = [];

  const roleBadgeMap: Record<string, { css: string; label: string }> = {
    dev: { css: 'dev', label: 'Dev' },
    'dev lead': { css: 'lead', label: 'Dev Lead' },
    strategy: { css: 'strategy', label: 'Strategy' },
    research: { css: 'research', label: 'Research' },
    mentor: { css: 'mentor', label: 'Mentor' },
    coordinator: { css: 'coordinator', label: 'Coordinator' },
    'project lead': { css: 'lead', label: 'Project Lead' },
    lead: { css: 'lead', label: 'Lead' },
    founder: { css: 'special', label: 'Founder' },
    organizer: { css: 'special', label: 'Organizer' },
    events: { css: 'events', label: 'Events' },
    study: { css: 'study', label: 'Study' },
    director: { css: 'director', label: 'Director' }
  };

  let query = '';
  let syncedQuery = '';

  $: currentUrlQuery = browser ? readProfileSearch($page.url) : '';
  $: if (currentUrlQuery !== syncedQuery) {
    syncedQuery = currentUrlQuery;
    query = currentUrlQuery;
  }

  $: if (browser && query !== syncedQuery) {
    void goto(buildProfileSearchUrl($page.url, query), {
      replaceState: true,
      keepFocus: true,
      noScroll: true,
      invalidateAll: false
    });
  }

  $: normalizedQuery = query.trim().toLowerCase();
  $: filteredEras = !normalizedQuery
    ? eras
    : eras
        .map((era) => ({
          ...era,
          entries: era.entries.filter((entry) =>
            entry.name.toLowerCase().includes(normalizedQuery) || entry.handle.toLowerCase().includes(normalizedQuery)
          )
        }))
        .filter((era) => era.entries.length > 0);
  $: totalMatches = filteredEras.reduce((sum, era) => sum + era.entries.length, 0);
</script>

<section class="section profile-section" id="contribution-archive">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title section__title--articles">Contribution Archive</h2>
    </div>
    <p class="profile-archive-intro">PDAO의 모든 멤버 활동 기록을 연도별로 아카이브합니다.</p>

    <div class="archive-search">
      <div class="archive-search__input-wrap">
        <svg class="archive-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input bind:value={query} type="text" class="archive-search__input" placeholder="이름 또는 Discord 핸들로 검색..." id="archive-search" />
        <button class="archive-search__clear" type="button" on:click={() => (query = '')} hidden={!query}>&times;</button>
      </div>
      <span class="archive-search__result">{normalizedQuery ? (totalMatches > 0 ? `${totalMatches}개의 결과` : '검색 결과가 없습니다') : ''}</span>
    </div>

    <div class="archive">
      {#each filteredEras as era, eraIndex}
        <details class="archive-era" open={normalizedQuery ? true : eraIndex === 0}>
          <summary>
            <span class="archive-era__name">{era.name}</span>
            <span class="archive-era__count">{era.entries.length} contributor{era.entries.length === 1 ? '' : 's'}</span>
            <svg class="archive-era__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" /></svg>
          </summary>
          <div class="archive-era__content">
            {#each era.entries as entry}
              <div class:archive-entry--highlight={normalizedQuery && (entry.name.toLowerCase().includes(normalizedQuery) || entry.handle.toLowerCase().includes(normalizedQuery))} class="archive-entry">
                <div class="archive-entry__header">
                  <span class="archive-entry__name">{entry.name}</span>
                  <span class="archive-entry__handle">@{entry.handle}</span>
                </div>
                <div class="archive-entry__roles">
                  {#each entry.roles as role}
                    {#if roleBadgeMap[role.toLowerCase()]}
                      <span class={`role-badge role-badge--${roleBadgeMap[role.toLowerCase()].css}`}>{roleBadgeMap[role.toLowerCase()].label}</span>
                    {/if}
                  {/each}
                </div>
                <ul class="archive-entry__list">
                  {#each entry.contributions as contribution}
                    <li>{contribution.description}</li>
                  {/each}
                </ul>
              </div>
            {/each}
          </div>
        </details>
      {/each}
    </div>
  </div>
</section>
