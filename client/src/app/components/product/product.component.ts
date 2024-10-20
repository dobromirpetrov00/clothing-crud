import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';

/**
 * The `ProductComponent` is a standalone Angular component that represents a product in the application.
 * It provides functionality to edit and delete the product, and emits events to notify the parent component of these actions.
 * The component uses various PrimeNG modules and custom pipes to render the product information.
 */
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule,
    FormsModule,
    ButtonModule,
    ConfirmPopupModule,
    ToastModule,
    PricePipe,
    TruncateNamePipe,
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}

  @ViewChild('deleteButton') deleteButton: any; // Reference to the delete button element

  @Input() product!: Product; // Input property to receive product data
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>(); // Output event emitter for editing a product
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>(); // Output event emitter for deleting a product

  // Method to emit an edit event with the current product
  editProduct() {
    this.edit.emit(this.product);
  }

  // Method to confirm deletion of the product
  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement, // Target the delete button for the confirmation popup
      message: 'Are you sure that you want to delete this product?', // Confirmation message
      accept: () => {
        this.deleteProduct(); // Call deleteProduct if confirmed
      },
    });
  }

  // Method to emit a delete event with the current product
  deleteProduct() {
    this.delete.emit(this.product);
  }

  // Lifecycle hook for component initialization
  ngOnInit() {}
}
