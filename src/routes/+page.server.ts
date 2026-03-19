import { readJsonFile } from '$lib/server/data';
import type { MediumPost } from '$lib/types';

export async function load(): Promise<{ posts: MediumPost[] }> {
  const data = await readJsonFile<{ posts: MediumPost[] }>('medium.json');
  return {
    posts: data.posts ?? [],
  };
}
