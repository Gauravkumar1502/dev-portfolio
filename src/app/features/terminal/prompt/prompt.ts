import {
  afterRenderEffect,
  Component,
  computed,
  type ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { TerminalStore } from '../terminal.store';
import { TermInfo } from './term-info';

@Component({
  selector: 'app-prompt',
  imports: [TermInfo],
  template: `
    @if (store.hints().length) {
      <p class="prompt__hints" aria-live="polite">
        @for (hint of store.hints(); track hint) {
          <span>{{ hint }}</span>
        }
      </p>
    }
    <form class="prompt" (submit)="$event.preventDefault(); store.submit()">
      <label class="prompt__label" for="terminal-input">
        <app-term-info />
        <span class="sr-only">Command</span>
      </label>
      <span class="prompt__caret" aria-hidden="true">❯</span>
      <div class="prompt__field">
        <!-- Faded suggestion: invisible copy of the typed text + the suggested rest (monospace keeps it aligned). -->
        <span class="prompt__ghost" aria-hidden="true">
          <span class="prompt__ghost-typed">{{ store.input() }}</span>
          <span class="prompt__ghost-rest" (pointerdown)="acceptByTap($event)">{{ ghost() }}</span>
        </span>
        <input
          #field
          id="terminal-input"
          class="prompt__input"
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          enterkeyhint="send"
          [value]="store.input()"
          (input)="onInput(field)"
          (keydown)="onKeydown($event)"
        />
      </div>
    </form>
  `,
  styleUrl: './prompt.scss',
})
export class Prompt {
  protected readonly store = inject(TerminalStore);
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');
  /** The input scrolls horizontally once the line is too long; the ghost can't align then. */
  private readonly overflowing = signal(false);
  /** Esc hides the suggestion until the text changes again. */
  private readonly dismissed = signal<string | null>(null);

  protected readonly ghost = computed(() =>
    this.overflowing() || this.dismissed() === this.store.input() ? '' : this.store.suggestion(),
  );

  constructor() {
    // Re-measure after every value change (typing, history, Tab, accepting a suggestion).
    afterRenderEffect(() => {
      this.store.input();
      const el = this.field().nativeElement;
      this.overflowing.set(el.scrollWidth > el.clientWidth);
    });
  }

  focus(): void {
    this.field().nativeElement.focus({ preventScroll: true });
  }

  protected onInput(field: HTMLInputElement): void {
    this.store.input.set(field.value);
  }

  /** Mobile keyboards have no →, so tapping the faded text accepts it (keeps focus in the input). */
  protected acceptByTap(event: PointerEvent): void {
    event.preventDefault();
    this.store.acceptSuggestion();
    this.focus();
  }

  protected onKeydown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;
    const input = this.field().nativeElement;

    if (key === 'tab' || (ctrl && key === 'i')) {
      event.preventDefault();
      this.store.complete();
    } else if (
      (key === 'arrowright' || key === 'end') &&
      input.selectionStart === input.value.length &&
      this.ghost()
    ) {
      event.preventDefault();
      this.store.acceptSuggestion();
    } else if (key === 'arrowup') {
      event.preventDefault();
      this.store.prev();
    } else if (key === 'arrowdown') {
      event.preventDefault();
      this.store.next();
    } else if (ctrl && key === 'l') {
      event.preventDefault();
      this.store.clear();
    } else if (ctrl && key === 'c' && input.selectionStart === input.selectionEnd) {
      // only when nothing is selected, so Ctrl+C still copies selected text
      event.preventDefault();
      this.store.cancel();
    } else if (key === 'escape') {
      this.store.hints.set([]);
      this.dismissed.set(this.store.input());
    }
  }
}
