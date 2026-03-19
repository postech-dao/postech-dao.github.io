import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = join(import.meta.dirname, '..', 'static', 'assets', 'data');
const BUILD_CACHE_DIR = join(import.meta.dirname, '..', 'build', 'assets', 'data');
const ARCHIVE_OUTPUT = join(OUTPUT_DIR, 'archive.json');
const MEDIUM_OUTPUT = join(OUTPUT_DIR, 'medium.json');
const ARCHIVE_CACHE = join(BUILD_CACHE_DIR, 'archive.json');
const MEDIUM_CACHE = join(BUILD_CACHE_DIR, 'medium.json');
const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1gzEAcSmZwlPBPSziNlcjXvckQ2K-XN2okdbM2m2i2AE/gviz/tq?tqx=out:csv&gid=0';
const MEDIUM_FEED_URL = 'https://medium.com/feed/postech-dao';

interface ArchiveContribution {
  role: string;
  description: string;
}
interface ArchiveEntry {
  name: string;
  handle: string;
  roles: string[];
  contributions: ArchiveContribution[];
}
interface ArchiveEra {
  name: string;
  entries: ArchiveEntry[];
}
interface MediumPost {
  id: string;
  title: string;
  author: string;
  url: string;
  summary: string;
  publishedAt: string;
  thumbnail: string | null;
}

function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const ch = line[index];
    if (inQuotes) {
      if (ch === '"') {
        if (line[index + 1] === '"') {
          current += '"';
          index += 1;
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

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/);
  if (lines.length < 3) return [];
  const headers = parseCSVLine(lines[1]);
  const rows: Record<string, string>[] = [];
  for (let index = 2; index < lines.length; index += 1) {
    const line = lines[index].trim();
    if (!line) continue;
    const fields = parseCSVLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, fieldIndex) => {
      const key = header.trim();
      if (key) row[key] = (fields[fieldIndex] || '').trim();
    });
    if (row.이름) rows.push(row);
  }
  return rows;
}

function transformArchive(rows: Record<string, string>[]): ArchiveEra[] {
  const eraMap = new Map<string, ArchiveEntry[]>();
  for (const row of rows) {
    const category = row.Category || '';
    if (!category) continue;
    if (!eraMap.has(category)) eraMap.set(category, []);
    const contributions: ArchiveContribution[] = [];
    const roleSet = new Set<string>();
    for (let index = 1; index <= 8; index += 1) {
      const value = row[`Col ${index}`];
      if (!value) continue;
      const colonIndex = value.indexOf(':');
      if (colonIndex === -1) {
        contributions.push({ role: '', description: value });
        continue;
      }
      const role = value.slice(0, colonIndex).trim();
      const description = value.slice(colonIndex + 1).trim();
      if (role) roleSet.add(role);
      if (description) contributions.push({ role, description });
    }
    eraMap.get(category)?.push({ name: row.이름, handle: row['Discord Handle'] || '', roles: [...roleSet], contributions });
  }
  const eraOrder: Record<string, number> = { '2025 H2': 0, '2025 H1': 1, '2023 OSSCA': 2, '2022 Genesis': 3 };
  const eras = [...eraMap.entries()].map(([name, entries]) => ({
    name,
    entries: [...entries].sort((left, right) => left.handle.localeCompare(right.handle, undefined, { sensitivity: 'base' }))
  }));
  eras.sort((left, right) => (eraOrder[left.name] ?? 999) - (eraOrder[right.name] ?? 999));
  return eras;
}

function extractText(xml: string, tag: string): string {
  const pattern = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`);
  const match = xml.match(pattern);
  return match ? (match[1] ?? match[2] ?? '') : '';
}
function extractThumbnail(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}
function buildSummary(html: string, maxLength = 180): string {
  const text = html.replace(/<[^>]+>/g, '').trim();
  return text.length <= maxLength ? text : `${text.slice(0, maxLength).trim()}...`;
}
function parseMediumRss(xml: string): MediumPost[] {
  const items: string[] = [];
  let rest = xml;
  while (true) {
    const start = rest.indexOf('<item>');
    if (start === -1) break;
    const end = rest.indexOf('</item>', start);
    if (end === -1) break;
    items.push(rest.slice(start, end + 7));
    rest = rest.slice(end + 7);
  }
  return items
    .map((item) => {
      const title = extractText(item, 'title');
      const link = extractText(item, 'link');
      const guid = extractText(item, 'guid') || link;
      const pubDate = extractText(item, 'pubDate');
      const description = extractText(item, 'description');
      const contentEncoded = extractText(item, 'content:encoded');
      const creator = extractText(item, 'dc:creator');
      return {
        id: guid,
        title,
        author: creator,
        url: link,
        summary: buildSummary(description),
        publishedAt: pubDate ? new Date(pubDate).toISOString() : '',
        thumbnail: extractThumbnail(contentEncoded) || extractThumbnail(description)
      } satisfies MediumPost;
    })
    .sort((left, right) => new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime());
}

async function fetchTextOrThrow(url: string, label: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${label} HTTP ${response.status}`);
  return response.text();
}

function restoreFromCache(): boolean {
  if (existsSync(ARCHIVE_CACHE) && existsSync(MEDIUM_CACHE)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    copyFileSync(ARCHIVE_CACHE, ARCHIVE_OUTPUT);
    copyFileSync(MEDIUM_CACHE, MEDIUM_OUTPUT);
    console.warn('Using cached data from previous v2 build output.');
    return true;
  }
  return false;
}

async function main(): Promise<void> {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  try {
    const [csv, rss] = await Promise.all([
      fetchTextOrThrow(SHEET_CSV_URL, 'Google Sheets'),
      fetchTextOrThrow(MEDIUM_FEED_URL, 'Medium RSS')
    ]);
    const archive = transformArchive(parseCSV(csv));
    const medium = { posts: parseMediumRss(rss) };
    writeFileSync(ARCHIVE_OUTPUT, JSON.stringify(archive));
    writeFileSync(MEDIUM_OUTPUT, JSON.stringify(medium));
  } catch (error) {
    if (!restoreFromCache()) {
      throw error;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
