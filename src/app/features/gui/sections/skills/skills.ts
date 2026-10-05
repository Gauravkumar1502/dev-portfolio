import { Component, inject } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbCard } from '../../../../shared/ui/card/nb-card';
import { NbTag } from '../../../../shared/ui/tag/nb-tag';

@Component({
  selector: 'app-skills',
  imports: [NbCard, NbTag, RevealOnScroll],
  template: `
    <ul class="skills">
      @for (group of groups(); track group.label; let i = $index) {
        <li appReveal [revealDelay]="(i % 3) * 100">
          <nb-card compact class="skills__card">
            <h3 class="skills__label">{{ group.label }}</h3>
            <ul class="skills__items">
              @for (item of group.items; track item) {
                <li>
                  <nb-tag>{{ item }}</nb-tag>
                </li>
              }
            </ul>
          </nb-card>
        </li>
      }
    </ul>
  `,
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups = inject(ProfileStore).skills;
}
