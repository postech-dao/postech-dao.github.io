import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const STATIC = join(import.meta.dirname, '..', 'static');

mkdirSync(STATIC, { recursive: true });
mkdirSync(join(STATIC, 'assets', 'data'), { recursive: true });
