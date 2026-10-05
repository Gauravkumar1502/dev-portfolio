import { type Routes } from '@angular/router';
import { lastModeGuard } from './core/guards/last-mode.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [lastModeGuard],
    loadComponent: () => import('./features/gui/gui-shell').then((m) => m.GuiShell),
    title: 'Gaurav Kumar — Java & Spring Boot Developer',
    data: {
      description:
        'Portfolio of Gaurav Kumar, a Java / Spring Boot developer building AI-agent platforms, RAG pipelines and MCP integrations.',
    },
  },
  {
    path: 'terminal',
    loadComponent: () => import('./features/terminal/terminal').then((m) => m.Terminal),
    title: 'Gaurav Kumar — Terminal Portfolio',
    data: {
      description:
        'Explore Gaurav Kumar’s portfolio from an interactive terminal: try help, about, projects and themes.',
    },
  },
  { path: '**', redirectTo: '' },
];
