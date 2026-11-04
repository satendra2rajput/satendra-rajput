import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NAV_LINKS, PROFILE } from '../../../core/data/portfolio.data';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  // dependencies: field-level inject() — the idiomatic style, no constructor needed for them
  protected readonly theme = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly links = NAV_LINKS;
  protected readonly npmUrl = PROFILE.links.npm;

  protected readonly open = signal(false);
  protected readonly scrolled = signal(false);
  /** id of the home-page section currently in view — only meaningful while on '/' */
  protected readonly active = signal('');

  private spy?: IntersectionObserver;

  constructor() {
    // browser-only DOM work: afterNextRender never runs during server rendering / prerendering
    afterNextRender(() => {
      this.watchScroll();
      this.watchSections();
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

  /** shadow under the navbar once the page scrolls (same on every route) */
  private watchScroll(): void {
    const onScroll = (): void => this.scrolled.set(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
  }

  /**
   * The home sections only exist in the DOM on '/', and are re-created every time we navigate
   * back to it — so the scroll-spy is (re)bound after every navigation.
   */
  private watchSections(): void {
    this.bindSpy();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => setTimeout(() => this.bindSpy(), 0));
    this.destroyRef.onDestroy(() => this.spy?.disconnect());
  }

  private bindSpy(): void {
    this.spy?.disconnect();
    this.active.set('');
    if (this.router.url.split(/[?#]/)[0] !== '/') return;

    this.spy = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) this.active.set(entry.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    for (const link of this.links) {
      const section = document.getElementById(link.id);
      if (section) this.spy.observe(section);
    }
  }
}
