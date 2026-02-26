/**
 * Archive Module
 * Fetches contribution data from Google Sheets and renders the archive dynamically
 */

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1gzEAcSmZwlPBPSziNlcjXvckQ2K-XN2okdbM2m2i2AE/gviz/tq?tqx=out:csv&gid=0';

/** Era metadata (not in CSV) — order controls display sort (0 = first) */
const ERA_META = {
  '2025 H2': { desc: 'Startup Village Seoul, SuperteamKR Phase 2', order: 0 },
  '2025 H1': { desc: 'SuperteamKR Guild Lead, Monad Blitz Seoul, SEOULNANA', order: 1 },
  '2023 OSSCA': { desc: '과기부 오픈소스 컨트리뷰션 아카데미', order: 2 },
  '2022 Genesis': { desc: 'PDAO Launch Project & Chain Genesis', order: 3 },
};

/** Role string → CSS class + display label */
const ROLE_BADGE_MAP = {
  'dev':          { css: 'dev',         label: 'Dev' },
  'dev lead':     { css: 'lead',        label: 'Dev Lead' },
  'strategy':     { css: 'strategy',    label: 'Strategy' },
  'research':     { css: 'research',    label: 'Research' },
  'mentor':       { css: 'mentor',      label: 'Mentor' },
  'coordinator':  { css: 'coordinator', label: 'Coordinator' },
  'project lead': { css: 'lead',        label: 'Project Lead' },
  'lead':         { css: 'lead',        label: 'Lead' },
  'founder':      { css: 'special',     label: 'Founder' },
  'organizer':    { css: 'special',     label: 'Organizer' },
  'events':       { css: 'events',      label: 'Events' },
  'study':        { css: 'study',       label: 'Study' },
  'director':     { css: 'director',    label: 'Director' },
};

// ---------------------------------------------------------------------------
// CSV Parsing
// ---------------------------------------------------------------------------

/**
 * Parse a single CSV line respecting quoted fields
 */
function parseCSVLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      fields.push(current);
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current);
  return fields;
}

/**
 * Parse full CSV text — skips metadata row 0, uses row 1 as headers
 */
function parseCSV(text) {
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) return [];

  const headers = parseCSVLine(lines[1]);
  const rows = [];

  for (let i = 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const fields = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, idx) => {
      const key = h.trim();
      if (key) obj[key] = (fields[idx] || '').trim();
    });

    if (obj['이름']) rows.push(obj);
  }

  return rows;
}

// ---------------------------------------------------------------------------
// Data Transformation
// ---------------------------------------------------------------------------

/**
 * Group flat CSV rows into era → entries structure
 */
function transformData(rows) {
  const eraMap = new Map();

  for (const row of rows) {
    const category = row['Category'] || '';
    if (!category) continue;

    if (!eraMap.has(category)) eraMap.set(category, []);

    const contributions = [];
    const roleSet = new Set();

    for (let i = 1; i <= 8; i++) {
      const val = row[`Col ${i}`];
      if (!val) continue;

      const colonIdx = val.indexOf(':');
      if (colonIdx === -1) {
        contributions.push({ role: '', description: val });
        continue;
      }

      const role = val.substring(0, colonIdx).trim();
      const description = val.substring(colonIdx + 1).trim();
      if (role) roleSet.add(role);
      if (description) contributions.push({ role, description });
    }

    eraMap.get(category).push({
      name: row['이름'],
      handle: row['Discord Handle'] || '',
      roles: [...roleSet],
      contributions,
    });
  }

  const eras = [];
  for (const [name, entries] of eraMap) {
    entries.sort((a, b) =>
      a.handle.localeCompare(b.handle, undefined, { sensitivity: 'base' })
    );
    eras.push({ name, entries });
  }

  eras.sort((a, b) => {
    const oA = ERA_META[a.name]?.order ?? 999;
    const oB = ERA_META[b.name]?.order ?? 999;
    return oA - oB;
  });

  return eras;
}

// ---------------------------------------------------------------------------
// HTML Rendering (all dynamic values are escaped via escapeHtml)
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderRoleBadges(roles) {
  return roles
    .map(r => {
      const mapped = ROLE_BADGE_MAP[r.toLowerCase()];
      if (!mapped) return '';
      return `<span class="role-badge role-badge--${mapped.css}">${escapeHtml(mapped.label)}</span>`;
    })
    .filter(Boolean)
    .join('\n                    ');
}

