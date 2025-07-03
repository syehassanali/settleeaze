module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All JS/TS/React files in src/
    "./public/index.html"         // Your main HTML file
  ],
  theme: {
    extend: {
      
      theme: {
        extend: {
          colors: {
            primary: '#1976d2',
            secondary: '#9c27b0',
            accent: '#00c853',
            neutral: {
              light: '#f5f7fa',
              dark: '#263238',
            },
          },
          fontFamily: {
            heading: ['Montserrat', 'sans-serif'],
            body: ['Poppins', 'sans-serif'],
            mono: ['Roboto Mono', 'monospace'],
          },
        },
      },

    },
  },
  plugins: [],
}




