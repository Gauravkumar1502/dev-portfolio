import { Component, computed, inject } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbButton } from '../../../../shared/ui/button/nb-button';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-hero',
  imports: [NbButton, Icon, RevealOnScroll],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly profile = inject(ProfileStore).data;

  protected readonly name = computed(() => this.profile().name);
  protected readonly tagline = computed(() => this.profile().tagline);
  protected readonly resumeUrl = computed(() => this.profile().resumeUrl);
  protected readonly mailto = computed(
    () => `mailto:${this.profile().email}?subject=${encodeURIComponent('Hello Gaurav')}`,
  );

  /** Intro split around the current company so it can be highlighted. */
  protected readonly intro = computed(() => {
    const { intro, currentCompany } = this.profile();
    const at = intro.indexOf(currentCompany);
    return at < 0
      ? { before: intro, company: '', after: '' }
      : {
          before: intro.slice(0, at),
          company: currentCompany,
          after: intro.slice(at + currentCompany.length),
        };
  });
}
