/** @type {import('tailwindcss').Config} */
export default {
	content: [
	  './src/**/*.{ts,tsx}',
	  './components/**/*.{ts,tsx}',
	],
	theme: {
	  extend: {
		colors: {
		  primary: '#5A3D2B', // Warm Brown (Sapodilla)
		  secondary: '#F5E8C7', // Soft Cream (Custard Apple)
		  accent: '#C68B59', // Muted Peach (Mango)
		  background: '#FAF7F0', // Warm Off-White
		  text: '#2D2D2D', // Dark Gray
		  muted: '#6B7280', // Soft Gray
		},
		fontFamily: {
		  roboto: ['Roboto', 'sans-serif'],
		},
		borderRadius: {
		  DEFAULT: '12px',
		},
		boxShadow: {
		  custom: '0 6px 12px rgba(0, 0, 0, 0.08)',
		  '3xl': '0 12px 24px rgba(0, 0, 0, 0.12)',
		},
		backgroundImage: {
		  'food-texture': "url('/assets/textures/food.png')",
		  'leaf-texture': "url('/assets/textures/leaf.png')",
		},
		animation: {
		  'pulse-slow': 'pulse-slow 6s infinite ease-in-out',
		  'pop-in': 'popIn 0.5s ease-out forwards',
		},
		keyframes: {
		  'pulse-slow': {
			'0%, 100%': { opacity: '0.1' },
			'50%': { opacity: '0.18' },
		  },
		  popIn: {
			'0%': { transform: 'scale(0)', opacity: '0' },
			'80%': { transform: 'scale(1.1)', opacity: '1' },
			'100%': { transform: 'scale(1)' },
		  },
		},
	  },
	},
	plugins: [],
  };