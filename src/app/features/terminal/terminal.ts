import { Component, inject, type OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiStore } from '../../core/state/ui.store';

// TODO(step 5): TerminalStore, parser, registry, prompt and outputs.
@Component({
  selector: 'app-terminal',
  imports: [RouterLink],
  template: `
    <section class="terminal">
      <p>Terminal — coming soon. <a routerLink="/">gui</a></p>
    </section>
  `,
  styleUrl: './terminal.scss',
})
export class Terminal implements OnInit {
  private readonly ui = inject(UiStore);

  ngOnInit(): void {
    this.ui.mode.set('terminal');
  }
}
