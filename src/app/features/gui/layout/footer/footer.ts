import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileStore } from '../../../../core/state/profile.store';
import { SocialLinks } from '../social-links/social-links';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, SocialLinks],
  template: `
    <footer class="footer">
      <!-- desktop shows socials in the side rails -->
      <app-social-links class="footer__socials" />
      <a class="footer__terminal" routerLink="/terminal">
        .open(<span class="footer__arg">'terminal'</span>)
      </a>
      <p class="footer__credit">Designed &amp; built by {{ name() }} with Angular · © {{ year }}</p>
    </footer>
  `,
  styles: `
    @use 'mixins' as nb;

    .footer {
      display: grid;
      gap: var(--space-3);
      justify-items: center;
      padding: var(--space-8) var(--space-4);
      font-size: 0.85rem;
      color: var(--color-muted);
      text-align: center;
      border-block-start: var(--nb-border-width) solid var(--nb-border);
    }

    .footer__socials {
      @include nb.desktop-up {
        display: none;
      }
    }

    .footer__terminal {
      @include nb.focus-ring;

      color: var(--color-primary);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .footer__arg {
      color: var(--color-text);
    }
  `,
})
export class Footer {
  protected readonly name = inject(ProfileStore).name;
  protected readonly year = new Date().getFullYear();
}
