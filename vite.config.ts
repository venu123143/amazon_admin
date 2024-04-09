import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react-swc'
import postcssNesting from 'postcss-nested'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// import react from '@vitejs/plugin-react';
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

export default defineConfig({
  plugins: [
    react(),
    ckeditor5({
      theme: '@ckeditor/ckeditor5-theme-lark',
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssNesting(),
        autoprefixer(),
        tailwindcss()
      ]
    }
  }
});