import type { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeStore } from '../../../../core/state/theme.store';
import { UiStore } from '../../../../core/state/ui.store';
import { NbButton } from '../../../../shared/ui/button/nb-button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { NAV_LINKS } from '../../nav-links';
import type { MobileMenu } from '../mobile-menu/mobile-menu';

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

  private readonly injector = inject(Injector);
  private menuRef?: DialogRef<unknown, MobileMenu>;
  private opening = false;

  protected async toggleMenu(): Promise<void> {
    if (this.menuRef) {
      this.menuRef.close();
      return;
    }
    if (this.opening) return;
    this.opening = true;
    // Lazy chunk: CDK Dialog + drawer are only downloaded on first open.
    const { openMobileMenu } = await import('../mobile-menu/mobile-menu');
    this.menuRef = openMobileMenu(this.injector);
    this.opening = false;
    this.ui.mobileMenuOpen.set(true);
    this.menuRef.closed.subscribe(() => {
      this.menuRef = undefined;
      this.ui.mobileMenuOpen.set(false);
    });
  }
}
