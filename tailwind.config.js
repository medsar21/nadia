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
          cream: '#F4F4F2',         // Crème très clair - fond principal
          black: '#151313',         // Noir profond - titres principaux
          grey: '#838078',          // Gris moyen neutre - textes secondaires
          charcoal: '#302D2C',      // Charbon foncé - fonds sombres
          rose: '#D1A6A0',          // Rose poussiéreux - accents
          brown: '#95655E',         // Brun rougeâtre - accents
          roseGold: '#E8B4A8',      // Rose gold - accent principal
          white: '#FFFFFF',         // Blanc - petits éléments (badges)
        },
        // Alias pour compatibilité
        brand: {
          cream: '#F4F4F2',
          black: '#151313',
          grey: '#838078',
          charcoal: '#302D2C',
          rose: '#D1A6A0',
          brown: '#95655E',
          roseGold: '#E8B4A8',
          white: '#FFFFFF',
        },
        surface: {
          main: '#F4F4F2',
          section: '#D1A6A0',
          dark: '#302D2C',
        },
        text: {
          main: '#151313',
          muted: '#838078',
          light: '#F4F4F2',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #151313 0%, #302D2C 20%, #95655E 40%, #E8B4A8 60%, #D1A6A0 80%, #F4F4F2 100%)',
        'section-gradient': 'linear-gradient(145deg, #F4F4F2 0%, #D1A6A0 25%, #E8B4A8 40%, #838078 50%, #D1A6A0 75%, #F4F4F2 100%)',
        'button-cta': 'linear-gradient(135deg, #151313 0%, #302D2C 25%, #95655E 40%, #E8B4A8 60%, #302D2C 80%, #151313 100%)',
        'card-luxe': 'linear-gradient(145deg, #F4F4F2 0%, #FFFFFF 15%, #E8B4A8 35%, #D1A6A0 55%, #E8B4A8 75%, #F4F4F2 100%)',
      },
    },
  },
  plugins: [],
}

