import { Component, inject, input, untracked } from '@angular/core';
import { TerminalStore } from '../terminal.store';

@Component({
  selector: 'app-history-output',
  template: `
    @if (args()[0] === '-c') {
      <p class="t-output">History cleared.</p>
    } @else {
      <ol class="t-output t-list history">
        @for (line of lines; track $index) {
          <li>
            <span class="t-muted">{{ $index + 1 }}</span> {{ line }}
          </li>
        }
      </ol>
    }
  `,
  styles: `
    .history {
      gap: 0;
    }
  `,
})
export class HistoryOutput {
  readonly args = input<string[]>([]);

  /** Snapshot when the command ran (oldest first), so later commands don't change it. */
  protected readonly lines = [...untracked(inject(TerminalStore).history)].reverse();
}
