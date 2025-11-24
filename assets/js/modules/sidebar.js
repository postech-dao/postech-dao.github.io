/**
 * Sidebar Module
 * Handles mobile sidebar toggle functionality
 */

export function initSidebar() {
  const toggleBtn = document.querySelector('#sidebar-toggle');
  const nav = document.querySelector('.sidebar__nav');

  if (!toggleBtn || !nav) {
    console.warn('Sidebar toggle button or navigation not found');
    return;
  }

  // Toggle sidebar navigation
  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');

    // Update ARIA attribute for accessibility
    toggleBtn.setAttribute('aria-expanded', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    const isClickInsideSidebar = e.target.closest('.sidebar');
    const isClickOnToggle = e.target.closest('#sidebar-toggle');

    if (!isClickInsideSidebar && !isClickOnToggle && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Close sidebar on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}
