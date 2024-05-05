import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cacheInterceptor } from './interceptors/cache.interceptor';
import { requestingInterceptor } from './interceptors/requesting.interceptor';
import { CACHE_EXPIRES_TIME, CACHE_TIME_TOKEN } from './tokens/tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([cacheInterceptor, requestingInterceptor])
    ),
    importProvidersFrom(BrowserAnimationsModule),
    { provide: CACHE_TIME_TOKEN, useValue: CACHE_EXPIRES_TIME },
  ],
};
