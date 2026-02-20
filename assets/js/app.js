/**
 * PDAO Website - Main Application Entry Point
 * Modern JavaScript with ES6 Modules
 */

import { initSidebar } from './modules/sidebar.js';
import { initComponents } from './modules/components.js';
import { initMediumFeed } from './modules/medium-feed.js';
import { initI18n } from './modules/i18n.js';
import { initHistoryTimeline } from './modules/history-timeline.js';

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');

    // Remove active class from all links first
    link.classList.remove('active');

    // Check if current page matches this link
    if (href && (currentPath.endsWith(href) || (href === 'index.html' && currentPath === '/'))) {
      link.classList.add('active');
    }
  });
}

/**
 * Initialize all modules when DOM is ready
 */
async function init() {
  console.log('PDAO Website initialized');

  // Initialize i18n first
  await initI18n();

  // Load dynamic components (sidebar, footer)
  await initComponents();

  // Initialize sidebar functionality
  initSidebar();

  // Set active navigation link
  setActiveNavLink();

  // Initialize Medium feed (only on pages with medium-posts container)
  if (document.getElementById('medium-posts')) {
    initMediumFeed();
  }

  // Initialize History timeline (only on pages with history-timeline)
  if (document.querySelector('.history-timeline')) {
    initHistoryTimeline();
  }

  // Initialize 3D hero (only on pages with hero-3d-container)
  if (document.getElementById('hero-3d-container')) {
    // Dynamically import hero-3d module only when needed
    import('./modules/hero-3d.js')
      .then(module => module.initHero3D())
      .catch(err => console.error('Failed to load 3D hero:', err));
  }

  // Add smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
