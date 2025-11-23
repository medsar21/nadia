/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxe: {
          charcoal: '#464B51',      // Charcoal - textes secondaires, labels
          beige: '#CFBFA6',         // Beige sable - fonds sections
          black: '#000000',         // Noir - titres principaux, textes importants
          taupe: '#A58E6E',         // Taupe - accent, dégradés
          cream: '#F3EBDB',         // Crème/écru - fond principal
          white: '#FFFFFF',         // Blanc - uniquement pour petits éléments (badges)
        },
        // Alias pour compatibilité
        brand: {
          charcoal: '#464B51',
          beige: '#CFBFA6',
          black: '#000000',
          taupe: '#A58E6E',
          cream: '#F3EBDB',
          white: '#FFFFFF',
        },
        surface: {
          main: '#F3EBDB',
          section: '#CFBFA6',
          dark: '#464B51',
        },
        text: {
          main: '#000000',
          muted: '#464B51',
          light: '#F3EBDB',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #000000 0%, #464B51 20%, #A58E6E 45%, #CFBFA6 70%, #F3EBDB 100%)',
        'section-gradient': 'linear-gradient(145deg, #F3EBDB 0%, #CFBFA6 25%, #A58E6E 40%, #464B51 55%, #CFBFA6 75%, #F3EBDB 100%)',
        'button-cta': 'linear-gradient(135deg, #000000 0%, #464B51 25%, #A58E6E 50%, #464B51 75%, #000000 100%)',
        'card-luxe': 'linear-gradient(145deg, #F3EBDB 0%, #FFFFFF 15%, #CFBFA6 40%, #A58E6E 60%, #CFBFA6 85%, #F3EBDB 100%)',
      },
    },
  },
  plugins: [],
}

