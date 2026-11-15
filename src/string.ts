/**
 * String manipulation utilities
 * Provides common string transformation functions for developers and designers
 * @module string
 */

/**
 * Converts a string to slug format (lowercase, hyphen-separated)
 * @param str - The string to slugify
 * @returns The slugified string
 * @example
 * ```ts
 * slugify('Hello World!') // 'hello-world'
 * slugify('User Profile Page') // 'user-profile-page'
 * ```
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Converts a string to camelCase format
 * @param str - The string to convert
 * @returns The camelCased string
 * @example
 * ```ts
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 * camelCase('hello world') // 'helloWorld'
 * ```
 */
export function camelCase(str: string): string {
  return str
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (match) => match.toLowerCase());
}

/**
 * Converts a string to PascalCase format
 * @param str - The string to convert
 * @returns The PascalCased string
 * @example
 * ```ts
 * pascalCase('hello-world') // 'HelloWorld'
 * pascalCase('hello_world') // 'HelloWorld'
 * pascalCase('hello world') // 'HelloWorld'
 * ```
 */
export function pascalCase(str: string): string {
  return str
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^(.)/, (match) => match.toUpperCase());
}

/**
 * Converts a string to snake_case format
 * @param str - The string to convert
 * @returns The snake_cased string
 * @example
 * ```ts
 * snakeCase('helloWorld') // 'hello_world'
 * snakeCase('Hello World') // 'hello_world'
 * ```
 */
export function snakeCase(str: string): string {
  return str
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[-\s]+/g, '_')
    .toLowerCase();
}

/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The capitalized string
 * @example
 * ```ts
 * capitalize('hello world') // 'Hello world'
 * ```
 */
export function capitalize(str: string): string {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Reverses a string
 * @param str - The string to reverse
 * @returns The reversed string
 * @example
 * ```ts
 * reverse('hello') // 'olleh'
 * ```
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}

/**
 * Checks if a string is a palindrome
 * @param str - The string to check
 * @returns Whether the string is a palindrome
 * @example
 * ```ts
 * isPalindrome('racecar') // true
 * isPalindrome('hello') // false
 * ```
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Truncates a string to a specified length with optional suffix
 * @param str - The string to truncate
 * @param length - Maximum length of the result
 * @param suffix - Optional suffix to append (default: '...')
 * @returns The truncated string
 * @example
 * ```ts
 * truncate('Hello World', 8) // 'Hello...'
 * truncate('Hello World', 8, '→') // 'Hello→'
 * ```
 */
export function truncate(str: string, length: number, suffix: string = '...'): string {
  if (str.length <= length) return str;
  return str.slice(0, length - suffix.length) + suffix;
}

/**
 * Repeats a string a specified number of times
 * @param str - The string to repeat
 * @param count - Number of times to repeat
 * @returns The repeated string
 * @example
 * ```ts
 * repeat('ha', 3) // 'hahaha'
 * ```
 */
export function repeat(str: string, count: number): string {
  if (count < 0) throw new Error('Count must be non-negative');
  return str.repeat(count);
}

/**
 * Pads a string on both sides to center it
 * @param str - The string to pad
 * @param length - Target length
 * @param padChar - Character to pad with (default: space)
 * @returns The padded string
 * @example
 * ```ts
 * padCenter('hello', 11) // '   hello   '
 * padCenter('hello', 11, '*') // '***hello***'
 * ```
 */
export function padCenter(str: string, length: number, padChar: string = ' '): string {
  if (str.length >= length) return str;
  const totalPad = length - str.length;
  const leftPad = Math.floor(totalPad / 2);
  const rightPad = totalPad - leftPad;
  return padChar.repeat(leftPad) + str + padChar.repeat(rightPad);
}

/**
 * Counts occurrences of a substring in a string
 * @param str - The string to search in
 * @param substring - The substring to count
 * @param caseSensitive - Whether search is case-sensitive (default: true)
 * @returns The count of occurrences
 * @example
 * ```ts
 * count('hello hello', 'hello') // 2
 * count('Hello HELLO', 'hello', false) // 2
 * ```
 */
export function count(str: string, substring: string, caseSensitive: boolean = true): number {
  if (substring.length === 0) return 0;
  const searchStr = caseSensitive ? str : str.toLowerCase();
  const searchTerm = caseSensitive ? substring : substring.toLowerCase();
  return searchStr.split(searchTerm).length - 1;
}
