import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { httpErrorInterceptor } from './shared/services/http-error.interceptor';
import { tokenInterceptor } from './shared/services/token.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    provideHttpClient(
      withInterceptors([httpErrorInterceptor, tokenInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(), // Provides HttpClient for the entire app
    provideAnimations(),
    provideRouter(routes),
  ],
};
