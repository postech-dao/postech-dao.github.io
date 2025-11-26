/**
 * Component Loader Module
 * Dynamically loads sidebar and footer components
 */

/**
 * Load HTML component from file
 * @param {string} componentPath - Path to the component HTML file
 * @returns {Promise<string>} - The HTML content
 */
async function loadComponent(componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`Failed to load component: ${componentPath}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading component:', error);
    return '';
  }
}

/**
 * Set active navigation state based on current page
 */
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const pageName = currentPage.replace('.html', '');

  // Set active state on nav group titles
  document.querySelectorAll('.nav-group__title--link[data-page]').forEach(link => {
    if (link.dataset.page === pageName) {
      link.classList.add('active');
    }
  });
}

/**
 * Initialize sidebar component
 */
export async function initSidebarComponent() {
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

  if (sidebarPlaceholder) {
    const sidebarHTML = await loadComponent('components/sidebar.html');
    sidebarPlaceholder.outerHTML = sidebarHTML;
    setActiveNav();
  }
}

/**
 * Initialize footer component
 */
export async function initFooterComponent() {
  const footerPlaceholder = document.getElementById('footer-placeholder');

  if (footerPlaceholder) {
    const footerHTML = await loadComponent('components/footer.html');
    footerPlaceholder.outerHTML = footerHTML;
  }
}

/**
 * Initialize all components
 */
export async function initComponents() {
  await Promise.all([
    initSidebarComponent(),
    initFooterComponent()
  ]);
}
