import { Component } from '@angular/core';

/** Small bordered chip for tech stacks / skills. */
@Component({
  selector: 'nb-tag',
  template: '<ng-content />',
  styles: `
    :host {
      display: inline-flex;
      gap: var(--space-1);
      align-items: center;
      padding: 0.125rem var(--space-2);
      font-size: 0.8125rem;
      font-weight: 500;
      line-height: 1.4;
      color: var(--color-primary);
      white-space: nowrap;
      background: var(--color-bg);
      border: 2px solid var(--color-primary);
      border-radius: var(--nb-radius);
    }
  `,
})
export class NbTag {}
