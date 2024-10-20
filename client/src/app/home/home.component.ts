import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

/**
 * The `HomeComponent` is the main component for the home page of the application.
 * It is responsible for displaying a list of products, allowing the user to paginate through the results,
 * and providing functionality to edit and add new products.
 * The component uses the `ProductsService` to fetch and manage the product data.
 * It also imports and uses several other components and modules to provide the desired functionality.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopupComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = []; // Array to hold the list of products

  totalRecords: number = 0; // Total number of product records
  rows: number = 12; // Number of rows per page for pagination

  displayEditPopup: boolean = false; // Flag to control the display of the edit popup
  displayAddPopup: boolean = false; // Flag to control the display of the add popup

  // Toggles the edit popup for a specific product
  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  // Toggles the delete popup for a specific product
  toggleDeletePopup(product: Product) {
    if (!product.id) {
      return;
    }

    this.deleteProduct(product.id);
  }

  // Toggles the add popup
  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  }; // Holds the currently selected product for editing

  // Confirms the edit operation for a product
  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }

    this.editProduct(product, this.selectedProduct.id);
    this.displayEditPopup = false;
  }

  // Confirms the add operation for a new product
  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  // Handles the output from the product component
  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  // Handles page change events for pagination
  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  // Resets the paginator to the first page
  resetPaginator() {
    this.paginator?.changePage(0);
  }

  // Fetches products from the server with pagination
  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalRecords = data.total;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // Edits a product on the server
  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // Deletes a product from the server
  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // Adds a new product to the server
  addProduct(product: Product) {
    this.productsService
      .addProduct(`http://localhost:3000/clothes`, product)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // Lifecycle hook that is called after the component is initialized
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
