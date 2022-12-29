/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	plugins: [require('prettier-plugin-tailwindcss')],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1400px',
		},

		container: {
			center: true,
		},
		extend: {},
	},
	plugins: [],
};
