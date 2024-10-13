/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				text: '#30324B'
			}
		},
		fontFamily: {
			Muller: ['Muller', 'sans-serif']
		},
		screens: {
			xs: '476px',
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1400px'
		}
	},

	plugins: []
};
