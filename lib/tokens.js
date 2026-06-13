/**
 * Tiny Wire — Design Tokens
 * Mirrors lib/globals.css. Import to access tokens from JS.
 *
 * Three tiers: `primitives` (raw ramps) → `colors` (resolved semantic values per
 * theme) → component aliases live in CSS only. The `colors` block is the resolved
 * value of each semantic token, so JS consumers and generators read the same value
 * the browser computes. Keep this file in lockstep with globals.css.
 */

export const primitives = {
  warm: {
    0: '#FFFFFF', 50: '#F7F4F2', 100: '#F1EDEB', 150: '#EBE6E3', 200: '#E5DFDC',
    300: '#D6CFCB', 400: '#C2B9B5', 500: '#A89E99', 600: '#8A7F7B',
    700: '#6E625F', 800: '#5C504F', 900: '#3A302E', 950: '#1E1918',
  },
  cobalt: {
    50: '#EEF1FB', 100: '#DBE2F4', 200: '#BCC9EA', 300: '#93A8DE', 400: '#6E86D2',
    500: '#4761BE', 600: '#2F4BA6', 700: '#243B83', 800: '#1C2F66', 900: '#16244E',
  },
  green: { 100: '#F2F6F2', 300: '#C8D9C7', 500: '#629460', 700: '#3F603E' },
  clay:  { 100: '#F4EFEA', 300: '#DCC9B5', 600: '#9A6B33', 700: '#6B4B3E' },
  red:   { 100: '#FBEFEB', 300: '#EBB39D', 500: '#CE430A' },
  azure: { 500: '#0EA5E9', light: '#EBF7FD' },
  amberChart: '#B98326',
  violetChart: '#6B4B8A',
}

export const tokens = {
  colors: {
    light: {
      surface: '#FFFFFF', surfaceSubtle: '#F7F4F2', surfacePage: '#F7F4F2',
      surfaceMuted: '#F1EDEB', surfaceInset: '#EBE6E3',
      border: '#D6CFCB', borderLight: '#E5DFDC', borderDashed: '#A89E99', borderStrong: '#C2B9B5',
      textPrimary: '#1E1918', textSecondary: '#5C504F', textTertiary: '#6E625F',
      textInverse: '#FFFFFF', textDisabled: '#B5ABA8',
      brand: '#629460', brandLight: '#F2F6F2', brandMid: '#C8D9C7', brandDark: '#3F603E',
      danger: '#CE430A', dangerLight: '#FBEFEB', dangerMid: '#EBB39D',
      warning: '#9A6B33', warningLight: '#F4EFEA', warningMid: '#DCC9B5',
      info: '#243B83', infoLight: '#EEF1FB', infoMid: '#BCC9EA',
      accent: '#2F4BA6', accentLight: '#EEF1FB',
      dataInflow: '#CE430A', dataOutflow: '#629460', dataTarget: '#A89E99',
      chartBlue: '#243B83', chartAzure: '#0EA5E9',
      chartAmber: '#B98326', chartViolet: '#6B4B8A',
    },
    dark: {
      surface: '#1F1A18', surfaceSubtle: '#19130F', surfacePage: '#16110F',
      surfaceMuted: '#2A211E', surfaceInset: '#322924',
      border: '#3A312D', borderLight: '#2E2722', borderDashed: '#6B5C57', borderStrong: '#4D423D',
      textPrimary: '#F4EEEC', textSecondary: '#C5B6B2', textTertiary: '#A0928E',
      textInverse: '#1E1918', textDisabled: '#756763',
      brand: '#8FB68D', brandLight: '#1F2A1F', brandMid: '#3F603E', brandDark: '#C8D9C7',
      danger: '#E66B36', dangerLight: '#2E1C13', dangerMid: '#6E3217',
      warning: '#C9A063', warningLight: '#251D19', warningMid: '#4A3A24',
      info: '#7E96D8', infoLight: '#1A2342', infoMid: '#2E3F6B',
      accent: '#8AA0DE', accentLight: '#1A2342',
      dataInflow: '#E66B36', dataOutflow: '#8FB68D', dataTarget: '#847671',
      chartBlue: '#7E96D8', chartAzure: '#3DBEF5',
      chartAmber: '#D4A04A', chartViolet: '#9F7CBC',
    },
  },
  typography: {
    fontFamily: {
      heading: "'Bricolage Grotesque', system-ui, sans-serif",
      body:    "'DM Sans', system-ui, sans-serif",
      mono:    "ui-monospace, 'SF Mono', Menlo, Consolas, monospace",
    },
    fontSize: {
      '2xs': 9, xs: 10, sm: 11, md: 12, base: 13,
      lg: 16, xl: 19, '2xl': 23, '3xl': 28, '4xl': 33, '5xl': 48,
    },
    fontWeight: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1, snug: 1.1, compact: 1.3, normal: 1.5 },
    letterSpacing: { tight: '-0.02em', snug: '-0.01em', slight: '-0.005em', caps: '0.07em' },
    numericTabular: '"tnum" 1, "lnum" 1',
  },
  spacing: { 0:0, 2:2, 4:4, 5:4, 6:6, 7:8, 8:8, 10:10, 12:12, 14:14, 16:16, 18:18, 20:20, 24:24, 32:32, 40:40, 48:48, 64:64 },
  borderRadius: { '2xs': '2px', xs: '4px', sm: '6px', md: '8px', base: '8px', lg: '12px', full: '9999px' },
  elevation: {
    sm: '0 1px 2px rgba(30,25,24,0.05), 0 1px 1px rgba(30,25,24,0.04)',
    md: '0 2px 4px rgba(30,25,24,0.05), 0 6px 16px rgba(30,25,24,0.06)',
    lg: '0 8px 24px rgba(30,25,24,0.10)',
    xl: '0 16px 40px rgba(30,25,24,0.14), 0 2px 6px rgba(30,25,24,0.06)',
  },
  shadows: {
    card:      '0 1px 2px rgba(30,25,24,0.05), 0 1px 1px rgba(30,25,24,0.04)',
    nav:       '0 1px 2px rgba(30,25,24,0.05), 0 1px 1px rgba(30,25,24,0.04)',
    toggle:    '0 1px 2px rgba(30,25,24,0.05), 0 1px 1px rgba(30,25,24,0.04)',
    hover:     '0 2px 4px rgba(30,25,24,0.05), 0 6px 16px rgba(30,25,24,0.06)',
    modal:     '0 16px 40px rgba(30,25,24,0.14), 0 2px 6px rgba(30,25,24,0.06)',
    dropdown:  '0 8px 24px rgba(30,25,24,0.10)',
    overlay:   '0 8px 24px rgba(30,25,24,0.10)',
  },
  animation: {
    easing: {
      spring:   'cubic-bezier(0.16, 1, 0.3, 1)',
      easeOut:  'ease-out',
      standard: 'ease',
    },
    duration: { fast: '0.15s', base: '0.22s', moderate: '0.30s', slow: '0.40s' },
  },
}

export default tokens
