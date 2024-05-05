import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/podcast/podcast.routes').then((m) => m.PODCAST_ROUTES),
  },
];
