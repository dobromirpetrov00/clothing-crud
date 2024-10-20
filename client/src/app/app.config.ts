import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * Configures the Angular application with the necessary providers for routing, HTTP client, and animations.
 * This configuration is exported as the `appConfig` object, which can be used to bootstrap the application.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideAnimations()],
};
