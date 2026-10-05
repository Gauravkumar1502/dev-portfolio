import { Component, computed, input } from '@angular/core';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { type AssetIcon, ICONS, type IconName } from './icons';

/**
 * Single icon entry point for the app (wraps Font Awesome + custom asset SVGs).
 * Decorative by default; pass `label` to expose it to assistive tech.
 */
@Component({
  selector: 'app-icon',
  imports: [FaIconComponent],
  template: `
    @let def = icon();
    @if (isAsset(def)) {
      <span class="icon__asset" [style.mask-image]="'url(' + def.asset + ')'"></span>
    } @else {
      <fa-icon [icon]="def" />
    }
  `,
  styles: `
    :host {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      width: 1em;
      height: 1em;
      line-height: 0;
    }

    .icon__asset {
      width: 100%;
      height: 100%;
      background: currentcolor;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }
  `,
  host: {
    '[style.font-size.px]': 'size()',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() ?? null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
  },
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
  readonly label = input<string>();

  protected readonly icon = computed<IconDefinition | AssetIcon>(() => ICONS[this.name()]);

  protected isAsset(def: IconDefinition | AssetIcon): def is AssetIcon {
    return 'asset' in def;
  }
}
