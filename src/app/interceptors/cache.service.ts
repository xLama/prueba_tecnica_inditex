import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CACHE_TIME_TOKEN } from '../tokens/tokens';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private localStorage = localStorage;

  constructor(@Inject(CACHE_TIME_TOKEN) private cacheTime: number) {}

  put(key: string, value: any) {
    this.localStorage.setItem(key, JSON.stringify({ date: Date.now(), value }));
  }

  get(key: string) {
    return JSON.parse(this.localStorage.getItem(key) || '{}') as {
      date: number;
      value: any;
    };
  }

  cacheIsValid(req: HttpRequest<any>): [boolean, any] {
    const cachedData = this.get(req.url);
    return [
      (Date.now() - cachedData.date) / this.cacheTime < 1,
      cachedData.value,
    ];
  }

  cacheable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }
}
