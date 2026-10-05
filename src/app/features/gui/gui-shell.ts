import { Component, inject, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeStore } from '../../core/state/theme.store';
import { ProfileStore } from '../../core/state/profile.store';
import { UiStore } from '../../core/state/ui.store';
import { NbButton } from '../../shared/ui/button/nb-button';
import { Icon } from '../../shared/ui/icon/icon';

// TODO(step 4): header, side rails, mobile menu and sections.
@Component({
  selector: 'app-gui-shell',
  imports: [RouterLink, NbButton, Icon],
  template: `
    <main class="gui">
      <h1>GUI — coming soon</h1>
      <div class="gui__row">
        <button
          type="button"
          nb-button
          variant="outline"
          [attr.aria-label]="theme.isGuiDark() ? 'Switch to light theme' : 'Switch to dark theme'"
          (click)="theme.toggleGuiTheme()"
        >
          <app-icon [name]="theme.isGuiDark() ? 'sun' : 'moon'" />
        </button>
        <a nb-button routerLink="/terminal"><app-icon name="terminal" /> terminal</a>
        <a nb-button variant="ghost" size="sm" href="resume/GK_Resume.pdf" target="_blank">
          resume <app-icon name="external" [size]="16" />
        </a>
      </div>
      <div class="gui__row">
        @for (s of socials(); track s.id) {
          <a nb-button variant="ghost" [href]="s.url" target="_blank" rel="noopener">
            <app-icon [name]="s.icon" [label]="s.label" />
          </a>
        }
      </div>
    </main>
  `,
  styleUrl: './gui-shell.scss',
})
export class GuiShell implements OnInit {
  protected readonly theme = inject(ThemeStore);
  protected readonly socials = inject(ProfileStore).socials;
  private readonly ui = inject(UiStore);

  ngOnInit(): void {
    this.ui.mode.set('gui');
  }
}
