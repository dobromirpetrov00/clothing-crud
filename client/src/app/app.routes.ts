import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

/**
 * Defines the routes for the Angular application.
 * The root path '' maps to the HomeComponent, and the 'about-us' path
 * lazily loads the AboutUsModule.
 */
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./modules/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
];
