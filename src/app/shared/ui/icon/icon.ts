import { Component, computed, input } from '@angular/core';
import { ICONS, type IconName } from './icons';

/**
 * Inline SVG icon that inherits `currentColor`.
 * Decorative by default; pass `label` to expose it to assistive tech.
 */
@Component({
  selector: 'app-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      [attr.viewBox]="icon().viewBox"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() ?? null"
      [attr.aria-hidden]="label() ? null : 'true'"
      [attr.fill]="icon().kind === 'fill' ? 'currentColor' : 'none'"
      [attr.stroke]="icon().kind === 'stroke' ? 'currentColor' : null"
      [attr.stroke-width]="icon().kind === 'stroke' ? 2 : null"
      stroke-linecap="round"
      stroke-linejoin="round"
      focusable="false"
    >
      @for (d of icon().paths; track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      line-height: 0;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly label = input<string>();

  protected readonly icon = computed(() => ICONS[this.name()]);
}
