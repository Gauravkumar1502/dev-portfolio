import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeStore } from '../../core/state/theme.store';
import { UiStore } from '../../core/state/ui.store';

// TODO(step 4): header, side rails, mobile menu and sections.
@Component({
  selector: 'app-gui-shell',
  imports: [RouterLink],
  template: `
    <main class="gui">
      <h1>GUI — coming soon</h1>
      <button type="button" (click)="theme.toggleGuiTheme()">toggle theme</button>
      <a routerLink="/terminal">&gt;_ terminal</a>
    </main>
  `,
  styleUrl: './gui-shell.scss',
})
export class GuiShell implements OnInit {
  protected readonly theme = inject(ThemeStore);
  private readonly ui = inject(UiStore);

  ngOnInit(): void {
    this.ui.mode.set('gui');
  }
}
