import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SERO_AI, SERO_TILES, TIMELINE } from '../../../core/data/portfolio.data';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { PeriodPipe } from '../../../shared/pipes/period.pipe';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, CountUpDirective, PeriodPipe, DurationPipe],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly entries = TIMELINE;
  protected readonly currentCount = TIMELINE.filter((e) => !e.to).length;
  protected readonly ai = SERO_AI;
  protected readonly tiles = SERO_TILES;
}
