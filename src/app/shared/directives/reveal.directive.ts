import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Directive, ElementRef, OnDestroy, PLATFORM_ID, computed, inject, input } from '@angular/core';

/**
 * Fade/slide-in once the element scrolls into view.
 *   <div appReveal>            -> no delay
 *   <div appReveal="120">      -> 120 ms delay
 *   <div [appReveal]="i * 90"> -> stagger
 * Adds the `rv` class immediately and `on` when visible (styles live in styles/_base.scss).
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'rv', '[style.--d]': 'delay()' },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  readonly appReveal = input<number | string>(0);
  protected readonly delay = computed(() => `${Number(this.appReveal()) || 0}ms`);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      node.classList.add('on');
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.classList.add('on');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
