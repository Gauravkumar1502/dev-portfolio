import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UiStore } from '../state/ui.store';

let firstNavigation = true;

/** On the very first load of `/`, send returning terminal users back to the terminal. */
export const lastModeGuard: CanActivateFn = () => {
  const wasFirst = firstNavigation;
  firstNavigation = false;
  return wasFirst && inject(UiStore).storedMode === 'terminal'
    ? inject(Router).parseUrl('/terminal')
    : true;
};
