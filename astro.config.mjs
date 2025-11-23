import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkLightbox from './src/utils/remarkLightbox.js';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
  markdown: {
    remarkPlugins: [remarkLightbox]
  }
});
