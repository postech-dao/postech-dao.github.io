import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DATA_DIR = join(process.cwd(), 'static', 'assets', 'data');

export async function readJsonFile<T>(filename: string): Promise<T> {
  const file = join(DATA_DIR, filename);
  const raw = await readFile(file, 'utf8');
  return JSON.parse(raw) as T;
}
