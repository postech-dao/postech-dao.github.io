<script lang="ts">
  import { homeDestinations } from '$lib/data/home';
  import { profileSections } from '$lib/data/profile';
  import { withBase } from '$lib/utils/assets';

  const people = profileSections
    .filter((section) => section.id === 'founder' || section.id === 'organizer')
    .flatMap((section) => section.members);
</script>

<section class="section landing-explore" aria-labelledby="explore-title">
  <div class="container">
    <div class="section__header">
      <h2 class="section__title" id="explore-title" data-i18n="landing.exploreTitle">EXPLORE</h2>
    </div>

    <div class="destination-grid">
      {#each homeDestinations as destination}
        <a class={'destination destination--' + destination.id} href={withBase(destination.href)}>
          <span class="round-arrow" aria-hidden="true">↗</span>
          <div class="destination__visual" aria-hidden="true">
            {#if destination.id === 'about'}
              <span class="destination__year">2022</span>
            {:else if destination.id === 'assets'}
              <img class="destination__poppin" src={withBase('/images/poppin/12.png')} alt="" loading="lazy" />
            {:else}
              <div class="destination__people">
                {#each people as person}
                  <img src={withBase('/' + person.image)} alt="" loading="lazy" />
                {/each}
              </div>
            {/if}
          </div>
          <div class="destination__content">
            <h3 data-i18n={destination.titleKey}>{destination.title}</h3>
            <p data-i18n={destination.descriptionKey}>{destination.description}</p>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
