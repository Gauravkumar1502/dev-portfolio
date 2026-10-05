import { Component, input } from '@angular/core';

/** Generic output for commands that define `text()` in the registry. */
@Component({
  selector: 'app-text-output',
  template: `
    <div class="t-output">
      @for (line of lines(); track $index) {
        <p>{{ line }}</p>
      }
    </div>
  `,
})
export class TextOutput {
  readonly lines = input<readonly string[]>([]);
}
