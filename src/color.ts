/**
 * Color utilities for design systems
 * Provides functions for color manipulation and conversion
 * @module color
 */

/**
 * Represents an RGB color
 */
export interface RGB {
  r: number;
  g: number;
  b: number;
}

/**
 * Represents an RGBA color
 */
export interface RGBA extends RGB {
  a: number;
}

/**
 * Represents an HSL color
 */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Converts a hex color to RGB
 * @param hex - Hex color string (#RRGGBB or RRGGBB or #RGB or RGB)
 * @returns RGB object
 * @example
 * ```ts
 * hexToRgb('#FF0000') // { r: 255, g: 0, b: 0 }
 * hexToRgb('0F0') // { r: 0, g: 255, b: 0 }
 * ```
 */
export function hexToRgb(hex: string): RGB {
  let cleanHex = hex.replace(/^#/, '');

  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  if (cleanHex.length !== 6 || !/^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
    throw new Error('Invalid hex color format');
  }

  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return { r, g, b };
}

/**
 * Converts RGB to a hex color string
 * @param rgb - RGB object
 * @returns Hex color string
 * @example
 * ```ts
 * rgbToHex({ r: 255, g: 0, b: 0 }) // '#FF0000'
 * ```
 */
export function rgbToHex(rgb: RGB): string {
  const toHex = (value: number): string => {
    const hex = value.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(rgb.r).toUpperCase()}${toHex(rgb.g).toUpperCase()}${toHex(rgb.b).toUpperCase()}`;
}

/**
 * Converts RGB to HSL
 * @param rgb - RGB object
 * @returns HSL object (h: 0-360, s: 0-100, l: 0-100)
 * @example
 * ```ts
 * rgbToHsl({ r: 255, g: 0, b: 0 }) // { h: 0, s: 100, l: 50 }
 * ```
 */
export function rgbToHsl(rgb: RGB): HSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts HSL to RGB
 * @param hsl - HSL object (h: 0-360, s: 0-100, l: 0-100)
 * @returns RGB object
 * @example
 * ```ts
 * hslToRgb({ h: 0, s: 100, l: 50 }) // { r: 255, g: 0, b: 0 }
 * ```
 */
export function hslToRgb(hsl: HSL): RGB {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/**
 * Converts hex to HSL
 * @param hex - Hex color string
 * @returns HSL object
 * @example
 * ```ts
 * hexToHsl('#FF0000') // { h: 0, s: 100, l: 50 }
 * ```
 */
export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

/**
 * Converts HSL to hex
 * @param hsl - HSL object
 * @returns Hex color string
 * @example
 * ```ts
 * hslToHex({ h: 0, s: 100, l: 50 }) // '#FF0000'
 * ```
 */
export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

/**
 * Lightens a color by a specified amount
 * @param hex - Hex color string
 * @param amount - Amount to lighten (0-100)
 * @returns Lightened hex color
 * @example
 * ```ts
 * lighten('#FF0000', 20) // Lighter red
 * ```
 */
export function lighten(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  hsl.l = Math.min(100, hsl.l + amount);
  return hslToHex(hsl);
}

/**
 * Darkens a color by a specified amount
 * @param hex - Hex color string
 * @param amount - Amount to darken (0-100)
 * @returns Darkened hex color
 * @example
 * ```ts
 * darken('#FF0000', 20) // Darker red
 * ```
 */
export function darken(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  hsl.l = Math.max(0, hsl.l - amount);
  return hslToHex(hsl);
}

/**
 * Saturates a color by a specified amount
 * @param hex - Hex color string
 * @param amount - Amount to saturate (0-100)
 * @returns Saturated hex color
 */
export function saturate(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  hsl.s = Math.min(100, hsl.s + amount);
  return hslToHex(hsl);
}

/**
 * Desaturates a color by a specified amount
 * @param hex - Hex color string
 * @param amount - Amount to desaturate (0-100)
 * @returns Desaturated hex color
 */
export function desaturate(hex: string, amount: number): string {
  const hsl = hexToHsl(hex);
  hsl.s = Math.max(0, hsl.s - amount);
  return hslToHex(hsl);
}

/**
 * Calculates the relative luminance of a color (for contrast ratio)
 * @param hex - Hex color string
 * @returns Luminance value (0-1)
 */
export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  const luminance = (value: number): number => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };

  return 0.2126 * luminance(rgb.r) + 0.7152 * luminance(rgb.g) + 0.0722 * luminance(rgb.b);
}

/**
 * Calculates the contrast ratio between two colors (WCAG)
 * @param hex1 - First hex color string
 * @param hex2 - Second hex color string
 * @returns Contrast ratio (1-21)
 * @example
 * ```ts
 * contrastRatio('#FFFFFF', '#000000') // 21 (maximum)
 * ```
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const lum1 = getLuminance(hex1);
  const lum2 = getLuminance(hex2);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Checks if two colors have sufficient contrast for WCAG AA compliance
 * @param hex1 - First hex color string
 * @param hex2 - Second hex color string
 * @param level - WCAG level: 'AA' (4.5:1) or 'AAA' (7:1)
 * @returns Whether the contrast ratio meets the WCAG level
 * @example
 * ```ts
 * meetsContrastRatio('#FFFFFF', '#000000', 'AA') // true
 * ```
 */
export function meetsContrastRatio(
  hex1: string,
  hex2: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  const ratio = contrastRatio(hex1, hex2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

/**
 * Inverts a color
 * @param hex - Hex color string
 * @returns Inverted hex color
 * @example
 * ```ts
 * invert('#FF0000') // '#00FFFF'
 * ```
 */
export function invert(hex: string): string {
  const rgb = hexToRgb(hex);
  return rgbToHex({
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b,
  });
}

/**
 * Generates a complementary color
 * @param hex - Hex color string
 * @returns Complementary hex color
 */
export function complement(hex: string): string {
  const hsl = hexToHsl(hex);
  hsl.h = (hsl.h + 180) % 360;
  return hslToHex(hsl);
}
