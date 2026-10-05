import { type Routes } from '@angular/router';
import { lastModeGuard } from './core/guards/last-mode.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [lastModeGuard],
    loadComponent: () => import('./features/gui/gui-shell').then((m) => m.GuiShell),
    title: 'Gaurav Kumar — Portfolio',
  },
  {
    path: 'terminal',
    loadComponent: () => import('./features/terminal/terminal').then((m) => m.Terminal),
    title: 'Gaurav Kumar — Terminal',
  },
  { path: '**', redirectTo: '' },
];
