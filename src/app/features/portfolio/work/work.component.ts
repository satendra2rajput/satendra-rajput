import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KUDO, PROFILE } from '../../../core/data/portfolio.data';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { LibrariesComponent } from '../libraries/libraries.component';
import { ProjectsComponent } from '../projects/projects.component';

@Component({
  selector: 'app-work',
  imports: [RevealDirective, LibrariesComponent, ProjectsComponent],
  templateUrl: './work.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkComponent {
  protected readonly kudo = KUDO;
  protected readonly kudoUrl = PROFILE.links.kudoengineer;
}
