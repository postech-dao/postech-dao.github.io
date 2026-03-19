interface SectionTarget {
  hash: string;
  element: HTMLElement;
}

export function normalizePath(path: string): string {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

export function isSidebarAnchorActive(
  currentPath: string,
  currentHash: string,
  href: string,
  activeHash: string = currentHash,
): boolean {
  try {
    const url = new URL(href, 'https://example.com');
    const linkPath = normalizePath(url.pathname);
    const normalizedPath = normalizePath(currentPath);

    if (linkPath !== normalizedPath) return false;
    if (!url.hash) return !activeHash;
    return activeHash === url.hash;
  } catch {
    return false;
  }
}

export function pickActiveSectionHash(
  sectionTops: Array<{ hash: string; top: number }>,
  triggerY: number,
  fallbackHash = '',
): string {
  if (sectionTops.length === 0) return fallbackHash;

  let candidate = fallbackHash || sectionTops[0].hash;

  for (const section of sectionTops) {
    if (section.top <= triggerY) {
      candidate = section.hash;
    } else {
      break;
    }
  }

  return candidate;
}

function getSectionTargets(currentPath: string): SectionTarget[] {
  const normalizedPath = normalizePath(currentPath);

  return Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'))
    .map((link) => {
      try {
        const url = new URL(link.href, window.location.origin);
        if (normalizePath(url.pathname) !== normalizedPath || !url.hash) return null;
        const element = document.querySelector<HTMLElement>(url.hash);
        if (!element) return null;
        return { hash: url.hash, element } satisfies SectionTarget;
      } catch {
        return null;
      }
    })
    .filter((target): target is SectionTarget => target !== null);
}

export function setActiveNav(
  currentPath: string = window.location.pathname,
  currentHash: string = window.location.hash,
  activeHash: string = currentHash,
): void {
  const normalized = normalizePath(currentPath);
  const pageName = normalized === '/' ? 'index' : normalized.split('/').filter(Boolean)[0] || 'index';

  document.querySelectorAll<HTMLElement>('.nav-group__title--link[data-page]').forEach((link) => {
    link.classList.toggle('active', link.dataset.page === pageName);
  });

  document.querySelectorAll<HTMLAnchorElement>('.nav-link').forEach((link) => {
    const active = isSidebarAnchorActive(currentPath, currentHash, link.href, activeHash);
    link.classList.toggle('active', active);
  });
}

export function initScrollAwareNav(
  currentPath: string = window.location.pathname,
  currentHash: string = window.location.hash,
): () => void {
  const sections = getSectionTargets(currentPath);
  if (sections.length === 0) {
    setActiveNav(currentPath, currentHash);
    return () => {};
  }

  let activeHash = currentHash || sections[0].hash;
  const visible = new Map<string, number>();

  const updateByScroll = () => {
    const triggerY = window.innerHeight * 0.35;
    const positions = sections.map((section) => ({
      hash: section.hash,
      top: section.element.getBoundingClientRect().top,
    }));

    if (visible.size > 0) {
      const sortedVisible = [...visible.entries()].sort((left, right) => left[1] - right[1]);
      activeHash = sortedVisible[0][0];
    } else {
      activeHash = pickActiveSectionHash(positions, triggerY, sections[0].hash);
    }

    setActiveNav(currentPath, currentHash, activeHash);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const hash = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          visible.set(hash, entry.boundingClientRect.top);
        } else {
          visible.delete(hash);
        }
      }
      updateByScroll();
    },
    {
      rootMargin: '-35% 0px -55% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 1],
    },
  );

  for (const section of sections) {
    observer.observe(section.element);
  }

  window.addEventListener('scroll', updateByScroll, { passive: true });
  updateByScroll();

  return () => {
    observer.disconnect();
    window.removeEventListener('scroll', updateByScroll);
  };
}
