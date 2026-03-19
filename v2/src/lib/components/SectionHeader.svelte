<script lang="ts">
  export let title = '';
  export let titleKey = '';
</script>

<div class="section__header">
  <h2 class="section__title section__title--articles" data-i18n={titleKey || undefined}>{title}</h2>
  <slot />
</div>
