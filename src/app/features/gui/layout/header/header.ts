import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeStore } from '../../../../core/state/theme.store';
import { UiStore } from '../../../../core/state/ui.store';
import { NbButton } from '../../../../shared/ui/button/nb-button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { NAV_LINKS } from '../../nav-links';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NbButton, Icon],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly theme = inject(ThemeStore);
  protected readonly ui = inject(UiStore);
  protected readonly links = NAV_LINKS;

  protected toggleMenu(): void {
    this.ui.mobileMenuOpen.update((open) => !open);
  }
}
