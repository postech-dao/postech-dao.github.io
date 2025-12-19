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
const MAX_LIST_POSTS = 3; // Number of smaller posts to show on the right

/**
 * Initialize Medium feed functionality
 */
export function initMediumFeed() {
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
  const featuredContainer = document.getElementById('medium-featured');
  const listContainer = document.getElementById('medium-list');

  if (!featuredContainer || !listContainer) return;

  featuredContainer.innerHTML = '<p class="loading">Loading Medium posts...</p>';
  listContainer.innerHTML = '';

  try {
    const rssString = await fetchWithProxy(MEDIUM_FEED_URL);
    const posts = parseMediumRss(rssString);

    if (!Array.isArray(posts) || posts.length === 0) {
      featuredContainer.innerHTML = '<p class="empty">No posts found.</p>';
      return;
    }

    mediumPostsCache = posts;
    renderMediumPosts();
  } catch (err) {
    console.error('Medium feed error:', err);
    featuredContainer.innerHTML = '<p class="error">Failed to load Medium posts.</p>';
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
    const creator = item.getElementsByTagName('dc:creator')[0]?.textContent || '';

    const publishedAt = toIsoDate(pubDate);
    const summary = buildSummaryFromDescription(description);

    // Try to get thumbnail from content:encoded first, then fall back to description
    const thumbnail = extractThumbnailFromDescription(contentEncoded) ||
                      extractThumbnailFromDescription(description);

    return {
      id: guid,
      title,
      author: creator,
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
  const featuredContainer = document.getElementById('medium-featured');
  const listContainer = document.getElementById('medium-list');

  if (!featuredContainer || !listContainer) return;

  const posts = mediumPostsCache || [];

  if (posts.length === 0) {
    featuredContainer.innerHTML = '<p class="empty">No posts found.</p>';
    listContainer.innerHTML = '';
    return;
  }

  // Render the first post as featured (large)
  const [featuredPost, ...remainingPosts] = posts;
  featuredContainer.innerHTML = renderFeaturedPost(featuredPost);

  // Render up to MAX_LIST_POSTS smaller posts
  const listPosts = remainingPosts.slice(0, MAX_LIST_POSTS);
  listContainer.innerHTML = listPosts.map(renderListPost).join('');
}

/**
 * Render the featured post (large card on the left)
 */
function renderFeaturedPost(post) {
  const date = formatDate(post.publishedAt);
  const title = escapeHtml(post.title);
  const summary = escapeHtml(post.summary || '');
  const author = escapeHtml(post.author || 'PDAO');

  const thumbnailImg = post.thumbnail
    ? `<img src="${post.thumbnail}" alt="${title}" />`
    : `<img src="images/poppin/6.png" alt="${title}" />`;

  return `
    <div class="article-featured">
      <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="article-featured__image">
        ${thumbnailImg}
      </a>
      <div class="article-featured__content">
        <div class="article-featured__date">${date}</div>
        <h3 class="article-featured__title">
          <a href="${post.url}" target="_blank" rel="noopener noreferrer">${title}</a>
        </h3>
        <p class="article-featured__description">${summary}</p>
        <div class="article-author">
          <div class="article-author__avatar">
            <img src="images/logo/favicon.png" alt="${author}">
          </div>
          <span class="article-author__name">${author}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Render a smaller post in the list (right side)
 */
function renderListPost(post) {
  const date = formatDate(post.publishedAt);
  const title = escapeHtml(post.title);
  const author = escapeHtml(post.author || 'PDAO');

  const thumbnailImg = post.thumbnail
    ? `<img src="${post.thumbnail}" alt="${title}" />`
    : `<img src="images/poppin/6.png" alt="${title}" />`;

  return `
    <div class="article-item">
      <a href="${post.url}" target="_blank" rel="noopener noreferrer" class="article-item__image">
        ${thumbnailImg}
      </a>
      <div class="article-item__content">
        <div class="article-item__date">${date}</div>
        <h4 class="article-item__title">
          <a href="${post.url}" target="_blank" rel="noopener noreferrer">${title}</a>
        </h4>
        <div class="article-author">
          <div class="article-author__avatar">
            <img src="images/logo/favicon.png" alt="${author}">
          </div>
          <span class="article-author__name">${author}</span>
        </div>
      </div>
    </div>
  `;
}

/**
 * Format ISO date string to readable format: Month Day, Year
 */
function formatDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  if (Number.isNaN(d.getTime())) return '';
  
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
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
