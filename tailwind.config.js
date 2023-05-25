/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: 'var(--primary-bg)',
        secondColor: 'var(--second-bg)',
        accentColor: '#9479D8',
      },
      backgroundImage: {
        primaryColor: 'radial-gradient(100% 100% at 0% 0%, #3D4046 0%, #202227 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, #FFFFFF;'
      },
    },
  },
  plugins: [],
}
