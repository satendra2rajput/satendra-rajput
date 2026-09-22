import { Injectable, computed, signal } from '@angular/core';
import { NPM_SCOPE } from '../data/portfolio.data';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

const VERB: Record<PackageManager, string> = {
  npm: 'npm i',
  pnpm: 'pnpm add',
  yarn: 'yarn add',
};

/** Shared state for the npm / pnpm / yarn switch above the library slider. */
@Injectable({ providedIn: 'root' })
export class PackageManagerService {
  readonly managers: PackageManager[] = ['npm', 'pnpm', 'yarn'];
  readonly manager = signal<PackageManager>('npm');
  readonly verb = computed(() => VERB[this.manager()]);

  command(names: string[]): string {
    return `${this.verb()} ${names.map((n) => NPM_SCOPE + n).join(' ')}`;
  }
}
