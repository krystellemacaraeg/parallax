/** @type {import('tailwindcss').Config} */
// Swapping out the harsh green for a softer, more modern dark theme
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        // Main background - deep dark but not pure black, easier on the eyes
        'base':        '#0f1117',
        'surface':     '#1a1d27',
        'surface-2':   '#22263a',
        // Border and divider lines - subtle, not glowing
        'border':      '#2e3248',
        // Primary text - soft white, not blinding
        'text-primary':  '#e8eaf0',
        'text-secondary':'#8b90a7',
        'text-dim':      '#4a4f6a',
        // Accent - a muted blue-white, like a monitor glow
        'accent':      '#7b9cff',
        'accent-dim':  '#3d5299',
        // Status colors
        'status-ok':   '#4ade80',
        'status-warn': '#f59e0b',
        'status-err':  '#f87171',
      },
    },
  },
  plugins: [],
}