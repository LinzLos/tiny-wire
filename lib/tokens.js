/**
 * Tiny Wire — Design Tokens
 * Mirrors lib/globals.css. Import to access tokens from JS.
 */

export const tokens = {
  colors: {
    light: {
      surface: '#FFFFFF', surfaceSubtle: '#F7F4F3', surfacePage: '#F7F4F3',
      surfaceMuted: '#F1EDEC', surfaceInset: '#EDE8E6',
      border: '#DDD7D5', borderLight: '#E8E3E2', borderDashed: '#AD9B9A', borderStrong: '#C4BBB8',
      textPrimary: '#1E1918', textSecondary: '#5C504F', textTertiary: '#8A7E7D',
      textInverse: '#FFFFFF', textDisabled: '#B5ABA8',
      brand: '#629460', brandLight: '#F2F6F2', brandMid: '#C8D9C7', brandDark: '#3F603E',
      danger: '#CE430A', dangerLight: '#FBEFEB', dangerMid: '#EBB39D',
      warning: '#6B4B3E', warningLight: '#F3F0EF', warningMid: '#C3B7B1',
      info: '#1B4079', infoLight: '#ECEFF4', infoMid: '#AFBCD0',
      accent: '#0EA5E9', accentLight: '#EBF7FD',
      dataInflow: '#CE430A', dataOutflow: '#629460', dataTarget: '#AD9B9A',
      chartBlue: '#1B4079', chartAzure: '#0EA5E9',
      chartAmber: '#B98326', chartViolet: '#6B4B8A',
    },
    dark: {
      surface: '#1F1A18', surfaceSubtle: '#19130F', surfacePage: '#16110F',
      surfaceMuted: '#2A211E', surfaceInset: '#322924',
      border: '#3A312D', borderLight: '#2E2722', borderDashed: '#6B5C57', borderStrong: '#4D423D',
      textPrimary: '#F4EEEC', textSecondary: '#C5B6B2', textTertiary: '#847671',
      textInverse: '#1E1918', textDisabled: '#5F5450',
      brand: '#8FB68D', brandLight: '#1F2A1F', brandMid: '#3F603E', brandDark: '#C8D9C7',
      danger: '#E66B36', dangerLight: '#2E1C13', dangerMid: '#6E3217',
      warning: '#B89283', warningLight: '#251D19', warningMid: '#483630',
      info: '#6B8FC2', infoLight: '#15203A', infoMid: '#2E4775',
      accent: '#3DBEF5', accentLight: '#0C2A3A',
      dataInflow: '#E66B36', dataOutflow: '#8FB68D', dataTarget: '#847671',
      chartBlue: '#6B8FC2', chartAzure: '#3DBEF5',
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
      lg: 16, xl: 18, '2xl': 20, '3xl': 26, '4xl': 34, '5xl': 48,
    },
    fontWeight: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
    lineHeight: { tight: 1, snug: 1.1, compact: 1.3, normal: 1.5 },
    letterSpacing: { tight: '-0.6px', snug: '-0.3px', slight: '-0.1px', caps: '0.07em' },
  },
  spacing: { 0:0, 2:2, 4:4, 5:5, 6:6, 7:7, 8:8, 10:10, 12:12, 14:14, 16:16, 18:18, 20:20, 24:24, 32:32, 40:40, 48:48, 64:64 },
  borderRadius: { xs: '4px', sm: '6px', md: '8px', base: '10px', lg: '12px', full: '9999px' },
  shadows: {
    card:      '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
    nav:       '0 1px 3px rgba(0,0,0,0.08)',
    toggle:    '0 1px 3px rgba(0,0,0,0.10)',
    hover:     '0 6px 24px rgba(0,0,0,0.07)',
    modal:     '0 12px 32px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.06)',
    dropdown:  '0 8px 24px rgba(0,0,0,0.10)',
    overlay:   '0 4px 20px rgba(0,0,0,0.18)',
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
