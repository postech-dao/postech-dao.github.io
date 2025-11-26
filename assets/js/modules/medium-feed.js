/**
 * Medium Feed Module
 * Fetches and displays posts from Medium RSS feed
 */

const MEDIUM_FEED_URL = 'https://medium.com/feed/postech-dao';

// Multiple CORS proxy options for fallback
const CORS_PROXIES = [
  {
    name: 'corsproxy.io',
    buildUrl: (url) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
    parseResponse: async (res) => res.text()
  },
  {
    name: 'allorigins',
    buildUrl: (url) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    parseResponse: async (res) => res.text()
  },
  {
    name: 'cors-anywhere-alt',
    buildUrl: (url) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`,
    parseResponse: async (res) => res.text()
  }
];

let mediumPostsCache = [];
let isViewAll = false;
const DEFAULT_VISIBLE_COUNT = 3;

/**
 * Initialize Medium feed functionality
 */
export function initMediumFeed() {
  const viewAllBtn = document.getElementById('view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', onToggleViewAll);
  }

  loadMediumPosts();
}

/**
 * Try fetching RSS through multiple proxy services
 */
async function fetchWithProxy(feedUrl) {
  for (const proxy of CORS_PROXIES) {
    try {
      const url = proxy.buildUrl(feedUrl);
      console.log(`Trying ${proxy.name}...`);

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${proxy.name} returned ${res.status}`);
      }

      const rssString = await proxy.parseResponse(res);
      if (rssString && rssString.includes('<item>')) {
        console.log(`Success with ${proxy.name}`);
        return rssString;
      }
      throw new Error(`${proxy.name} returned invalid RSS`);
    } catch (err) {
      console.warn(`${proxy.name} failed:`, err.message);
      continue;
    }
  }
  throw new Error('All CORS proxies failed');
}

/**
 * Load Medium posts from RSS feed
 */
async function loadMediumPosts() {
  const container = document.getElementById('medium-posts');
  if (!container) return;

  container.innerHTML = '<p class="loading">Loading Medium posts...</p>';

  try {
    const rssString = await fetchWithProxy(MEDIUM_FEED_URL);
    const posts = parseMediumRss(rssString);

    if (!Array.isArray(posts) || posts.length === 0) {
      container.innerHTML = '<p class="empty">No posts found.</p>';
      return;
    }

    mediumPostsCache = posts;
    renderMediumPosts();
  } catch (err) {
    console.error('Medium feed error:', err);
    container.innerHTML = '<p class="error">Failed to load Medium posts.</p>';
  }
}

/**
 * Parse Medium RSS XML string
 */
function parseMediumRss(rssString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rssString, 'application/xml');

  const items = Array.from(xmlDoc.querySelectorAll('item'));

  const posts = items.map((item) => {
    const title = item.querySelector('title')?.textContent || '';
    const link = item.querySelector('link')?.textContent || '';
    const guid = item.querySelector('guid')?.textContent || link;
    const pubDate = item.querySelector('pubDate')?.textContent || '';
    const description = item.querySelector('description')?.textContent || '';

    // Medium uses content:encoded for full HTML content with images
    const contentEncoded = item.getElementsByTagName('content:encoded')[0]?.textContent || '';

    const publishedAt = toIsoDate(pubDate);
    const summary = buildSummaryFromDescription(description);

    // Try to get thumbnail from content:encoded first, then fall back to description
    const thumbnail = extractThumbnailFromDescription(contentEncoded) ||
                      extractThumbnailFromDescription(description);

    return {
      id: guid,
      title,
      url: link,
      summary,
      publishedAt,
      thumbnail,
    };
  });

  // Sort by newest first
  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

  return posts;
}

/**
 * Convert pubDate string to ISO date
 */
function toIsoDate(pubDate) {
  if (!pubDate) return '';
  const d = new Date(pubDate);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString();
}

/**
 * Build summary text from HTML description
 */
function buildSummaryFromDescription(htmlString, maxLength = 180) {
  if (!htmlString) return '';
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  const text = (temp.textContent || '').trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Extract thumbnail image from HTML description
 */
function extractThumbnailFromDescription(htmlString) {
  if (!htmlString) return null;
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  const img = temp.querySelector('img');
  return img ? img.getAttribute('src') : null;
}

/**
 * Render Medium posts to the container
 */
function renderMediumPosts() {
  const container = document.getElementById('medium-posts');
  if (!container) return;

  const posts = mediumPostsCache || [];

  const visiblePosts = isViewAll
    ? posts
    : posts.slice(0, DEFAULT_VISIBLE_COUNT);

  container.innerHTML = visiblePosts.map(renderMediumPost).join('');

  updateViewAllButton(posts.length);
}

/**
 * Render a single Medium post card
 */
function renderMediumPost(post) {
  const date = formatDate(post.publishedAt);
  const title = escapeHtml(post.title);
  const summary = escapeHtml(post.summary || '');

  const thumbnailImg = post.thumbnail
    ? `<div class="card__image-wrapper"><img src="${post.thumbnail}" alt="${title}" /></div>`
    : `<div class="card__image-wrapper"><img src="images/6.png" alt="${title}" /></div>`;

  return `
    <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="card">
      ${thumbnailImg}
      <div class="card__content">
        <span class="card__tag">Medium</span>
        <h3 class="card__title">${title}</h3>
        <p class="card__description">${summary}</p>
        <div class="card__meta">
          <span>${date}</span>
        </div>
      </div>
    </a>
  `;
}

/**
 * Toggle between showing all posts and limited posts
 */
function onToggleViewAll() {
  isViewAll = !isViewAll;
  renderMediumPosts();
}

/**
 * Update the View all button text and visibility
 */
function updateViewAllButton(totalCount) {
  const btn = document.getElementById('view-all-btn');
  if (!btn) return;

  if (totalCount <= DEFAULT_VISIBLE_COUNT) {
    btn.style.display = 'none';
    return;
  }

  btn.style.display = 'inline-block';
  btn.textContent = isViewAll ? 'Show less' : 'View all';
}

/**
 * Format ISO date string to readable format
 */
function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

/**
 * Escape HTML characters to prevent XSS
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
