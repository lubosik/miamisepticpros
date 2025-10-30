import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': '#1a2332',
        'charcoal': '#2d3748',
        'body-text': '#374151',
        'muted-text': '#6b7280',
        'accent-green': '#047857',
        'accent-green-hover': '#065f46',
        'surface-white': '#ffffff',
        'surface-gray-50': '#f9fafb',
        'surface-gray-100': '#f3f4f6',
        'border-light': '#e5e7eb',
        'border-default': '#d1d5db',
      },
      fontFamily: {
        'serif-headings': ['Source Serif Pro', 'Georgia', 'Cambria', 'serif'],
        'sans-body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        'sans-ui': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'mono': ['SF Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      fontSize: {
        'h1': ['clamp(2.25rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'h2': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'h3': ['1.5rem', { lineHeight: '1.3' }],
        'h4': ['1.25rem', { lineHeight: '1.4' }],
        'h5': ['1.125rem', { lineHeight: '1.4' }],
        'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
        'body': ['1rem', { lineHeight: '1.7' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        'tiny': ['0.75rem', { lineHeight: '1.4' }],
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '6px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
      },
      maxWidth: {
        'prose': '72ch',
      },
    },
  },
  plugins: [],
};
export default config;
