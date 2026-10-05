import { Component, inject, input } from '@angular/core';
import { ThemeStore } from '../../../core/state/theme.store';
import { TERMINAL_THEMES } from '../../../models/theme.model';

@Component({
  selector: 'app-themes-output',
  template: `
    @if (args()[0] === 'set') {
      <p class="t-output">
        Theme set to <span class="t-key">{{ args()[1] }}</span
        >.
      </p>
    } @else {
      <div class="t-output">
        <ul class="t-list themes__list">
          @for (theme of themes; track theme) {
            <li [class.t-key]="theme === current()">
              {{ theme }}{{ theme === current() ? ' *' : '' }}
            </li>
          }
        </ul>
        <p>
          Usage: <span class="t-key">themes set &lt;theme&gt;</span>
          <span class="t-muted">(e.g. themes set espresso)</span>
        </p>
      </div>
    }
  `,
  styles: `
    .themes__list {
      grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
      gap: var(--space-1) var(--space-4);
    }
  `,
})
export class ThemesOutput {
  readonly args = input<string[]>([]);
  protected readonly themes = TERMINAL_THEMES;
  protected readonly current = inject(ThemeStore).terminalTheme;
}
