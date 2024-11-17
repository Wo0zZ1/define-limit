/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				pink: 'var(--pink)',
				'pink-dark': 'var(--pink-dark)',
				purple: 'var(--purple)',
				'purple-dark': 'var(--purple-dark)',
			},
			screens: {
				xs: { min: '424px' },
				pc: { raw: '(hover: hover)' },
			},
		},
		container: {
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
			},
			center: true,
		},
	},
}
