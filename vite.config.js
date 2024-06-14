
import eslint from 'vite-plugin-eslint';
import autoprefixer from 'autoprefixer';
import { ViteFaviconsPlugin } from 'vite-plugin-favicon';
// import favicon from 'vite-plugin-favicon';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({


    plugins: [
      eslint(), 
      
      // ViteFaviconsPlugin({
      //   logo: './src/assets/logo.png',
      //   favicons: {
      //     appName: 'cs52-starterpack',
      //     appDescription: 'Starterpack!',
      //     developerName: 'Maya Cole',
      //     developerURL: null, 
      //     background: '#ddd',
      //     theme_color: '#333',
      //     icons: {
      //       coast: false,
      //       yandex: false
      //     }
      //   }
      // })     
    ],
    css: {
      postcss: {
        plugins: [
          autoprefixer(), 
          tailwindcss,
        ],
      },
    },
  });