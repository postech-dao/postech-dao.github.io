<script lang="ts">
  import { withBase } from '$lib/utils/assets';
  import type { ProfileMember } from '$lib/types';
  export let member: ProfileMember;
</script>

<article class="card card--horizontal">
  <div class="card__media card__media--profile">
    <div class="card__image-wrapper card__image-wrapper--profile">
      <img src={withBase(`/${member.image}`)} alt={member.name} />
    </div>
  </div>
  <div class="card__content">
    <span class="card__tag">{member.tag}</span>
    <div class="card__header--profile">
      <h3 class="card__title card__title--inline">{member.alias ? `${member.name} (${member.alias})` : member.name}</h3>
      <div class="card__socials card__socials--inline">
        {#each member.socials as social}
          <a href={social.href} class="social-link" target="_blank" aria-label={social.label}>
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><use href={`#profile-icon-${social.platform}`}></use></svg>
          </a>
        {/each}
      </div>
    </div>
    <p class="card__description card__description--compact">
      {#each member.bio as line, index}
        {line}{#if index < member.bio.length - 1}<br />{/if}
      {/each}
    </p>
  </div>
</article>
