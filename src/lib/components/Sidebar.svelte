<script lang="ts">
  import { withBase } from '$lib/utils/assets';
</script>

<aside class="sidebar sidebar--mobile-dock">
  <div class="sidebar__logo sidebar__logo--dock-anchor">
    <a href={withBase('/')}>
      <img src={withBase('/images/logo/favicon.png')} alt="PDAO Logo" class="sidebar__logo-img" />
    </a>
    <div>
      <a href={withBase('/')} class="sidebar__brand">PDAO</a>
      <div class="sidebar__brand-sub">POSTECH DAO</div>
    </div>
  </div>

  <div class="sidebar__social-grid">
    <a href="https://twitter.com/postech_dao" target="_blank" class="social-icon-btn" title="X">
      <svg viewBox="0 0 24 24" class="social-icon-svg"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    </a>
    <a href="https://discord.gg/tf9v5hHpzW" target="_blank" class="social-icon-btn" title="Discord">
      <svg viewBox="0 0 24 24" class="social-icon-svg"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
    </a>
    <a href="https://github.com/postech-dao" target="_blank" class="social-icon-btn" title="GitHub"><svg viewBox="0 0 24 24" class="social-icon-svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg></a>
    <a href="https://medium.com/postech-dao" target="_blank" class="social-icon-btn" title="Medium"><svg viewBox="0 0 24 24" class="social-icon-svg"><path d="M4.21 0A4.201 4.201 0 0 0 0 4.21v15.58A4.201 4.201 0 0 0 4.21 24h15.58A4.201 4.201 0 0 0 24 19.79v-1.093c-.137.013-.278.02-.422.02-2.577 0-4.027-2.146-4.09-4.832a7.592 7.592 0 0 1 .022-.708c.093-1.186.475-2.241 1.105-3.022a3.885 3.885 0 0 1 1.395-1.1c.468-.237 1.127-.367 1.664-.367h.023c.101 0 .202.004.303.01V4.211A4.201 4.201 0 0 0 19.79 0Zm.198 5.583h4.165l3.588 8.435 3.59-8.435h3.864v.146l-.019.004c-.705.16-1.063.397-1.063 1.254h-.003l.003 10.274c.06.676.424.885 1.063 1.03l.02.004v.145h-4.923v-.145l.019-.005c.639-.144.994-.353 1.054-1.03V7.267l-4.745 11.15h-.261L6.15 7.569v9.445c0 .857.358 1.094 1.063 1.253l.02.004v.147H4.405v-.147l.019-.004c.705-.16 1.065-.397 1.065-1.253V6.987c0-.857-.358-1.094-1.064-1.254l-.018-.004zm19.25 3.668c-1.086.023-1.733 1.323-1.813 3.124H24V9.298a1.378 1.378 0 0 0-.342-.047Zm-1.862 3.632c-.1 1.756.86 3.239 2.204 3.634v-3.634z" /></svg></a>
    <a href="https://www.youtube.com/channel/UCBU7VcTAizK_btu96oQ0qmg" target="_blank" class="social-icon-btn" title="YouTube"><svg viewBox="0 0 24 24" class="social-icon-svg"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg></a>
    <a href="https://pdao.wiki" target="_blank" class="social-icon-btn" title="Wiki"><svg viewBox="0 0 256 256" class="social-icon-svg"><path d="M240,56V200a8,8,0,0,1-8,8H160a24,24,0,0,0-24,23.94,7.9,7.9,0,0,1-5.12,7.55A8,8,0,0,1,120,232a24,24,0,0,0-24-24H24a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H88a32,32,0,0,1,32,32v87.73a8.17,8.17,0,0,0,7.47,8.25,8,8,0,0,0,8.53-8V80a32,32,0,0,1,32-32h64A8,8,0,0,1,240,56Z" /></svg></a>
  </div>

  <nav class="sidebar__nav sidebar__nav--dock">
    <div class="sidebar__nav-rail sidebar__nav-rail--dock">
      <div class="nav-group">
        <a href={withBase('/about/')} class="nav-group__title--link nav-group__title--dock-link" data-page="about">
          <span class="nav-group__icon nav-group__icon--dock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.25" /><path d="M12 10.25V15.25" /><path d="M12 8.35H12.01" /></svg></span>
          <span class="nav-group__label nav-group__label--dock" data-i18n="nav.about">About</span>
        </a>
        <ul class="nav-group__list">
          <li><a href={withBase('/about/#history')} class="nav-link"><span class="nav-text" data-i18n="nav.history">History</span></a></li>
          <li><a href="https://github.com/postech-dao/pdao/blob/main/README.md" target="_blank" class="nav-link nav-link--external"><span class="nav-text" data-i18n="nav.ir">IR</span><svg class="nav-external-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a></li>
        </ul>
      </div>

      <div class="nav-group">
        <a href={withBase('/assets/')} class="nav-group__title--link nav-group__title--dock-link" data-page="assets">
          <span class="nav-group__icon nav-group__icon--dock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4.25" y="5.25" width="15.5" height="13.5" rx="3" /><circle cx="9" cy="10" r="1.5" /><path d="M7 16L11.25 11.75C11.6 11.4 12.16 11.38 12.54 11.71L15.1 13.94C15.46 14.26 15.99 14.25 16.35 13.92L17 13.33L19.75 16" /></svg></span>
          <span class="nav-group__label nav-group__label--dock" data-i18n="nav.assets">Assets</span>
        </a>
        <ul class="nav-group__list">
          <li><a href={withBase('/assets/#poppin')} class="nav-link"><span class="nav-text" data-i18n="nav.poppin">Poppin</span></a></li>
          <li><a href={withBase('/assets/#logo')} class="nav-link"><span class="nav-text" data-i18n="nav.logo">Logo</span></a></li>
        </ul>
      </div>

      <div class="nav-group">
        <a href={withBase('/profile/')} class="nav-group__title--link nav-group__title--dock-link" data-page="profile">
          <span class="nav-group__icon nav-group__icon--dock" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M15.5 8.25A3.5 3.5 0 1 1 8.5 8.25A3.5 3.5 0 0 1 15.5 8.25Z" /><path d="M5.5 18C6.57 15.6 9.02 14 12 14C14.98 14 17.43 15.6 18.5 18" /></svg></span>
          <span class="nav-group__label nav-group__label--dock" data-i18n="nav.profile">Profile</span>
        </a>
        <ul class="nav-group__list">
          <li><a href={withBase('/profile/#founder')} class="nav-link"><span class="nav-text" data-i18n="nav.founder">Founder</span></a></li>
          <li><a href={withBase('/profile/#organizer')} class="nav-link"><span class="nav-text" data-i18n="nav.organizer">Organizer / Director</span></a></li>
          <li><a href={withBase('/profile/#contributor')} class="nav-link"><span class="nav-text" data-i18n="nav.contributor">Contributor</span></a></li>
          <li><a href={withBase('/profile/#contribution-archive')} class="nav-link"><span class="nav-text" data-i18n="nav.archive">Contribution Archive</span></a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="sidebar__language">
    <button class="language-toggle" id="language-toggle" data-lang="ko">
      <svg class="language-toggle__icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <span class="language-toggle__text">KO</span>
    </button>
  </div>

  <button id="sidebar-toggle" aria-label="Toggle Navigation" aria-expanded="false">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
  </button>
</aside>
