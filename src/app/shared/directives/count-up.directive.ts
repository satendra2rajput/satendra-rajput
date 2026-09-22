import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, NgZone, OnDestroy, PLATFORM_ID, inject, input } from '@angular/core';

/** <span [appCountUp]="4.5"></span> — counts 0.0 → 4.5 when it scrolls into view. */
@Directive({ selector: '[appCountUp]' })
export class CountUpDirective implements AfterViewInit, OnDestroy {
  readonly appCountUp = input.required<number>();

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;
  private raf = 0;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    const target = this.appCountUp();
    const reduced = this.isBrowser && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!this.isBrowser || reduced || !('IntersectionObserver' in window)) {
      node.textContent = target.toFixed(1);
      return;
    }
    node.textContent = (0).toFixed(1);

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          this.observer?.disconnect();
          const start = performance.now();
          const duration = 1600;
          const step = (now: number): void => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 4);
            node.textContent = (target * eased).toFixed(1);
            if (p < 1) this.raf = requestAnimationFrame(step);
          };
          this.raf = requestAnimationFrame(step);
        },
        { threshold: 0.3 },
      );
      this.observer.observe(node);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    cancelAnimationFrame(this.raf);
  }
}
