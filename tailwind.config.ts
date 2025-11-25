
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        bronze: {
          50: '#fef7e6',
          100: '#fce5b3',
          200: '#f9d380',
          300: '#f5c14d',
          400: '#e5c5a1',
          500: '#b87333',
          600: '#a56625',
          700: '#8b5a1e',
          800: '#704a19',
          900: '#4a3111',
        },
        platinum: {
          light: '#E8E8EA',
          DEFAULT: '#9F9EA1',
          dark: '#6F6E73'
        },
        college: {
          purple: '#8B5CF6',
          pink: '#D946EF',
          dark: '#1A1F2C'
        },
        binaural: {
          blue: '#3B82F6',
          purple: '#8B5CF6',
          cyan: '#06B6D4',
          teal: '#14B8A6',
          indigo: '#6366F1'
        }
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'platinum-glow': {
          '0%': {
            boxShadow: '0 0 5px rgba(159, 158, 161, 0.5), 0 0 10px rgba(159, 158, 161, 0.3)'
          },
          '50%': {
            boxShadow: '0 0 10px rgba(159, 158, 161, 0.8), 0 0 20px rgba(159, 158, 161, 0.5), 0 0 30px rgba(159, 158, 161, 0.3)'
          },
          '100%': {
            boxShadow: '0 0 5px rgba(159, 158, 161, 0.5), 0 0 10px rgba(159, 158, 161, 0.3)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-10px)'
          }
        },
        'ping': {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: '0'
          }
        },
        'wave': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '50%': {
            transform: 'translateX(0)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'ripple': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '1'
          },
          '100%': {
            transform: 'scale(2.4)',
            opacity: '0'
          }
        },
        'pulse-ring': {
          '0%': {
            transform: 'scale(0.33)'
          },
          '80%, 100%': {
            opacity: '0'
          }
        },
        'pulse-dot': {
          '0%': {
            transform: 'scale(0.8)'
          },
          '50%': {
            transform: 'scale(1)'
          },
          '100%': {
            transform: 'scale(0.8)'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'platinum-pulse': 'platinum-glow 2s infinite ease-in-out',
        'float': 'float 6s infinite ease-in-out',
        'ping': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'wave': 'wave 5s infinite ease-in-out',
        'ripple': 'ripple 1.5s linear infinite',
        'pulse-ring': 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'pulse-dot': 'pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite',
        'gradient-x': 'gradient-x 3s ease infinite'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
