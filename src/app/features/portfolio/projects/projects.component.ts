import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROJECTS } from '../../../core/data/portfolio.data';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { PeriodPipe } from '../../../shared/pipes/period.pipe';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, PeriodPipe],
  templateUrl: './projects.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;
}
