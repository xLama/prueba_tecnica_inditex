import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  numberAttribute,
} from '@angular/core';
import { PodcastService } from '../services/podcast.service';
import { filter, first } from 'rxjs';
import { Episode } from '../model';

@Component({
  selector: 'app-podcast-episode',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './podcast-episode-detail.component.html',
  styleUrl: './podcast-episode-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastEpisodeDetailComponent {
  episodeDetail: Episode | undefined;

  constructor(
    private podcastService: PodcastService,
    private cd: ChangeDetectorRef
  ) {}

  @Input({ transform: numberAttribute })
  set id(epidoseId: number) {
    this.podcastService.currentPodcastEpisodes
      .pipe(
        filter((episodes) => !!episodes.length),
        first()
      )
      .subscribe((episodes) => {
        this.episodeDetail = episodes.find(
          (episode: any) => episode.trackId === epidoseId
        );
        this.cd.markForCheck();
      });
  }
}
