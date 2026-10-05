import { booleanAttribute, Component, input } from '@angular/core';

/** Neobrutal surface. `interactive` adds hover-lift / press feedback (use when the whole card is clickable). */
@Component({
  selector: 'nb-card',
  template: '<ng-content />',
  styles: `
    @use 'mixins' as nb;

    :host {
      @include nb.surface;

      display: block;
      padding: var(--space-6);
    }

    :host(.nb-card--interactive) {
      @include nb.pressable;
      @include nb.focus-ring;
    }

    :host(.nb-card--compact) {
      padding: var(--space-4);
    }
  `,
  host: {
    class: 'nb-card',
    '[class.nb-card--interactive]': 'interactive()',
    '[class.nb-card--compact]': 'compact()',
  },
})
export class NbCard {
  readonly interactive = input(false, { transform: booleanAttribute });
  readonly compact = input(false, { transform: booleanAttribute });
}
