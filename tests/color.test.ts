import { describe, it, expect } from 'vitest';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  hexToHsl,
  hslToHex,
  lighten,
  darken,
  saturate,
  desaturate,
  getLuminance,
  contrastRatio,
  meetsContrastRatio,
  invert,
  complement,
} from '../src/color';

describe('Color Utilities', () => {
  describe('Color Conversion', () => {
    it('hexToRgb - full hex', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
    });

    it('hexToRgb - without hash', () => {
      expect(hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('hexToRgb - short hex', () => {
      expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(hexToRgb('#0F0')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('hexToRgb - invalid format', () => {
      expect(() => hexToRgb('#12345')).toThrow();
      expect(() => hexToRgb('GGGGGG')).toThrow();
    });

    it('rgbToHex', () => {
      expect(rgbToHex({ r: 255, g: 0, b: 0 })).toBe('#FF0000');
      expect(rgbToHex({ r: 0, g: 255, b: 0 })).toBe('#00FF00');
      expect(rgbToHex({ r: 0, g: 0, b: 255 })).toBe('#0000FF');
    });

    it('rgbToHsl - primary colors', () => {
      const red = rgbToHsl({ r: 255, g: 0, b: 0 });
      expect(red.h).toBe(0);
      expect(red.s).toBe(100);
      expect(red.l).toBe(50);
    });

    it('hslToRgb - primary colors', () => {
      expect(hslToRgb({ h: 0, s: 100, l: 50 })).toEqual({ r: 255, g: 0, b: 0 });
      expect(hslToRgb({ h: 120, s: 100, l: 50 })).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('hexToHsl', () => {
      const hsl = hexToHsl('#FF0000');
      expect(hsl.h).toBe(0);
      expect(hsl.s).toBe(100);
      expect(hsl.l).toBe(50);
    });

    it('hslToHex', () => {
      expect(hslToHex({ h: 0, s: 100, l: 50 })).toBe('#FF0000');
    });

    it('round-trip conversions are close', () => {
      const original = '#FF5733';
      const hex = hslToHex(hexToHsl(original));
      // Due to rounding, we check that it's very close
      const origRgb = hexToRgb(original);
      const resultRgb = hexToRgb(hex);
      expect(Math.abs(origRgb.r - resultRgb.r)).toBeLessThan(2);
      expect(Math.abs(origRgb.g - resultRgb.g)).toBeLessThan(2);
      expect(Math.abs(origRgb.b - resultRgb.b)).toBeLessThan(2);
    });
  });

  describe('Color Manipulation', () => {
    it('lighten', () => {
      const lightened = lighten('#FF0000', 20);
      const hsl = hexToHsl(lightened);
      expect(hsl.l).toBeGreaterThan(50);
    });

    it('darken', () => {
      const darkened = darken('#FF0000', 20);
      const hsl = hexToHsl(darkened);
      expect(hsl.l).toBeLessThan(50);
    });

    it('saturate', () => {
      const saturated = saturate('#FF8080', 10);
      const hsl = hexToHsl(saturated);
      expect(hsl.s).toBeGreaterThanOrEqual(hexToHsl('#FF8080').s);
    });

    it('desaturate', () => {
      const desaturated = desaturate('#FF0000', 50);
      const hsl = hexToHsl(desaturated);
      expect(hsl.s).toBeLessThan(100);
    });

    it('invert', () => {
      expect(invert('#FF0000')).toBe('#00FFFF');
      expect(invert('#FFFFFF')).toBe('#000000');
      expect(invert('#000000')).toBe('#FFFFFF');
    });

    it('complement', () => {
      const comp = complement('#FF0000');
      const hsl1 = hexToHsl('#FF0000');
      const hsl2 = hexToHsl(comp);
      expect(Math.abs(hsl1.h - hsl2.h)).toBe(180);
    });
  });

  describe('Contrast and Accessibility', () => {
    it('contrastRatio - perfect contrast', () => {
      const ratio = contrastRatio('#FFFFFF', '#000000');
      expect(ratio).toBe(21);
    });

    it('contrastRatio - same color', () => {
      const ratio = contrastRatio('#FF0000', '#FF0000');
      expect(ratio).toBe(1);
    });

    it('meetsContrastRatio - WCAG AA', () => {
      expect(meetsContrastRatio('#FFFFFF', '#000000', 'AA')).toBe(true);
      expect(meetsContrastRatio('#FFFFFF', '#FFFFFF', 'AA')).toBe(false);
    });

    it('meetsContrastRatio - WCAG AAA', () => {
      expect(meetsContrastRatio('#FFFFFF', '#000000', 'AAA')).toBe(true);
      expect(meetsContrastRatio('#FFFFFF', '#999999', 'AAA')).toBe(false);
    });

    it('getLuminance - white and black', () => {
      const whiteLum = getLuminance('#FFFFFF');
      const blackLum = getLuminance('#000000');
      expect(whiteLum).toBeGreaterThan(blackLum);
      expect(whiteLum).toBeCloseTo(1, 1);
      expect(blackLum).toBeCloseTo(0, 1);
    });
  });

  describe('Edge Cases', () => {
    it('handles grayscale colors', () => {
      const gray = hexToRgb('#808080');
      expect(gray).toEqual({ r: 128, g: 128, b: 128 });
    });

    it('handles very light colors', () => {
      const light = lighten('#FFFFFF', 10);
      expect(light).toBe('#FFFFFF');
    });

    it('handles very dark colors', () => {
      const dark = darken('#000000', 10);
      expect(dark).toBe('#000000');
    });
  });
});
