import { DestroyRef, Directive, ElementRef, NgZone, inject } from '@angular/core';

/**
 * Soft glow that follows the mouse inside any `.card`.
 * One listener on the container (event delegation) — put it on <main>.
 */
@Directive({ selector: '[appSpotlight]' })
export class SpotlightDirective {
  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const zone = inject(NgZone);
    const onMove = (event: PointerEvent): void => {
      const target = event.target as Element | null;
      const card = target?.closest?.('.card') as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    };
    zone.runOutsideAngular(() => host.addEventListener('pointermove', onMove, { passive: true }));
    inject(DestroyRef).onDestroy(() => host.removeEventListener('pointermove', onMove));
  }
}
