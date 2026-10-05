import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbCard } from '../../../../shared/ui/card/nb-card';
import { Icon } from '../../../../shared/ui/icon/icon';

@Component({
  selector: 'app-education',
  imports: [NbCard, Icon, RevealOnScroll],
  templateUrl: './education.html',
  styleUrl: './education.scss',
})
export class Education {
  private readonly profile = inject(ProfileStore);
  protected readonly education = this.profile.education;
  protected readonly certifications = this.profile.certifications;
}
