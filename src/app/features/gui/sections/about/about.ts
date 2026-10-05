import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ProfileStore } from '../../../../core/state/profile.store';
import { RevealOnScroll } from '../../../../shared/directives/reveal-on-scroll';
import { NbCard } from '../../../../shared/ui/card/nb-card';

@Component({
  selector: 'app-about',
  imports: [NgOptimizedImage, NbCard, RevealOnScroll],
  template: `
    <div class="about" [class.about--with-photo]="photo()">
      <div class="about__text" appReveal>
        @for (paragraph of paragraphs(); track $index) {
          <p>{{ paragraph }}</p>
        }
        <p>Here are a few technologies I’ve been working with recently:</p>
        <ul class="about__tech">
          @for (tech of tech(); track tech) {
            <li>{{ tech }}</li>
          }
        </ul>
      </div>

      @if (photo(); as src) {
        <nb-card class="about__photo" appReveal [revealDelay]="150">
          <img [ngSrc]="src" width="400" height="400" [alt]="'Photo of ' + name()" />
        </nb-card>
      }
    </div>
  `,
  styleUrl: './about.scss',
})
export class About {
  private readonly profile = inject(ProfileStore).data;

  protected readonly paragraphs = computed(() => this.profile().about);
  protected readonly tech = computed(() => this.profile().aboutTech);
  protected readonly photo = computed(() => this.profile().photo);
  protected readonly name = computed(() => this.profile().name);
}
