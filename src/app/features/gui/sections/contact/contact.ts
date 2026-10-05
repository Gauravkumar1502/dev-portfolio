import { Component, computed, inject } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbButton } from '../../../../shared/ui/button/nb-button';
import { NbCard } from '../../../../shared/ui/card/nb-card';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-contact',
  imports: [NbCard, NbButton, Icon, RevealOnScroll],
  template: `
    <nb-card class="contact" appReveal>
      <p class="contact__eyebrow">What’s next?</p>
      <h3 class="contact__title">Get in touch</h3>
      <p class="contact__text">
        I’m open to new opportunities, collaborations and good tech conversations. Whether you have
        a question or just want to say hi, my inbox is always open.
      </p>
      <a nb-button class="contact__cta" [href]="mailto()">
        <app-icon name="mail" [size]="16" />
        Say hello
      </a>
    </nb-card>
  `,
  styles: `
    .contact {
      display: grid;
      gap: var(--space-4);
      justify-items: center;
      max-width: 40rem;
      margin-inline: auto;
      text-align: center;
    }

    .contact__eyebrow {
      color: var(--color-primary);
    }

    .contact__title {
      font-family: var(--font-display);
      font-size: clamp(2rem, 1.5rem + 3vw, 3.25rem);
      font-weight: 400;
      line-height: 1.1;
      color: var(--color-text);
    }

    .contact__text {
      color: var(--color-muted);
    }

    .contact__cta {
      margin-block-start: var(--space-2);
    }
  `,
})
export class Contact {
  private readonly email = inject(ProfileStore).email;
  protected readonly mailto = computed(
    () => `mailto:${this.email()}?subject=${encodeURIComponent('Hello Gaurav')}`,
  );
}
