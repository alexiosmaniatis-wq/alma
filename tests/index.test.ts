import { describe, it, expect } from 'vitest';
import { greet, version } from '../src/index';

describe('Alma', () => {
  it('should have a version', () => {
    expect(version).toBeDefined();
    expect(version).toBe('0.1.0');
  });

  it('should greet by name', () => {
    const result = greet('Developer');
    expect(result).toBe('Welcome to Alma, Developer!');
  });
});
