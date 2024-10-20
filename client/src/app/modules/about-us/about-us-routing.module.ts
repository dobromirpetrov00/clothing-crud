import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';

/**
 * Defines the routing configuration for the "About Us" module.
 * This route configuration maps the empty path ('') to the `AboutUsComponent`.
 */
const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
  },
];

/**
 * Configures the routing for the "About Us" module, importing the child routes and exporting the router module.
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
