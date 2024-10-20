import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PaginationParams, Products } from '../../types';

@Injectable({
  providedIn: 'root',
})
/**
 * Provides methods for managing products in the application.
 */
export class ProductsService {
  constructor(private apiService: ApiService) {}

  /**
   * Fetches a list of products from the server.
   * @param url - The endpoint URL to fetch products from.
   * @param params - Pagination parameters for the request.
   * @returns An observable containing the list of products.
   */
  getProducts = (
    url: string,
    params: PaginationParams
  ): Observable<Products> => {
    return this.apiService.get(url, {
      params,
      responseType: 'json',
    });
  };

  /**
   * Adds a new product to the server.
   * @param url - The endpoint URL to add the product to.
   * @param body - The product data to be added.
   * @returns An observable containing the server's response.
   */
  addProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.post(url, body, {});
  };

  /**
   * Edits an existing product on the server.
   * @param url - The endpoint URL of the product to be edited.
   * @param body - The updated product data.
   * @returns An observable containing the server's response.
   */
  editProduct = (url: string, body: any): Observable<any> => {
    return this.apiService.put(url, body, {});
  };

  /**
   * Deletes a product from the server.
   * @param url - The endpoint URL of the product to be deleted.
   * @returns An observable containing the server's response.
   */
  deleteProduct = (url: string): Observable<any> => {
    return this.apiService.delete(url, {});
  };
}
