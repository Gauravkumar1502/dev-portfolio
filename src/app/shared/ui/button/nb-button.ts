import { Component, input } from '@angular/core';

export type NbButtonVariant = 'solid' | 'outline' | 'ghost';
export type NbButtonSize = 'sm' | 'md';

/**
 * Neobrutal button. Apply to a native element so semantics stay native:
 * `<button type="button" nb-button>` or `<a nb-button href="…">`.
 */
@Component({
  selector: 'button[nb-button], a[nb-button]',
  template: '<ng-content />',
  styleUrl: './nb-button.scss',
  host: {
    class: 'nb-button',
    '[class.nb-button--outline]': 'variant() === "outline"',
    '[class.nb-button--ghost]': 'variant() === "ghost"',
    '[class.nb-button--sm]': 'size() === "sm"',
  },
})
export class NbButton {
  readonly variant = input<NbButtonVariant>('solid');
  readonly size = input<NbButtonSize>('md');
}
