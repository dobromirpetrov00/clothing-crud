import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
/**
 * A pipe that formats a numeric value as a price with the currency symbol "лв.".
 *
 * @param value The numeric value to format as a price.
 * @returns The formatted price string.
 */
export class PricePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return `${value}лв.`;
  }
}
