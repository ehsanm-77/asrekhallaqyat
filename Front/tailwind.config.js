/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        colors: {
          primary: '#d7fffb',
          secondary: '#71DFE7',
        },
        backgroundImage: {
          'login-bg': "url('/assets/img/login/login11.jpg')",
          myproduct: "url('/assets/img/main/blob-scene-haikei.svg')",
        },
      },
    },
    plugins: [],
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  };