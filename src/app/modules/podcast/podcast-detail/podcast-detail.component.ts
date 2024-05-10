import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { PodcastService } from '../services/podcast.service';
import { RouterModule } from '@angular/router';
import { filter, first } from 'rxjs';
import { Podcast } from '../model/model';

@Component({
  selector: 'app-podcast-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './podcast-detail.component.html',
  styleUrl: './podcast-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PodcastDetailComponent {
  podcastDetail: Podcast | undefined;

  constructor(
    private podcastService: PodcastService,
    private cd: ChangeDetectorRef
  ) {}

  @Input()
  set id(podcastId: string) {
    this.podcastService.getPodcastEpisodes(podcastId);
    this.getPodcastDetail(podcastId);
  }

  getPodcastDetail(podcastId: string) {
    this.podcastService.podcastList$
      .pipe(
        filter((podcastList) => !!podcastList.length),
        first()
      )
      .subscribe((podcastList) => {
        this.podcastDetail = podcastList.find(
          (podcast) => podcast.id.attributes['im:id'] === podcastId
        );
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.podcastService.cleanPodcastEpisodes();
  }
}
