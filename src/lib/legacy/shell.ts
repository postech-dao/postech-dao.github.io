export function isSidebarAnchorActive(
  currentPath: string,
  currentHash: string,
  href: string,
): boolean {
  try {
    const url = new URL(href, 'https://example.com');
    const linkPath =
      url.pathname.endsWith('/') && url.pathname !== '/' ? url.pathname.slice(0, -1) : url.pathname;
    const normalizedPath =
      currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;

    if (linkPath !== normalizedPath) return false;
    if (!url.hash) return !currentHash;
    return currentHash === url.hash;
  } catch {
    return false;
  }
}

export function setActiveNav(
  currentPath: string = window.location.pathname,
  currentHash: string = window.location.hash,
): void {
  const normalized =
    currentPath.endsWith('/') && currentPath !== '/' ? currentPath.slice(0, -1) : currentPath;
  const pageName =
    normalized === '/' ? 'index' : normalized.split('/').filter(Boolean)[0] || 'index';

  document.querySelectorAll<HTMLElement>('.nav-group__title--link[data-page]').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });

  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    const active = isSidebarAnchorActive(currentPath, currentHash, link.href);
    link.classList.toggle('active', active);
  });
}
