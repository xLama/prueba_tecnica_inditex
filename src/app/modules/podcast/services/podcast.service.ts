import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Episode, Podcast } from '../model/model';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  private _podcastList = new BehaviorSubject<Podcast[]>([]);
  private _currentPodcastEpisodes = new BehaviorSubject<Episode[]>([]);

  constructor(private httpClient: HttpClient) {}

  getPodcastList() {
    this.httpClient
      .get(
        'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
      )
      .pipe(map((value: any) => value.feed.entry))
      .subscribe((podcastList: Podcast[]) =>
        this._podcastList.next(podcastList)
      );
  }

  getPodcastEpisodes(podcastId: string) {
    this.httpClient
      .get(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
          `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=20`
        )}`
      )
      .pipe(map((response) => JSON.parse((response as any).contents).results))
      .subscribe((podcastEpisodes: Episode[]) => {
        this._currentPodcastEpisodes.next(podcastEpisodes);
      });
  }

  cleanPodcastEpisodes() {
    this._currentPodcastEpisodes.next([]);
  }

  get podcastList$() {
    return this._podcastList.asObservable();
  }

  get currentPodcastEpisodes$() {
    return this._currentPodcastEpisodes.asObservable();
  }
}
