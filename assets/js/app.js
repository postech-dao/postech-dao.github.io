/**
 * PDAO Website - Main Application Entry Point
 * Modern JavaScript with ES6 Modules
 */

import { initSidebar } from './modules/sidebar.js';
import { initComponents } from './modules/components.js';
import { initMediumFeed } from './modules/medium-feed.js';

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
