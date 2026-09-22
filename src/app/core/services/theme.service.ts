import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';

export type ThemeMode = 'light' | 'dark';
const STORAGE_KEY = 'sr-theme';

/**
 * Light / dark toggle.
 * - no saved choice  -> follows the system (prefers-color-scheme)
 * - after a click    -> saved in localStorage and applied as <html data-theme="...">
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly mode = signal<ThemeMode | null>(null);

  constructor() {
    if (this.isBrowser) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') this.mode.set(saved);
      } catch {
        /* storage can be blocked — the site still works */
      }
    }
    effect(() => {
      const mode = this.mode();
      const root = this.doc.documentElement;
      if (mode) root.setAttribute('data-theme', mode);
      else root.removeAttribute('data-theme');
    });
  }

  toggle(): void {
    const next: ThemeMode = this.isDark() ? 'light' : 'dark';
    this.mode.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }

  private isDark(): boolean {
    const mode = this.mode();
    if (mode) return mode === 'dark';
    return this.isBrowser && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
