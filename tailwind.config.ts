import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  '#FFF5E0',
          100: '#FFE8B2',
          200: '#FFD066',
          300: '#F5B800',
          400: '#E8A000',
          500: '#D4860A',
          600: '#B8540A',
          700: '#8C3A00',
          800: '#5C2400',
          900: '#2E1000',
        },
        gold: {
          50:  '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          300: '#F2C94C',
          400: '#D4A017',
          500: '#B8860B',
          600: '#8B6600',
          700: '#6B4F00',
          800: '#4A3500',
          900: '#2A1E00',
        },
        maroon: {
          50:  '#FDF2F2',
          100: '#F9D5D5',
          200: '#F0A0A0',
          300: '#E06060',
          400: '#C03030',
          500: '#8B1A1A',
          600: '#6B0F0F',
          700: '#4A0A0A',
          800: '#2E0505',
          900: '#1A0000',
        },
        cream: {
          50:  '#FFFDF7',
          100: '#FFF8E8',
          200: '#FAF0D7',
          300: '#F0E0B8',
          400: '#E0CC99',
          500: '#C8B07A',
        },
        temple: {
          dark:  '#0D0500',
          smoke: 'rgba(255, 240, 200, 0.06)',
        },
      },
      fontFamily: {
        devanagari: ['var(--font-devanagari)'],
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      animation: {
        'marquee-ltr': 'marquee-ltr 40s linear infinite',
        'marquee-rtl': 'marquee-rtl 45s linear infinite',
        'float-up': 'float-up 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'smoke-rise': 'smoke-rise 4s ease-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'drift': 'drift 8s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s ease-in-out infinite',
      },
      keyframes: {
        'marquee-ltr': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rtl': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'float-up': {
          '0%, 100%': { transform: 'translateY(0px)', opacity: '0.5' },
          '50%': { transform: 'translateY(-12px)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 134, 10, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 134, 10, 0.7)' },
        },
        'smoke-rise': {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0.2' },
          '100%': { transform: 'translateY(-60px) scaleX(1.5)', opacity: '0' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.1', transform: 'scale(0.6)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        'drift': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '33%': { transform: 'translate(6px, -8px)' },
          '66%': { transform: 'translate(-4px, 5px)' },
        },
        'shimmer': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.4)' },
        },
      },
      backgroundImage: {
        'saffron-glow': 'radial-gradient(ellipse at center, rgba(212, 134, 10, 0.15) 0%, transparent 70%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(13,5,0,0.85) 0%, rgba(13,5,0,0.5) 50%, rgba(13,5,0,0.8) 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(242,201,76,0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}

export default config
