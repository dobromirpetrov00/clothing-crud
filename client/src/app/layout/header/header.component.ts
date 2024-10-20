import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * The `HeaderComponent` is a standalone Angular component that represents the header of the application.
 * It imports the `RouterModule` to enable routing functionality within the header.
 * The component is defined with a selector of `app-header`, and its template and styles are defined in the corresponding HTML and SCSS files.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {}
