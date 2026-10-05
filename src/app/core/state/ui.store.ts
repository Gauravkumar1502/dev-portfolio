import { BreakpointObserver } from '@angular/cdk/layout';
import { effect, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AppMode } from '../../models/theme.model';

const MODE_KEY = 'portfolio:mode';

@Injectable({ providedIn: 'root' })
export class UiStore {
  private readonly storage = inject(StorageService);

  /** Last mode stored before this session started; used by the last-mode guard. */
  readonly storedMode = this.storage.get<AppMode>(MODE_KEY);
  readonly mode = signal<AppMode>(this.storedMode ?? 'gui');
  readonly mobileMenuOpen = signal(false);
  readonly isDesktop = toSignal(
    inject(BreakpointObserver).observe('(min-width: 1024px)').pipe(map((s) => s.matches)),
    { initialValue: false },
  );

  constructor() {
    effect(() => this.storage.set(MODE_KEY, this.mode()));
  }
}
