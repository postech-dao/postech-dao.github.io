export function setActiveNav(currentPath: string = window.location.pathname): void {
  const normalized = currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
  const pageName = normalized === '/' ? 'index' : normalized.split('/').filter(Boolean)[0] || 'index';

  document.querySelectorAll<HTMLElement>('.nav-group__title--link[data-page]').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });

  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    link.classList.remove('active');
    try {
      const url = new URL(link.href, window.location.origin);
      const linkPath = url.pathname.endsWith('/') && url.pathname !== '/' ? url.pathname.slice(0, -1) : url.pathname;
      const samePath = linkPath === normalized;
      const sameAnchorPage =
        (normalized === '/about' && link.href.includes('/about/#')) ||
        (normalized === '/assets' && link.href.includes('/assets/#')) ||
        (normalized === '/profile' && link.href.includes('/profile/#'));
      if (samePath || sameAnchorPage) {
        link.classList.add('active');
      }
    } catch {
      // ignore external links
    }
  });
}
