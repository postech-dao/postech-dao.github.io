/**
 * History Timeline Module
 * Scroll-driven vertical timeline using window scroll events
 */

export function initHistoryTimeline() {
  const container = document.querySelector('.history-timeline');
  const sections = document.querySelectorAll('.history-section');

  if (!container || !sections.length) return;

  let activeYear = null;

  function setActiveYear(year) {
    if (year === activeYear) return;
    activeYear = year;

    sections.forEach((s) => s.classList.remove('active'));
    const target = document.querySelector(
      `.history-section[data-year="${year}"]`
    );
    if (target) target.classList.add('active');
  }

  function onScroll() {
    const triggerY = window.scrollY + window.innerHeight * 0.35;

    let current = sections[0];

    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;

      if (sectionTop <= triggerY) {
        current = section;
      } else {
        break;
      }
    }

    if (current) {
      setActiveYear(current.dataset.year);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Set initial active state
  onScroll();
}
