import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { LIBRARIES, NPM_SCOPE, PROFILE } from '../../../core/data/portfolio.data';
import { ClipboardService } from '../../../core/services/clipboard.service';
import { PackageManagerService } from '../../../core/services/package-manager.service';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

/**
 * The 9 published @kudoengineer packages:
 * - slider (arrows, keyboard, mouse-drag, native swipe on touch) with live "1–3 of 9" counter + progress bar
 * - copy-to-clipboard install command per card, plus "copy all"
 * - npm / pnpm / yarn switch (shared via PackageManagerService)
 */
@Component({
  selector: 'app-libraries',
  imports: [RevealDirective],
  templateUrl: './libraries.component.html',
  host: { class: 'contents' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibrariesComponent implements AfterViewInit, OnDestroy {
  protected readonly libs = LIBRARIES;
  protected readonly scope = NPM_SCOPE;
  protected readonly npmProfile = PROFILE.links.npm;
  protected readonly pm = inject(PackageManagerService);

  private readonly clipboard = inject(ClipboardService);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly trackRef = viewChild.required<ElementRef<HTMLElement>>('track');

  /* ---------------- copy state ---------------- */
  protected readonly copied = signal<string | null>(null);
  protected readonly allState = signal<'idle' | 'copied' | 'failed'>('idle');
  protected readonly live = signal('');
  private copiedTimer = 0;
  private allTimer = 0;

  /* ---------------- slider state ---------------- */
  protected readonly first = signal(1);
  protected readonly last = signal(3);
  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(false);
  protected readonly rangeLabel = computed(() => (this.first() === this.last() ? String(this.first()) : `${this.first()}–${this.last()}`));
  protected readonly progress = computed(() => (this.last() / this.libs.length) * 100);

  private raf = 0;
  private down = false;
  private moved = 0;
  private startX = 0;
  private startLeft = 0;

  ngAfterViewInit(): void {
    if (this.isBrowser) this.update();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    clearTimeout(this.copiedTimer);
    clearTimeout(this.allTimer);
    this.removeDragListeners();
  }

  /* ============================== copy ============================== */
  protected async copy(name: string): Promise<void> {
    const text = this.pm.command([name]);
    const ok = await this.clipboard.copy(text);
    this.live.set(ok ? `Copied: ${text}` : `Press Ctrl+C to copy: ${text}`);
    if (!ok) return;
    this.copied.set(name);
    clearTimeout(this.copiedTimer);
    this.copiedTimer = window.setTimeout(() => this.copied.set(null), 1800);
  }

  protected async copyAll(): Promise<void> {
    const text = this.pm.command(this.libs.map((l) => l.name));
    const ok = await this.clipboard.copy(text);
    this.live.set(ok ? `Copied install command for all ${this.libs.length} packages` : 'Copy failed');
    this.allState.set(ok ? 'copied' : 'failed');
    clearTimeout(this.allTimer);
    this.allTimer = window.setTimeout(() => this.allState.set('idle'), 1800);
  }

  /* ============================= slider ============================== */
  private get track(): HTMLElement {
    return this.trackRef().nativeElement;
  }

  private gap(): number {
    return parseFloat(getComputedStyle(this.track).columnGap) || 20;
  }

  private slideWidth(): number {
    const first = this.track.querySelector<HTMLElement>('.slide');
    return first ? first.offsetWidth : 0;
  }

  private step(): number {
    return this.slideWidth() + this.gap();
  }

  private perView(): number {
    const step = this.step();
    return step > 0 ? Math.max(1, Math.floor((this.track.clientWidth + this.gap()) / step + 0.02)) : 1;
  }

  private behavior(): ScrollBehavior {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
  }

  protected onScroll(): void {
    if (this.raf) return;
    this.raf = requestAnimationFrame(() => {
      this.raf = 0;
      this.update();
    });
  }

  @HostListener('window:resize')
  protected update(): void {
    if (!this.isBrowser) return;
    const track = this.track;
    const total = this.libs.length;
    const step = this.step();
    if (!step) return;

    const view = this.perView();
    const maxLeft = track.scrollWidth - track.clientWidth;
    const end = track.scrollLeft >= maxLeft - 2;

    let first = end ? total - view + 1 : Math.round(track.scrollLeft / step) + 1;
    first = Math.min(Math.max(1, first), Math.max(1, total - view + 1));

    this.first.set(first);
    this.last.set(Math.min(total, first + view - 1));
    this.atStart.set(track.scrollLeft <= 2);
    this.atEnd.set(end);
  }

  protected go(direction: -1 | 1, event?: Event): void {
    event?.preventDefault();
    this.track.scrollBy({ left: direction * this.step(), behavior: this.behavior() });
  }

  protected onKey(direction: -1 | 1, event: Event): void {
    // only when the track itself has focus (not when a copy button inside has it)
    if (event.target === this.track) this.go(direction, event);
  }

  /* ---- mouse drag-to-scroll (touch already swipes natively) ---- */
  protected onPointerDown(event: PointerEvent): void {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;
    this.down = true;
    this.moved = 0;
    this.startX = event.clientX;
    this.startLeft = this.track.scrollLeft;
    this.zone.runOutsideAngular(() => {
      window.addEventListener('pointermove', this.onMove);
      window.addEventListener('pointerup', this.onUp);
    });
  }

  private readonly onMove = (event: PointerEvent): void => {
    if (!this.down) return;
    const dx = event.clientX - this.startX;
    this.moved = Math.max(this.moved, Math.abs(dx));
    if (this.moved > 5) {
      this.track.classList.add('drag');
      this.track.scrollLeft = this.startLeft - dx;
    }
  };

  private readonly onUp = (): void => {
    if (!this.down) return;
    this.down = false;
    this.removeDragListeners();
    if (this.moved <= 5) return;

    const track = this.track;
    track.classList.remove('drag');
    track.scrollTo({ left: Math.round(track.scrollLeft / this.step()) * this.step(), behavior: this.behavior() });

    // swallow the click a drag would otherwise trigger (only for this tick)
    const block = (e: Event): void => {
      e.stopPropagation();
      e.preventDefault();
    };
    track.addEventListener('click', block, true);
    setTimeout(() => track.removeEventListener('click', block, true), 0);
  };

  private removeDragListeners(): void {
    window.removeEventListener('pointermove', this.onMove);
    window.removeEventListener('pointerup', this.onUp);
  }
}
