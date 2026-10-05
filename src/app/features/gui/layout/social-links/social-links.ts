import { Component, inject, input } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { Icon } from '../../../../shared/ui/icon/icon';

/** Social profile icon links; vertical in the desktop rail, horizontal in the mobile menu. */
@Component({
  selector: 'app-social-links',
  imports: [Icon],
  template: `
    <ul class="social-links" [class.social-links--vertical]="orientation() === 'vertical'">
      @for (social of socials(); track social.id) {
        <li>
          <a
            class="social-links__link"
            [href]="social.url"
            [title]="social.label"
            [attr.aria-label]="social.label + ' (opens in a new tab)'"
            target="_blank"
            rel="noopener noreferrer"
          >
            <app-icon [name]="social.icon" [size]="iconSize()" />
          </a>
        </li>
      }
    </ul>
  `,
  styleUrl: './social-links.scss',
})
export class SocialLinks {
  readonly orientation = input<'vertical' | 'horizontal'>('horizontal');
  readonly iconSize = input(22);

  protected readonly socials = inject(ProfileStore).socials;
}
