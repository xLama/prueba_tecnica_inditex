import { Routes } from '@angular/router';
import { PodcastOutletComponent } from './podcast-outlet/podcast-outlet.component';
import { PodcastListComponent } from './podcast-list/podcast-list.component';
import { PodcastDetailComponent } from './podcast-detail/podcast-detail.component';
import { PodcastEpisodeListComponent } from './podcast-episode-list/podcast-episode-list.component';
import { PodcastEpisodeDetailComponent } from './podcast-episode-detail/podcast-episode-detail.component';

export const PODCAST_ROUTES: Routes = [
  {
    path: '',
    component: PodcastOutletComponent,
    children: [
      {
        path: '',
        component: PodcastListComponent,
      },
      {
        path: 'podcast/:id',
        component: PodcastDetailComponent,

        children: [
          {
            path: '',
            component: PodcastEpisodeListComponent,
          },
          {
            path: 'episode/:id',
            component: PodcastEpisodeDetailComponent,
          },
        ],
      },
    ],
  },
];
