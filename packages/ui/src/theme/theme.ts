import { alpha, createTheme } from '@mui/material/styles';

/** Brand tokens. One colour scheme only: change values here and the whole app follows. */
export const brand = {
  ink: '#0f1730',
  inkSoft: '#1b2547',
  cobalt: '#2a44d4',
  cobaltDark: '#1f33a8',
  marigold: '#f5b301',
  paper: '#f4f6fb',
  line: '#e0e5f2',
  muted: '#4a5578',
} as const;

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    /** Landing/dashboard content card: white surface, hairline border, lifts on hover. */
    feature: true;
  }
}

const DISPLAY = '"Bricolage Grotesque Variable", "Figtree Variable", system-ui, sans-serif';
const BODY = '"Figtree Variable", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: brand.cobalt, dark: brand.cobaltDark, contrastText: '#ffffff' },
    secondary: { main: brand.marigold, contrastText: brand.ink },
    background: { default: brand.paper, paper: '#ffffff' },
    text: { primary: brand.ink, secondary: brand.muted },
    divider: brand.line,
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: BODY,
    h1: { textWrap: 'balance', fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(2.25rem, 5.2vw, 3.75rem)', lineHeight: 1.04, letterSpacing: '-0.03em' },
    h2: { textWrap: 'balance', fontFamily: DISPLAY, fontWeight: 700, fontSize: 'clamp(1.75rem, 3.4vw, 2.5rem)', lineHeight: 1.1, letterSpacing: '-0.025em' },
    h3: { textWrap: 'balance', fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.625rem', lineHeight: 1.15, letterSpacing: '-0.02em' },
    h4: { fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.25rem', lineHeight: 1.2, letterSpacing: '-0.015em' },
    h5: { fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.125rem', lineHeight: 1.25 },
    h6: { fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem', lineHeight: 1.3 },
    subtitle1: { fontSize: '1.0625rem', lineHeight: 1.6 },
    body1: { fontSize: '1rem', lineHeight: 1.6 },
    body2: { fontSize: '0.9375rem', lineHeight: 1.55 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth', '@media (prefers-reduced-motion: reduce)': { scrollBehavior: 'auto' } },
        '[id]': { scrollMarginTop: '76px' },
        body: { WebkitFontSmoothing: 'antialiased' },
        '::selection': { background: alpha(brand.cobalt, 0.2) },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 10, transition: 'transform .15s ease, background-color .15s ease, box-shadow .15s ease', '&:active': { transform: 'translateY(1px)' } },
        sizeLarge: { padding: '11px 22px', fontSize: '1rem' },
        containedPrimary: { '&:hover': { backgroundColor: brand.cobaltDark, boxShadow: `0 8px 20px -8px ${alpha(brand.cobalt, 0.7)}` } },
        containedSecondary: { '&:hover': { backgroundColor: '#ffc61f', boxShadow: `0 8px 20px -8px ${alpha(brand.marigold, 0.7)}` } },
      },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderRadius: 16 } },
      variants: [
        {
          props: { variant: 'feature' },
          style: {
            backgroundColor: '#ffffff',
            border: `1px solid ${brand.line}`,
            boxShadow: 'none',
            transition: 'transform .22s ease, box-shadow .22s ease, border-color .22s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              borderColor: alpha(brand.cobalt, 0.45),
              boxShadow: `0 14px 32px -16px ${alpha(brand.ink, 0.35)}`,
            },
            '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
          },
        },
      ],
    },
    MuiAccordion: {
      defaultProps: { disableGutters: true, elevation: 0, square: false },
      styleOverrides: {
        root: { border: `1px solid ${brand.line}`, borderRadius: 12, backgroundColor: '#fff', '&:before': { display: 'none' }, '&.Mui-expanded': { borderColor: alpha(brand.cobalt, 0.4) } },
      },
    },
    MuiAccordionSummary: { styleOverrides: { root: { padding: '2px 18px', minHeight: 54 }, content: { margin: '12px 0' } } },
    MuiAccordionDetails: { styleOverrides: { root: { padding: '0 18px 16px' } } },
    MuiTextField: { defaultProps: { size: 'small', variant: 'outlined' } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10, backgroundColor: '#fff' } } },
    MuiToggleButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, borderRadius: 10 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
  },
});
