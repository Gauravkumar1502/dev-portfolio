import { Component, inject, input } from '@angular/core';
import { ProfileStore } from '../../../core/state/profile.store';

@Component({
  selector: 'app-socials-output',
  template: `
    @if (args().length === 0) {
      <div class="t-output">
        <p>Here are my social links:</p>
        <dl class="t-table">
          @for (social of socials(); track social.id) {
            <dt>{{ social.id }}</dt>
            <dd>
              <a class="t-link" [href]="social.url" target="_blank" rel="noopener noreferrer">{{
                social.url
              }}</a>
            </dd>
          }
        </dl>
        <p>
          Usage: <span class="t-key">socials go &lt;name&gt;</span>
          <span class="t-muted">(e.g. socials go github)</span>
        </p>
      </div>
    } @else {
      <p class="t-output">Opening {{ args()[1] }} …</p>
    }
  `,
})
export class SocialsOutput {
  readonly args = input<string[]>([]);
  protected readonly socials = inject(ProfileStore).socials;
}
