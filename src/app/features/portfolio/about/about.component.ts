import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ABOUT_STATS } from '../../../core/data/portfolio.data';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  protected readonly stats = ABOUT_STATS;
}
