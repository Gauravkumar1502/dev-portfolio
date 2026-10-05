import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileStore } from '../../../../core/state/profile.store';
import { Icon } from '../../../../shared/ui/icon/icon';
import { SocialLinks } from '../social-links/social-links';

/** Fixed desktop rails (≥1024px): email on the left, terminal switch + socials on the right. */
@Component({
  selector: 'app-side-rails',
  imports: [RouterLink, Icon, SocialLinks],
  template: `
    <aside class="rail rail--left" aria-label="Email">
      <a class="rail__email" [href]="mailto()">{{ email() }}</a>
    </aside>

    <aside class="rail rail--right" aria-label="Social links">
      <a
        class="rail__terminal"
        routerLink="/terminal"
        title="Switch to terminal"
        aria-label="Switch to terminal portfolio"
      >
        <app-icon name="code" [size]="22" />
      </a>
      <app-social-links orientation="vertical" />
    </aside>
  `,
  styleUrl: './side-rails.scss',
})
export class SideRails {
  protected readonly email = inject(ProfileStore).email;
  protected readonly mailto = computed(
    () => `mailto:${this.email()}?subject=${encodeURIComponent('Hello Gaurav')}`,
  );
}
