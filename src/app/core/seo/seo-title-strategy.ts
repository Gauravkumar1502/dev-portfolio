import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { type RouterStateSnapshot, TitleStrategy } from '@angular/router';

/** Route `data` keys read by `SeoTitleStrategy`. */
export interface SeoRouteData {
  description?: string;
}

/**
 * Sets the document title plus description / Open Graph / Twitter meta from the active route.
 * Static defaults live in `index.html` for crawlers that don't run JavaScript.
 */
@Injectable()
export class SeoTitleStrategy extends TitleStrategy {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    let route = snapshot.root;
    while (route.firstChild) route = route.firstChild;
    const { description } = route.data as SeoRouteData;

    if (title) {
      this.title.setTitle(title);
      this.meta.updateTag({ property: 'og:title', content: title });
      this.meta.updateTag({ name: 'twitter:title', content: title });
    }
    if (description) {
      this.meta.updateTag({ name: 'description', content: description });
      this.meta.updateTag({ property: 'og:description', content: description });
      this.meta.updateTag({ name: 'twitter:description', content: description });
    }
    this.meta.updateTag({ property: 'og:url', content: this.document.location.href });
  }
}
