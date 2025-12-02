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
          cream: '#F5F5F0',         // HUESO - Beige très clair (os) - fond principal
          black: '#2A2A2A',         // ONIX - Noir profond - titres principaux
          grey: '#998269',          // ONIX - Beige brun moyen - textes secondaires
          charcoal: '#637885',      // MOCCA - Gris brun foncé - fonds sombres
          beigeLight: '#E8E0D6',    // ARENA - Beige sable clair - accents
          beigeMedium: '#C4B5A0',   // Beige moyen - accents
          beigeDark: '#998269',     // ONIX - Beige foncé - accent principal
          roseGold: '#998269',      // Beige brun (remplace roseGold) - accent principal
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
        'hero-gradient': 'linear-gradient(135deg, #E8E0D6 0%, #C4B5A0 25%, #998269 50%, #C4B5A0 75%, #F5F5F0 100%)',
        'section-gradient': 'linear-gradient(145deg, #F5F5F0 0%, #E8E0D6 20%, #C4B5A0 40%, #E8E0D6 60%, #F5F5F0 80%, #E8E0D6 100%)',
        'button-cta': 'linear-gradient(135deg, #998269 0%, #998269 50%, #998269 100%)',
        'card-luxe': 'linear-gradient(145deg, #FFFFFF 0%, #F5F5F0 45%, #FFFFFF 100%)',
      },
    },
  },
  plugins: [],
}

