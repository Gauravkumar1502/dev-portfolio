import { Component, inject, type OnInit } from '@angular/core';
import { UiStore } from '../../core/state/ui.store';
import { TerminalStore } from './terminal.store';

// TODO(step 5.3/5.4): replace the debug view with the real prompt + output components.
@Component({
  selector: 'app-terminal',
  providers: [TerminalStore],
  template: `
    <section class="terminal" aria-label="Terminal">
      @for (entry of store.entries(); track entry.id) {
        <p class="terminal__line">
          <span class="terminal__prompt">$</span> {{ entry.input }}
          @if (entry.name) {
            <span class="terminal__debug">→ {{ entry.name }}({{ entry.args.join(', ') }})</span>
          }
        </p>
        @if (entry.error) {
          <p class="terminal__error">{{ entry.error }}</p>
        }
      }

      @if (store.hints().length) {
        <p class="terminal__hints">{{ store.hints().join('  ') }}</p>
      }

      <label class="terminal__line">
        <span class="terminal__prompt">$</span>
        <input
          class="terminal__input"
          aria-label="Command"
          autocomplete="off"
          spellcheck="false"
          #field
          [value]="store.input()"
          (input)="store.input.set(field.value)"
          (keydown.enter)="store.submit()"
          (keydown.tab)="$event.preventDefault(); store.complete()"
          (keydown.arrowup)="$event.preventDefault(); store.prev()"
          (keydown.arrowdown)="$event.preventDefault(); store.next()"
        />
      </label>
    </section>
  `,
  styleUrl: './terminal.scss',
})
export class Terminal implements OnInit {
  protected readonly store = inject(TerminalStore);
  private readonly ui = inject(UiStore);

  ngOnInit(): void {
    this.ui.mode.set('terminal');
  }
}
