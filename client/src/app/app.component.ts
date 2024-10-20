import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

/**
 * The root component of the Angular application.
 * This component serves as the entry point and container for the application's layout and routing.
 * It imports and uses the `CommonModule`, `RouterOutlet`, `HeaderComponent`, and `FooterComponent` to provide the basic structure and functionality.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
