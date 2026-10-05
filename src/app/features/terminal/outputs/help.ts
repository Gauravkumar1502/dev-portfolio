import { Component, inject } from '@angular/core';
import { TerminalStore } from '../terminal.store';

@Component({
  selector: 'app-help-output',
  template: `
    <div class="t-output">
      <dl class="t-table">
        @for (command of commands; track command.name) {
          <dt>{{ command.name }}</dt>
          <dd>- {{ command.description }}</dd>
        }
      </dl>
      <dl class="t-table help__keys">
        @for (key of keys; track key.combo) {
          <dt class="t-accent">{{ key.combo }}</dt>
          <dd>=&gt; {{ key.action }}</dd>
        }
      </dl>
    </div>
  `,
  styles: `
    .help__keys {
      margin-block-start: var(--space-4);
    }
  `,
})
export class HelpOutput {
  protected readonly commands = inject(TerminalStore).commands;
  protected readonly keys = [
    { combo: 'Tab or Ctrl + i', action: 'autocomplete' },
    { combo: 'Right / End', action: 'accept the faded suggestion' },
    { combo: 'Up / Down', action: 'browse command history' },
    { combo: 'Ctrl + l', action: 'clear the terminal' },
    { combo: 'Ctrl + c', action: 'cancel the current line' },
  ];
}
