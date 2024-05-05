import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private localStorage = localStorage;

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
    return [(Date.now() - cachedData.date) / 8.64e7 < 1, cachedData.value];
  }

  cacheable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }
}
