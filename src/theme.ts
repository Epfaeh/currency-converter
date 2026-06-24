export const theme = {
  colors: {
    background: '#f5f6f8',
    surface: '#ffffff',
    text: '#1a1a2e',
    muted: '#6b7280',
    border: '#e5e7eb',
    accent: '#4f46e5',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  radius: {
    sm: '6px',
    md: '12px',
  },
  fontSize: {
    sm: '14px',
    base: '16px',
    xl: '32px',
  },
} as const

export type Theme = typeof theme
