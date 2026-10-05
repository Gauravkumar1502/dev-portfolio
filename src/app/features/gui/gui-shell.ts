import { ViewportScroller } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, type OnInit, viewChild } from '@angular/core';
import { UiStore } from '../../core/state/ui.store';
import { SectionTitle } from '../../shared/ui/section-title/section-title';
import { Header } from './layout/header/header';
import { NAV_LINKS } from './nav-links';

// TODO(step 4.3+): side rails, mobile menu and real section components.
@Component({
  selector: 'app-gui-shell',
  imports: [Header, SectionTitle],
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
