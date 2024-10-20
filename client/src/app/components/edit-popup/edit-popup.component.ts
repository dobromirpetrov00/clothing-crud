import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';

/**
 * The `EditPopupComponent` is a standalone Angular component that provides a dialog-based interface for editing product information.
 * It uses the `DialogModule`, `CommonModule`, `FormsModule`, `RatingModule`, `ButtonModule`, and `ReactiveFormsModule` from the PrimeNG library.
 * The component is responsible for displaying a popup dialog, managing the state of the product being edited, and emitting events when the user confirms the changes.
 */
@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    FormsModule,
    RatingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss',
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) {}

  @Input() display: boolean = false; // Input property to control the display state of the popup
  @Output() displayChange = new EventEmitter<boolean>(); // Output event emitter to notify when the display state changes

  @Input() header!: string; // Input property for the header text of the popup

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  }; // Input property for the product being edited

  @Output() confirm = new EventEmitter<Product>(); // Output event emitter to notify when the product is confirmed

  /**
   * Validator function to check for special characters in the input
   */
  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );

      return hasSpecialCharacter ? { hasSpecialCharacter: true } : null;
    };
  }

  // Form group for product details with validation
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, this.specialCharacterValidator()]], // Name field with required and special character validation
    image: [''], // Image field
    price: ['', [Validators.required]], // Price field with required validation
    rating: [0], // Rating field
  });

  /**
   * Lifecycle hook that is called when any data-bound property of a directive changes
   */
  ngOnChanges() {
    this.productForm.patchValue(this.product); // Update form values when the product input changes
  }

  /**
   * Method to handle the confirm action
   */
  onConfirm() {
    const { name, image, price, rating } = this.productForm.value;

    this.confirm.emit({
      name: name || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    }); // Emit the confirm event with the product details

    this.display = false; // Close the popup
    this.displayChange.emit(this.display); // Emit the display change event
  }

  /**
   * Method to handle the cancel action
   */
  onCancel() {
    this.display = false; // Close the popup
    this.displayChange.emit(this.display); // Emit the display change event
  }
}
