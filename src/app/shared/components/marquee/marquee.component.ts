import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MARQUEE_ITEMS } from '../../../core/data/portfolio.data';

@Component({
  selector: 'app-marquee',
  template: `
    <div class="marquee" aria-hidden="true">
      <div class="marquee__t">
        @for (copy of copies; track copy) {
          @for (item of items; track item) {
            <span>{{ item }}</span>
          }
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeComponent {
  protected readonly items = MARQUEE_ITEMS;
  /** the strip is rendered twice so the CSS loop (translateX -50%) is seamless */
  protected readonly copies = [0, 1];
}
