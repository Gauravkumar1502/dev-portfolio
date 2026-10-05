import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-skills-output',
  template: `
    <dl class="t-output t-table">
      @for (group of groups(); track group.label) {
        <dt>{{ group.label }}</dt>
        <dd>{{ group.items.join(', ') }}</dd>
      }
    </dl>
  `,
})
export class SkillsOutput {
  protected readonly groups = inject(ProfileStore).skills;
}
