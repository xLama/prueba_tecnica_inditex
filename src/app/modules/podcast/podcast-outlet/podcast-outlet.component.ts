import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PodcastService } from '../services/podcast.service';

@Component({
  selector: 'app-podcast-outlet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastOutletComponent {
  constructor(private podcastService: PodcastService) {
    this.podcastService.getPodcastList();
  }
}
