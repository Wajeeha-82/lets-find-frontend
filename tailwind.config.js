/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#f5f9e9',
        ink: '#2B2B2B',
        primary: {
          50: '#eaf4f4',
          100: '#d3e6e3',
          200: '#b7d9d4',
          300: '#8fc4bc',
          400: '#5fa89e',
          500: '#358f80',
          600: '#2a7a6c',
          700: '#036666',
          800: '#024a4a',
          900: '#013a3a',
        },
        accent: {
          50: '#fdf6ea',
          100: '#f9e7c8',
          400: '#f0b86e',
          500: '#E8A33D',
          600: '#cf8e2a',
          700: '#a86f1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(3,102,102,0.04), 0 10px 28px rgba(3,102,102,0.07)',
        card: '0 2px 6px rgba(3,102,102,0.06), 0 18px 44px rgba(3,102,102,0.10)',
        lift: '0 6px 12px rgba(3,102,102,0.08), 0 26px 54px rgba(3,102,102,0.14)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pop: {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 6s ease-in-out infinite',
        pop: 'pop 0.3s ease-out both',
      },
    },
  },
  plugins: [],
};
