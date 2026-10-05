import { Component, type ElementRef, inject, viewChild } from '@angular/core';
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
        (input)="store.input.set(field.value)"
        (keydown)="onKeydown($event)"
      />
    </form>
  `,
  styleUrl: './prompt.scss',
})
export class Prompt {
  protected readonly store = inject(TerminalStore);
  private readonly field = viewChild.required<ElementRef<HTMLInputElement>>('field');

  focus(): void {
    this.field().nativeElement.focus({ preventScroll: true });
  }

  protected onKeydown(event: KeyboardEvent): void {
    const key = event.key.toLowerCase();
    const ctrl = event.ctrlKey || event.metaKey;
    const input = this.field().nativeElement;

    if (key === 'tab' || (ctrl && key === 'i')) {
      event.preventDefault();
      this.store.complete();
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
    }
  }
}
