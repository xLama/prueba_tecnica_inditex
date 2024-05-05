import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { cacheInterceptor } from './interceptor/cache.interceptor';
import { requestingInterceptor } from './interceptor/requesting.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([cacheInterceptor, requestingInterceptor])
    ),
    importProvidersFrom(BrowserAnimationsModule),
  ],
};
