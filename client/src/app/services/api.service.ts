import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Options, Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
/**
 * Service that provides methods for making HTTP requests to a backend API.
 */
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Sends a GET request to the specified URL.
   * @param url The endpoint URL.
   * @param options The HTTP options to send with the request.
   * @returns An Observable of the response type.
   */
  get<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  /**
   * Sends a POST request to the specified URL with a body.
   * @param url The endpoint URL.
   * @param body The body to send with the request.
   * @param options The HTTP options to send with the request.
   * @returns An Observable of the response type.
   */
  post<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  /**
   * Sends a PUT request to the specified URL with a body.
   * @param url The endpoint URL.
   * @param body The body to send with the request.
   * @param options The HTTP options to send with the request.
   * @returns An Observable of the response type.
   */
  put<T>(url: string, body: Product, options: Options): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  /**
   * Sends a DELETE request to the specified URL.
   * @param url The endpoint URL.
   * @param options The HTTP options to send with the request.
   * @returns An Observable of the response type.
   */
  delete<T>(url: string, options: Options): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
