import { Component, computed, input } from '@angular/core';

/** Section heading in the dev style: `01. .experience()` followed by a rule line. */
@Component({
  selector: 'app-section-title',
  template: `
    <h2 class="section-title">
      <span class="section-title__index" aria-hidden="true">{{ indexLabel() }}</span>
      <span class="section-title__label">{{ label() }}</span>
    </h2>
  `,
  styles: `
    .section-title {
      display: flex;
      gap: var(--space-3);
      align-items: center;
      margin-block-end: var(--space-8);
      font-size: clamp(1.25rem, 1rem + 1.5vw, 1.75rem);
      font-weight: 700;
      color: var(--color-text);
      white-space: nowrap;

      &::after {
        flex: 1;
        max-width: 20rem;
        height: var(--nb-border-width);
        content: '';
        background: var(--color-primary);
      }
    }

    .section-title__index {
      font-size: 0.8em;
      color: var(--color-primary);
    }
  `,
})
export class SectionTitle {
  readonly index = input.required<number>();
  readonly label = input.required<string>();

  protected readonly indexLabel = computed(() => `${String(this.index()).padStart(2, '0')}.`);
}
