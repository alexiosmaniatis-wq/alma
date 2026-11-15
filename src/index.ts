/**
 * Alma - A modern development and design toolkit
 * @packageDocumentation
 */

export const version = '0.1.0';

/**
 * Greet function to verify project setup
 * @param name - The name to greet
 * @returns A greeting message
 */
export function greet(name: string): string {
  return `Welcome to Alma, ${name}!`;
}

// String utilities
export * from './string';

// Collection utilities
export * from './collections';

// Validation utilities
export * from './validation';

// Color utilities
export * from './color';
