import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateName',
  standalone: true,
})
/**
 * A pipe that truncates a string to a maximum length, optionally appending an ellipsis.
 *
 * @param value The input string to be truncated.
 * @param maxLength The maximum length of the output string. Defaults to 16.
 * @param ellipsis The string to append if the input is truncated. Defaults to '...'.
 * @returns The truncated string, or the original string if it is shorter than the maximum length.
 */
export class TruncateNamePipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number = 16,
    ellipsis: string = '...'
  ): unknown {
    if (value.length > maxLength) {
      return value.slice(0, maxLength) + ellipsis;
    }

    return value;
  }
}
