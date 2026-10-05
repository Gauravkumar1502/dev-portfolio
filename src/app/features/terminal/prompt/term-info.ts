import { Component } from '@angular/core';

/** `visitor@gaurav:~$` prompt label. */
@Component({
  selector: 'app-term-info',
  template: `<span class="t-key">visitor</span>@<span class="t-accent">gaurav</span>:~$`,
  styles: `
    :host {
      white-space: nowrap;
    }
  `,
})
export class TermInfo {}
