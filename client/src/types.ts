import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

/**
 * Represents the options that can be passed to an HTTP request.
 *
 * @property {HttpHeaders | { [header: string]: string | string[] }} [headers] - The HTTP headers to include in the request.
 * @property {'body'} [observe] - Specifies that the response body should be returned.
 * @property {HttpContext} [context] - The HTTP context to use for the request.
 * @property {HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> }} [params] - The HTTP parameters to include in the request.
 * @property {boolean} [reportProgress] - Whether to report the progress of the request.
 * @property {'json'} [responseType] - Specifies that the response should be in JSON format.
 * @property {boolean} [withCredentials] - Whether to include credentials (cookies, headers, etc.) in the request.
 * @property {{ includeHeaders?: string[] } | boolean} [transferCache] - Whether to use the transfer cache for the request.
 */
export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  observe?: 'body';
  context?: HttpContext;
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

/**
 * Represents the response from a request to retrieve a list of products.
 *
 * @property {Product[]} items - The list of products.
 * @property {number} total - The total number of products.
 * @property {number} page - The current page of the pagination.
 * @property {number} perPage - The number of products per page.
 * @property {number} totalPages - The total number of pages.
 */
export interface Products {
  items: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

/**
 * Represents a product in the application.
 *
 * @property {number} [id] - The unique identifier for the product.
 * @property {string} price - The price of the product.
 * @property {string} name - The name of the product.
 * @property {string} image - The URL of the product image.
 * @property {number} rating - The rating of the product.
 */
export interface Product {
  id?: number;
  price: string;
  name: string;
  image: string;
  rating: number;
}

/**
 * Represents the parameters for pagination, including the current page and the number of items per page.
 *
 * @property {number} page - The current page of the pagination.
 * @property {number} perPage - The number of items to display per page.
 * @property {string|number|boolean|ReadonlyArray<string|number|boolean>} [param] - Additional parameters for the pagination, with keys as strings and values as strings, numbers, booleans, or readonly arrays of those types.
 */
export interface PaginationParams {
  [param: string]:
    | string
    | number
    | boolean
    | ReadonlyArray<string | number | boolean>;
  page: number;
  perPage: number;
}
