// @ts-check
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  site: "https://vicente-priego-aviles.github.io",
  trailingSlash: "always",
  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  // Fuentes descargadas al compilar y servidas desde el propio dominio (sin peticiones a terceros).
  fonts: [
    {
      name: "IBM Plex Sans",
      cssVariable: "--fuente-texto",
      provider: fontProviders.fontsource(),
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      name: "IBM Plex Mono",
      cssVariable: "--fuente-mono",
      provider: fontProviders.fontsource(),
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "monospace"],
    },
  ],
});
