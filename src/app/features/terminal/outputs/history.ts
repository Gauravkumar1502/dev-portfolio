import { Component, inject, untracked } from '@angular/core';
import { TerminalStore } from '../terminal.store';

@Component({
  selector: 'app-history-output',
  template: `
    <ol class="t-output t-list history">
      @for (line of lines; track $index) {
        <li>
          <span class="t-muted">{{ $index + 1 }}</span> {{ line }}
        </li>
      }
    </ol>
  `,
  styles: `
    .history {
      gap: 0;
    }
  `,
})
export class HistoryOutput {
  /** Snapshot when the command ran (oldest first), so later commands don't change it. */
  protected readonly lines = [...untracked(inject(TerminalStore).history)].reverse();
}
