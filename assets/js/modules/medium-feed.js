/**
 * Medium Feed Module
 * Loads pre-built Medium posts from medium.json and renders them.
 */

import { escapeHtml } from './escape-html.js';

let mediumPostsCache = [];
const MAX_LIST_POSTS = 3; // Number of smaller posts to show on the right

/**
 * Initialize Medium feed functionality
 */
export function initMediumFeed() {
  loadMediumPosts();
}

/**
 * Load Medium posts from pre-built JSON
 */
async function loadMediumPosts() {
  const featuredContainer = document.getElementById('medium-featured');
  const listContainer = document.getElementById('medium-list');

  if (!featuredContainer || !listContainer) return;

  featuredContainer.innerHTML = '<p class="loading">Loading Medium posts...</p>';
  listContainer.innerHTML = '';

  try {
    const response = await fetch('assets/data/medium.json');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { posts } = await response.json();

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
    year: 'numeric',
  });
}
