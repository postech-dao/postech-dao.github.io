import { readJsonFile } from '$lib/server/data';
import type { ArchiveEra } from '$lib/types';

export async function load(): Promise<{ eras: ArchiveEra[] }> {
  const eras = await readJsonFile<ArchiveEra[]>('archive.json');
  return {
    eras,
  };
}