function renderEntry(entry) {
  const rolesHTML = renderRoleBadges(entry.roles);
  const listHTML = entry.contributions
    .map(c => `<li>${escapeHtml(c.description)}</li>`)
    .join('\n                    ');

  return `
                <div class="archive-entry">
                  <div class="archive-entry__header">
                    <span class="archive-entry__name">${escapeHtml(entry.name)}</span>
                    <span class="archive-entry__handle">@${escapeHtml(entry.handle)}</span>
                  </div>
                  <div class="archive-entry__roles">
                    ${rolesHTML}
                  </div>
                  <ul class="archive-entry__list">
                    ${listHTML}
                  </ul>
                </div>`;
}

function renderArchive(eras) {
  return eras
    .map((era, idx) => {
      const meta = ERA_META[era.name] || { desc: '' };
      const openAttr = idx === 0 ? ' open' : '';
      const count = era.entries.length;
      const countText = `${count} contributor${count !== 1 ? 's' : ''}`;

      const entriesHTML = era.entries.map(renderEntry).join('\n');

      return `
            <details class="archive-era"${openAttr}>
              <summary>
                <span class="archive-era__name">${escapeHtml(era.name)}</span>
                <span class="archive-era__desc">${escapeHtml(meta.desc)}</span>
                <span class="archive-era__count">${countText}</span>
                <svg class="archive-era__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </summary>
              <div class="archive-era__content">${entriesHTML}
              </div>
            </details>`;
    })
    .join('\n');
}

// ---------------------------------------------------------------------------
// Search / Filter
// ---------------------------------------------------------------------------

function initArchiveSearch() {
  const searchInput = document.getElementById('archive-search');
  const clearBtn = document.getElementById('archive-search-clear');
  const resultSpan = document.getElementById('archive-search-result');
  if (!searchInput) return;

  const eras = document.querySelectorAll('.archive-era');
  const originalOpen = new Map();
  eras.forEach(era => originalOpen.set(era, era.open));

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    clearBtn.hidden = !query;

    if (!query) {
      document.querySelectorAll('.archive-entry').forEach(el => {
        el.style.display = '';
        el.classList.remove('archive-entry--highlight');
      });
      eras.forEach(era => {
        era.style.display = '';
        era.open = originalOpen.get(era);
      });
      resultSpan.textContent = '';
      return;
    }

    let totalMatches = 0;

    eras.forEach(era => {
      let eraMatches = 0;

      era.querySelectorAll('.archive-entry').forEach(entry => {
        const name = (entry.querySelector('.archive-entry__name')?.textContent || '').toLowerCase();
        const handle = (entry.querySelector('.archive-entry__handle')?.textContent || '').toLowerCase();

        if (name.includes(query) || handle.includes(query)) {
          entry.style.display = '';
          entry.classList.add('archive-entry--highlight');
          eraMatches++;
          totalMatches++;
        } else {
          entry.style.display = 'none';
          entry.classList.remove('archive-entry--highlight');
        }
      });

      if (eraMatches > 0) {
        era.style.display = '';
        era.open = true;
      } else {
        era.style.display = 'none';
      }
    });

    resultSpan.textContent = totalMatches > 0
      ? totalMatches + '개의 결과'
      : '검색 결과가 없습니다';
  });

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.dispatchEvent(new Event('input'));
    searchInput.focus();
  });
}

// ---------------------------------------------------------------------------
// Main Entry Point
// ---------------------------------------------------------------------------

export async function initArchive() {
  const container = document.querySelector('.archive');
  if (!container) return;

  container.textContent = '';
  const loading = document.createElement('div');
  loading.className = 'archive-loading';
  loading.textContent = 'Loading contribution archive...';
  container.appendChild(loading);

  try {
    const response = await fetch(SHEET_CSV_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const csvText = await response.text();
    const rows = parseCSV(csvText);
    if (!rows.length) throw new Error('No data parsed from CSV');

    const eras = transformData(rows);

    // Render archive — all values are escaped via escapeHtml before insertion
    container.innerHTML = renderArchive(eras);

    initArchiveSearch();
  } catch (err) {
    console.error('Archive load error:', err);
    container.textContent = '';

    const errorDiv = document.createElement('div');
    errorDiv.className = 'archive-error';

    const msg = document.createElement('p');
    msg.textContent = '활동 기록을 불러오지 못했습니다.';
    errorDiv.appendChild(msg);

    const retryBtn = document.createElement('button');
    retryBtn.className = 'archive-error__retry';
    retryBtn.textContent = '다시 시도';
    retryBtn.addEventListener('click', () => window.location.reload());
    errorDiv.appendChild(retryBtn);

    container.appendChild(errorDiv);
  }
}
