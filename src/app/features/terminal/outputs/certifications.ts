import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-certifications-output',
  template: `
    <ul class="t-output t-list">
      @for (cert of certifications(); track cert.title) {
        <li>
          <span class="t-key">{{ cert.title }}</span>
          <!-- explicit separator: whitespace at the start of an @if block is collapsed -->
          <span>{{ cert.detail ? ' — ' + cert.detail + ' ' : ' ' }}</span>
          @if (cert.url; as url) {
            <a class="t-link" [href]="url" target="_blank" rel="noopener noreferrer"
              >[certificate]</a
            >
          }
        </li>
      }
    </ul>
  `,
})
export class CertificationsOutput {
  protected readonly certifications = inject(ProfileStore).certifications;
}
