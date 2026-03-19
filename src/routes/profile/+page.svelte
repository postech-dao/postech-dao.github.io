<script lang="ts">
  import ArchiveSection from '$lib/components/ArchiveSection.svelte';
  import CTASection from '$lib/components/CTASection.svelte';
  import HeroSection from '$lib/components/HeroSection.svelte';
  import ProfileIconSprite from '$lib/components/ProfileIconSprite.svelte';
  import ProfileSection from '$lib/components/ProfileSection.svelte';
  import { profileSections } from '$lib/data/profile';
  import type { ArchiveEra } from '$lib/types';

  export let data: { eras: ArchiveEra[] };
</script>

<svelte:head>
  <title>Profile - PDAO</title>
  <meta name="description" content="PDAO Team - Meet the Members" />
  <meta name="keywords" content="PDAO, team, members, POSTECH, blockchain" />
  <meta property="og:title" content="Profile - PDAO" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://dao.postech.ac.kr/profile/" />
  <meta property="og:image" content="https://dao.postech.ac.kr/banner.png" />
  <meta property="og:description" content="PDAO Team - Meet the Members" />
</svelte:head>

<ProfileIconSprite />
<main class="main-content">
  <HeroSection
    label="MEMBER"
    labelKey="profile.recruit"
    title="PROFILE"
    titleKey="profile.joinMovement"
    subtitle="PDAO를 함께 만들어가는 사람들을 소개합니다."
    subtitleKey="profile.joinDesc"
  />

  {#each profileSections as section}
    <ProfileSection {section} />
  {/each}

  <ArchiveSection eras={data.eras} />
  <CTASection />
</main>
