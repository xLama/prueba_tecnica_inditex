import { HttpResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, tap } from 'rxjs';
import { CacheService } from './cache.service';

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  const cacheService = inject(CacheService);

  if (!cacheService.cacheable(req)) return next(req);

  const [cacheIsValid, cacheData] = cacheService.cacheIsValid(req);
  if (cacheIsValid) return of(new HttpResponse(cacheData));

  return next(req).pipe(
    tap((stateEvent: any) => {
      if (stateEvent instanceof HttpResponse) {
        cacheService.put(req.url, stateEvent.clone());
      }
    })
  );
};
