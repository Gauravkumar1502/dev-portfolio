import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-education-output',
  template: `
    <div class="t-output">
      <p>Here is my education background!</p>
      <ol class="t-list">
        @for (entry of education(); track entry.school) {
          <li>
            <p class="t-key">{{ entry.degree }}</p>
            <p>{{ entry.school }} · {{ entry.location }}</p>
            <p class="t-muted">{{ entry.start }} – {{ entry.end }} | {{ entry.score }}</p>
          </li>
        }
      </ol>
    </div>
  `,
})
export class EducationOutput {
  protected readonly education = inject(ProfileStore).education;
}
