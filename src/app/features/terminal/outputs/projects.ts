import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-projects-output',
  template: `
    <div class="t-output">
      <p>“Talk is cheap. Show me the code.” — Linus Torvalds</p>
      <p class="t-muted">Here are some of my projects you shouldn't miss:</p>
      <ol class="t-list projects__list">
        @for (project of projects(); track project.name; let i = $index) {
          <li>
            <p>
              <span class="t-accent">{{ i + 1 }}.</span>
              <span class="t-key">{{ project.name }}</span>
            </p>
            <p class="projects__body">{{ project.description }}</p>
            <p class="projects__body t-muted">[{{ project.stack.join(', ') }}]</p>
          </li>
        }
      </ol>
      <p>
        Usage: <span class="t-key">projects go &lt;number&gt;</span>
        <span class="t-muted">(e.g. projects go 1)</span>
      </p>
    </div>
  `,
  styles: `
    .projects__list {
      margin-block: var(--space-2);
    }

    .projects__body {
      padding-inline-start: var(--space-6);
    }
  `,
})
export class ProjectsOutput {
  protected readonly projects = inject(ProfileStore).projects;
}
