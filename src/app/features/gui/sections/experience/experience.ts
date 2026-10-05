import { Component, computed, inject, linkedSignal } from '@angular/core';
import { Tab, TabContent, TabList, TabPanel, Tabs } from '@angular/aria/tabs';
import { ProfileStore } from '../../../../core/state/profile.store';
import { UiStore } from '../../../../core/state/ui.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbCard } from '../../../../shared/ui/card/nb-card';

/** Company tabs (vertical on desktop, scrollable row on mobile) with one panel per job. */
@Component({
  selector: 'app-experience',
  imports: [Tabs, TabList, Tab, TabPanel, TabContent, NbCard, RevealOnScroll],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  private readonly ui = inject(UiStore);
  private readonly experience = inject(ProfileStore).experience;

  protected readonly jobs = computed(() =>
    this.experience().map((job) => ({
      ...job,
      value: job.company.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    })),
  );
  protected readonly orientation = computed(() =>
    this.ui.isDesktop() ? 'vertical' : 'horizontal',
  );
  protected readonly selected = linkedSignal(() => this.jobs()[0]?.value);
}
