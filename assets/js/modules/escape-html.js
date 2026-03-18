/**
 * Escape HTML-sensitive characters in dynamic strings before template insertion.
 * @param {string} value
 * @returns {string}
 */
export function escapeHtml(value) {
  if (!value) return '';

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
