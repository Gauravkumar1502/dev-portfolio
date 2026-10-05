import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { createGlobalPositionStrategy } from '@angular/cdk/overlay';
import { Component, computed, effect, inject, type Injector } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileStore } from '../../../../core/state/profile.store';
import { ThemeStore } from '../../../../core/state/theme.store';
import { UiStore } from '../../../../core/state/ui.store';
import { NbButton } from '../../../../shared/ui/button/nb-button';
import { Icon } from '../../../../shared/ui/icon/icon';
import { NAV_LINKS } from '../../nav-links';
import { SocialLinks } from '../social-links/social-links';

/**
 * Drawer content for < 1024px. Opened via CDK Dialog from the header
 * (focus trap, Esc/backdrop close, scroll lock and focus restore come from the CDK).
 */
@Component({
  selector: 'app-mobile-menu',
  imports: [RouterLink, NbButton, Icon, SocialLinks],
  templateUrl: './mobile-menu.html',
  styleUrl: './mobile-menu.scss',
})
export class MobileMenu {
  protected readonly theme = inject(ThemeStore);
  protected readonly links = NAV_LINKS;
  protected readonly email = inject(ProfileStore).email;
  protected readonly mailto = computed(
    () => `mailto:${this.email()}?subject=${encodeURIComponent('Hello Gaurav')}`,
  );

  private readonly dialogRef = inject(DialogRef);
  private readonly ui = inject(UiStore);

  constructor() {
    // Growing to desktop width shows the full header, so the drawer is no longer needed.
    effect(() => {
      if (this.ui.isDesktop()) this.close();
    });
  }

  protected close(): void {
    this.dialogRef.close();
  }
}

/** Opens the drawer. Lives here so the header can lazy-load the CDK Dialog code on first use. */
export function openMobileMenu(injector: Injector): DialogRef<unknown, MobileMenu> {
  return injector.get(Dialog).open(MobileMenu, {
    id: 'mobile-menu',
    ariaLabelledBy: 'mobile-menu-title',
    width: 'min(22rem, 85vw)',
    height: '100dvh',
    positionStrategy: createGlobalPositionStrategy(injector).top('0').right('0'),
    backdropClass: 'cdk-overlay-dark-backdrop',
    panelClass: 'mobile-menu-panel',
    // Focus the panel itself so no focus ring flashes on the close button; Tab still enters the menu.
    autoFocus: 'dialog',
    restoreFocus: true,
  });
}
