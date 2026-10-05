import { NgComponentOutlet } from '@angular/common';
import {
  afterNextRender,
  afterRenderEffect,
  Component,
  computed,
  DOCUMENT,
  inject,
  type OnInit,
  viewChild,
} from '@angular/core';
import { ProfileStore } from '../../core/state/profile.store';
import { UiStore } from '../../core/state/ui.store';
import { resolveOutput } from './output-resolver';
import { Prompt } from './prompt/prompt';
import { TermInfo } from './prompt/term-info';
import { TerminalStore } from './terminal.store';

@Component({
  selector: 'app-terminal',
  imports: [NgComponentOutlet, Prompt, TermInfo],
  providers: [TerminalStore],
  templateUrl: './terminal.html',
  styleUrl: './terminal.scss',
  host: { '(click)': 'focusPrompt()' },
})
export class Terminal implements OnInit {
  protected readonly store = inject(TerminalStore);
  private readonly profile = inject(ProfileStore).data;
  private readonly ui = inject(UiStore);
  private readonly document = inject(DOCUMENT);
  private readonly prompt = viewChild.required(Prompt);

  /** Entries paired with their output component, resolved from the registry at render time. */
  protected readonly rendered = computed(() =>
    this.store.entries().map((entry) => ({ entry, output: resolveOutput(entry, this.profile()) })),
  );

  constructor() {
    afterNextRender(() => this.prompt().focus());
    // Keep the prompt in view as output grows.
    afterRenderEffect(() => {
      this.store.entries();
      this.store.hints();
      this.document.defaultView?.scrollTo({ top: this.document.body.scrollHeight });
    });
  }

  ngOnInit(): void {
    this.ui.mode.set('terminal');
  }

  /** Click anywhere focuses the prompt, unless the user is selecting text to copy. */
  protected focusPrompt(): void {
    if (this.document.getSelection()?.toString()) return;
    this.prompt().focus();
  }
}
