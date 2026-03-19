<script lang="ts">
  import ProfileCard from '$lib/components/ProfileCard.svelte';
  import type { ProfileSectionData } from '$lib/types';
  export let section: ProfileSectionData;
</script>

<section class="section profile-section" id={section.id}>
  <div class="container">
    <div class="section__header">
      <h2 class="section__title section__title--articles">{section.title}</h2>
    </div>
    <div class="card-grid card-grid--2col">
      {#each section.members as member}
        <ProfileCard {member} />
      {/each}
    </div>
  </div>
</section>
