import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LEARNING, SKILL_GROUPS } from '../../../core/data/portfolio.data';
import { RevealDirective } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsComponent {
  protected readonly groups = SKILL_GROUPS;
  protected readonly learning = LEARNING;
}
