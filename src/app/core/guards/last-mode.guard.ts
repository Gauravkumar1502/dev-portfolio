import { inject } from '@angular/core';
import { type CanActivateFn, Router } from '@angular/router';
import { UiStore } from '../state/ui.store';

/**
 * On the app's initial load of `/`, send returning terminal users back to the terminal.
 * `router.navigated` is false only until the first navigation completes, so in-app moves
 * to `/` (e.g. the terminal's `gui` command) are never redirected.
 */
export const lastModeGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isInitialLoad = !router.navigated;
  return isInitialLoad && inject(UiStore).storedMode === 'terminal'
    ? router.parseUrl('/terminal')
    : true;
};
