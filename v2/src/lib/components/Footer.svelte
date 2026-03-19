<script lang="ts">
  import { withBase } from '$lib/utils/assets';
</script>

<footer class="footer">
  <div class="footer__container">
    <div class="footer__brand">
      <img src={withBase('/images/logo/favicon.png')} alt="PDAO Logo" class="footer__logo" />
      <div class="footer__brand-text">PDAO</div>
    </div>

    <div class="footer__grid">
      <div class="footer__column">
        <a href={withBase('/about/')} class="footer__column-title" data-i18n="footer.about">About</a>
        <a href={withBase('/about/#history')} class="footer__link" data-i18n="nav.history">History</a>
        <a href="https://github.com/postech-dao/pdao/blob/main/README.md" target="_blank" class="footer__link" data-i18n="nav.ir">IR</a>
      </div>

      <div class="footer__column">
        <a href={withBase('/assets/')} class="footer__column-title" data-i18n="footer.assets">Assets</a>
        <a href={withBase('/assets/#poppin')} class="footer__link" data-i18n="nav.poppin">Poppin</a>
        <a href={withBase('/assets/#logo')} class="footer__link" data-i18n="nav.logo">Logo</a>
      </div>

      <div class="footer__column">
        <a href={withBase('/profile/')} class="footer__column-title" data-i18n="footer.profile">Profile</a>
        <a href={withBase('/profile/#founder')} class="footer__link" data-i18n="footer.founder">Founder</a>
        <a href={withBase('/profile/#organizer')} class="footer__link" data-i18n="footer.organizer">Organizer / Director</a>
        <a href={withBase('/profile/#contributor')} class="footer__link" data-i18n="footer.contributor">Contributor</a>
        <a href={withBase('/profile/#contribution-archive')} class="footer__link" data-i18n="nav.archive">Contribution Archive</a>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__copyright">
        <span data-i18n="footer.copyright">© 2026 Postech DAO. All rights reserved.</span><br />
        <a href="mailto:hi@postech-dao.xyz">hi@postech-dao.xyz</a>
      </div>
    </div>
  </div>
</footer>
