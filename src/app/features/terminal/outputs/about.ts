import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-about-output',
  template: `
    @let p = profile();
    <div class="t-output">
      <p>
        Hi, my name is <span class="t-key">{{ p.name }}</span
        >!
      </p>
      <p>
        I'm a <span class="t-accent">{{ p.title }}</span> at
        <span class="t-key">{{ p.currentCompany }}</span
        >, based in {{ p.location }}.
      </p>
      <p>{{ p.intro }}</p>
      @for (paragraph of p.about; track $index) {
        <p class="t-muted">{{ paragraph }}</p>
      }
    </div>
  `,
})
export class AboutOutput {
  protected readonly profile = inject(ProfileStore).data;
}
