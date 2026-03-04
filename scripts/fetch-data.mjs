/**
 * Fetch external data at build time and save as static JSON.
 *
 * - Google Sheets CSV  → dist/assets/data/archive.json
 * - Medium RSS feed    → dist/assets/data/medium.json
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST_DATA = join(import.meta.dirname, '..', 'dist', 'assets', 'data');

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1gzEAcSmZwlPBPSziNlcjXvckQ2K-XN2okdbM2m2i2AE/gviz/tq?tqx=out:csv&gid=0';

const MEDIUM_FEED_URL = 'https://medium.com/feed/postech-dao';

// ---------------------------------------------------------------------------
// CSV helpers (ported from archive.js)
// ---------------------------------------------------------------------------

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

    if (obj.이름) rows.push(obj);
  }

  return rows;
}

function transformData(rows) {
  const eraMap = new Map();

  for (const row of rows) {
    const category = row.Category || '';
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
      name: row.이름,
      handle: row['Discord Handle'] || '',
      roles: [...roleSet],
      contributions,
    });
  }

  const ERA_ORDER = {
    '2025 H2': 0,
    '2025 H1': 1,
    '2023 OSSCA': 2,
    '2022 Genesis': 3,
  };

  const eras = [];
  for (const [name, entries] of eraMap) {
    entries.sort((a, b) => a.handle.localeCompare(b.handle, undefined, { sensitivity: 'base' }));
    eras.push({ name, entries });
  }

  eras.sort((a, b) => {
    const oA = ERA_ORDER[a.name] ?? 999;
    const oB = ERA_ORDER[b.name] ?? 999;
    return oA - oB;
  });

  return eras;
}

// ---------------------------------------------------------------------------
// Medium RSS helpers
// ---------------------------------------------------------------------------

function extractText(xml, tag) {
  const re = new RegExp(
    `<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`,
  );
  const m = xml.match(re);
  if (!m) return '';
  return m[1] ?? m[2] ?? '';
}

function extractThumbnail(html) {
  const m = html.match(/<img[^>]+src="([^"]+)"/);
  return m ? m[1] : null;
}

function buildSummary(html, maxLength = 180) {
  const text = html.replace(/<[^>]+>/g, '').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function parseMediumRss(xml) {
  const items = [];
  let rest = xml;

  while (true) {
    const start = rest.indexOf('<item>');
    if (start === -1) break;
    const end = rest.indexOf('</item>', start);
    if (end === -1) break;
    items.push(rest.slice(start, end + 7));
    rest = rest.slice(end + 7);
  }

  const posts = items.map((item) => {
    const title = extractText(item, 'title');
    const link = extractText(item, 'link');
    const guid = extractText(item, 'guid') || link;
    const pubDate = extractText(item, 'pubDate');
    const description = extractText(item, 'description');
    const contentEncoded = extractText(item, 'content:encoded');
    const creator = extractText(item, 'dc:creator');

    const publishedAt = pubDate ? new Date(pubDate).toISOString() : '';
    const summary = buildSummary(description);
    const thumbnail = extractThumbnail(contentEncoded) || extractThumbnail(description);

    return { id: guid, title, author: creator, url: link, summary, publishedAt, thumbnail };
  });

  posts.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
  return posts;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function fetchArchive() {
  console.log('Fetching Google Sheets CSV...');
  const res = await fetch(SHEET_CSV_URL);
  if (!res.ok) throw new Error(`Google Sheets HTTP ${res.status}`);
  const csv = await res.text();
  const rows = parseCSV(csv);
  if (!rows.length) throw new Error('No data parsed from CSV');
  const eras = transformData(rows);
  return eras;
}

async function fetchMedium() {
  console.log('Fetching Medium RSS...');
  const res = await fetch(MEDIUM_FEED_URL);
  if (!res.ok) throw new Error(`Medium RSS HTTP ${res.status}`);
  const xml = await res.text();
  const posts = parseMediumRss(xml);
  if (!posts.length) console.warn('Warning: no Medium posts parsed');
  return posts;
}

export async function fetchData() {
  mkdirSync(DIST_DATA, { recursive: true });

  const [eras, posts] = await Promise.all([fetchArchive(), fetchMedium()]);

  writeFileSync(join(DIST_DATA, 'archive.json'), JSON.stringify(eras));
  console.log(`  -> archive.json (${eras.length} eras)`);

  writeFileSync(join(DIST_DATA, 'medium.json'), JSON.stringify({ posts }));
  console.log(`  -> medium.json (${posts.length} posts)`);
}

// Run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  fetchData().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
