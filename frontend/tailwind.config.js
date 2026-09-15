/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#060811',
          900: '#0B0F1E',
          850: '#10172D',
          800: '#161F3B',
          700: '#1E294B',
          600: '#2E3D6B',
          500: '#435591',
        },
        cipher: {
          violet: '#6366F1',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        space: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.35)',
        'glow-violet': '0 0 30px -5px rgba(99, 102, 241, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'vault-inner': 'inset 0 2px 8px 0 rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'midnight-radial': 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(6, 8, 17, 0) 70%)',
        'vault-glow': 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, rgba(11, 15, 30, 0) 65%)',
      }
    },
  },
  plugins: [],
}
