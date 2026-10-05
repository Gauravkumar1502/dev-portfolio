import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-experience-output',
  template: `
    <ol class="t-output t-list">
      @for (job of jobs(); track job.company) {
        <li>
          <p>
            <span class="t-key">{{ job.role }}</span> @
            <span class="t-accent">{{ job.company }}</span>
          </p>
          <p class="t-muted">{{ job.start }} – {{ job.end }} · {{ job.location }}</p>
          <ul class="t-list exp__points">
            @for (point of job.points; track $index) {
              <li>- {{ point }}</li>
            }
          </ul>
        </li>
      }
    </ol>
  `,
  styles: `
    .exp__points {
      gap: var(--space-1);
      padding-inline-start: var(--space-4);
    }
  `,
})
export class ExperienceOutput {
  protected readonly jobs = inject(ProfileStore).experience;
}
