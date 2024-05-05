import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Episode, Podcast } from '../model';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  podcastList = new BehaviorSubject<Podcast[]>([]);
  currentPodcastEpisodes = new BehaviorSubject<Episode[]>([]);

  constructor(private httpClient: HttpClient) {}

  getPodcastList() {
    this.httpClient
      .get(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )
      .pipe(map((value: any) => value.feed.entry))
      .subscribe((podcastList) => this.podcastList.next(podcastList));
  }

  getPodcastEpisodes(podcastId: string) {
    this.httpClient
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`
      )
      .pipe(map((response) => JSON.parse((response as any).contents).results))
      .subscribe((podcastEpisodes) => {
        this.currentPodcastEpisodes.next(podcastEpisodes);
      });
  }

  cleanPodcastEpisodes() {
    this.currentPodcastEpisodes.next([]);
  }
}
