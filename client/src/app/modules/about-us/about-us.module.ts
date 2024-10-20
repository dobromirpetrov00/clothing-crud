import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';

/**
 * The `AboutUsModule` is a feature module that provides the necessary components and routing for the "About Us" section of the application.
 * It imports the `CommonModule` for common Angular directives and the `AboutUsRoutingModule` for the routing configuration.
 * The module declares the `AboutUsComponent` as the main component for the "About Us" feature.
 */
@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, AboutUsRoutingModule],
  exports: [],
  providers: [],
})
export class AboutUsModule {}
