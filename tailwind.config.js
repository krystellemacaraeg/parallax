/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      // custom font ad color palette to match terminal aesthetic
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace']
      },
      colors: {
        'terminal-green': '#00ff41',
        'terminal-dim':   '#00882b',
        'station-black':  '#0a0a0a',
      }
    },
  },
  plugins: [],
}

