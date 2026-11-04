import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/**
 * Soft glow that follows the mouse inside any `.card`.
 * One listener on the container (event delegation) — put it on <main>.
 * A plain addEventListener on purpose: it only writes CSS variables, so it should not schedule change detection.
 */
@Directive({ selector: '[appSpotlight]' })
export class SpotlightDirective {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const onMove = (event: PointerEvent): void => {
        const card = (event.target as Element | null)?.closest?.('.card') as HTMLElement | null;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
        card.style.setProperty('--my', `${event.clientY - rect.top}px`);
      };
      this.host.addEventListener('pointermove', onMove, { passive: true });
      this.destroyRef.onDestroy(() => this.host.removeEventListener('pointermove', onMove));
    });
  }
}
