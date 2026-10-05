import {
  afterNextRender,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Fades/slides the host in the first time it scrolls into view.
 * Styles live in `src/styles.scss` (`.reveal`, `.reveal--visible`).
 * Shows immediately when reduced motion is preferred or IntersectionObserver is unavailable.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.reveal--visible]': 'visible()',
    '[style.transition-delay.ms]': 'revealDelay() || null',
  },
})
export class RevealOnScroll {
  /** Stagger delay in ms. */
  readonly revealDelay = input(0);

  protected readonly visible = signal(false);

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const win = host.ownerDocument.defaultView;
      const reduceMotion = win?.matchMedia('(prefers-reduced-motion: reduce)').matches ?? true;
      if (reduceMotion || !win || !('IntersectionObserver' in win)) {
        this.visible.set(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            this.visible.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
      );
      observer.observe(host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
