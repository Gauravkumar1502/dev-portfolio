import { ViewportScroller } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, type OnInit, viewChild } from '@angular/core';
import { UiStore } from '../../core/state/ui.store';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { Header } from './layout/header/header';
import { SideRails } from './layout/side-rails/side-rails';
import { Footer } from './layout/footer/footer';
import { About } from './sections/about/about';
import { Contact } from './sections/contact/contact';
import { Education } from './sections/education/education';
import { Skills } from './sections/skills/skills';
import { Experience } from './sections/experience/experience';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { NAV_LINKS } from './nav-links';

@Component({
  selector: 'app-gui-shell',
  imports: [
    Header,
    SideRails,
    Footer,
    Hero,
    About,
    Experience,
    Projects,
    Skills,
    Education,
    Contact,
    SectionTitle,
  ],
  templateUrl: './gui-shell.html',
  styleUrl: './gui-shell.scss',
})
export class GuiShell implements OnInit {
  protected readonly sections = NAV_LINKS;
  private readonly ui = inject(UiStore);
  private readonly header = viewChild.required(Header, { read: ElementRef });

  constructor() {
    // Router anchor scrolling ignores CSS scroll-margin; offset by the sticky header instead.
    const scroller = inject(ViewportScroller);
    scroller.setOffset(() => [0, (this.header().nativeElement as HTMLElement).offsetHeight]);
    inject(DestroyRef).onDestroy(() => scroller.setOffset([0, 0]));
  }

  ngOnInit(): void {
    this.ui.mode.set('gui');
  }
}
