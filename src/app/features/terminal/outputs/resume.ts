import { Component, inject, input } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-resume-output',
  template: `
    <p class="t-output">
      {{ args()[0] === '--download' ? 'Downloading' : 'Opening' }} resume …
      <span class="t-muted">If nothing happens,</span>
      <a class="t-link" [href]="url" target="_blank" rel="noopener">open it here</a>.
    </p>
  `,
})
export class ResumeOutput {
  readonly args = input<string[]>([]);
  protected readonly url = inject(ProfileStore).data().resumeUrl;
}
