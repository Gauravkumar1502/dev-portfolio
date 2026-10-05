import { Component, computed, inject } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbCard } from '../../../../shared/ui/card/nb-card';
import { Icon } from '../../../../shared/ui/icon/icon';
import { NbTag } from '../../../../shared/ui/tag/nb-tag';

@Component({
  selector: 'app-projects',
  imports: [NbCard, NbTag, Icon, RevealOnScroll],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  private readonly allProjects = inject(ProfileStore).projects;

  /** Featured projects first, otherwise keep data order. */
  protected readonly projects = computed(() =>
    [...this.allProjects()].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)),
  );
}
