import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PodcastService } from '../services/podcast.service';
import { RouterModule } from '@angular/router';
import { TimePipe } from '../../../pipes/time.pipe';
import { Observable, map } from 'rxjs';
import { Episode } from '../model/model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-podcast-episode-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterModule, TimePipe],
  templateUrl: './podcast-episode-list.component.html',
  styleUrl: './podcast-episode-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastEpisodeListComponent {
  displayedColumns: string[] = ['title', 'date', 'duration'];
  episodes: Observable<Episode[]>;

  constructor(private podcastService: PodcastService) {
    this.episodes = this.podcastService.currentPodcastEpisodes$.pipe(
      takeUntilDestroyed(),
      map((episodes) => episodes.slice(1)) // first is not an episode
    );
  }
}
