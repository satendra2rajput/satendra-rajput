import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  NgZone,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { NAV_LINKS, PROFILE } from '../../../core/data/portfolio.data';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly links = NAV_LINKS;
  protected readonly npmUrl = PROFILE.links.npm;

  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  protected readonly active = signal('');

  constructor() {
    const zone = inject(NgZone);
    const destroyRef = inject(DestroyRef);
    const isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

    afterNextRender(() => {
      if (!isBrowser) return;
      zone.runOutsideAngular(() => {
        // shadow under the navbar once the page scrolls
        const onScroll = (): void => {
          const next = window.scrollY > 10;
          if (next !== this.scrolled()) this.scrolled.set(next);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        // scroll-spy: highlight the link of the section in the middle of the screen
        const spy = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) if (entry.isIntersecting) this.active.set(entry.target.id);
          },
          { rootMargin: '-45% 0px -50% 0px' },
        );
        for (const link of this.links) {
          const section = document.getElementById(link.id);
          if (section) spy.observe(section);
        }

        destroyRef.onDestroy(() => {
          window.removeEventListener('scroll', onScroll);
          spy.disconnect();
        });
      });
    });
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    this.open.set(false);
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentClick(event: Event): void {
    const target = event.target as Element | null;
    if (!target?.closest?.('.nav')) this.open.set(false);
  }
}
