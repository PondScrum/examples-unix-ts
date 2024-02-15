import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://pondscrum.github.io',
  base: '/unix-ts',
  integrations: [svelte(), tailwind()]
});