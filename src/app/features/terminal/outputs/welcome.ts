import { Component } from '@angular/core';
import { MONITOR_ART, NAME_ART } from './welcome-art';

@Component({
  selector: 'app-welcome-output',
  template: `
    <div class="t-output welcome">
      <p class="t-muted">Terminal Portfolio v2.0.0</p>
      <div class="welcome__art" aria-hidden="true">
        <pre class="t-pre t-key welcome__name">{{ name }}</pre>
        <pre class="t-pre t-accent welcome__monitor">{{ monitor }}</pre>
      </div>
      <p class="sr-only">Gaurav Kumar</p>
      <p>Welcome to my interactive web terminal.</p>
      <p>---</p>
      <p>For a list of available commands, type <span class="t-key">help</span>.</p>
      <p>
        Prefer a classic page? type <span class="t-key">gui</span> to switch to the GUI portfolio.
      </p>
    </div>
  `,
  styles: `
    .welcome__art {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-8);
      align-items: flex-end;
      margin-block: var(--space-4);
      overflow-x: auto;
      font-size: clamp(0.45rem, 1.6vw, 0.85rem);
    }

    .welcome__monitor {
      @media (width < 1024px) {
        display: none;
      }
    }
  `,
})
export class WelcomeOutput {
  protected readonly name = NAME_ART.join('\n');
  protected readonly monitor = MONITOR_ART.join('\n');
}
