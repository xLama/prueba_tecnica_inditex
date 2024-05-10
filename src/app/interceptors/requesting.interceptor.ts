import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, of, tap } from 'rxjs';
import { NotifyHTTPRequesting } from '../services/notify-request.service';

export const requestingInterceptor: HttpInterceptorFn = (req, next) => {
  const notifyRequesting = inject(NotifyHTTPRequesting);
  return next(req).pipe(
    tap((stateEvent) => {
      if (!(stateEvent instanceof HttpResponse)) {
        notifyRequesting.requesting.next(true);
      }
    }),
    catchError((error) => {
      console.error('HTTP Error: ', error);
      return of(error);
    }),
    finalize(() => {
      notifyRequesting.requesting.next(false);
    })
  );
};
