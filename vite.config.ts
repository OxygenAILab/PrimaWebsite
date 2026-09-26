import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        beta: resolve(__dirname, "beta/index.html"),
        about: resolve(__dirname, "about/index.html"),
        "how-it-works": resolve(__dirname, "how-it-works/index.html"),
        scenarios: resolve(__dirname, "scenarios/index.html"),
        roadmap: resolve(__dirname, "roadmap/index.html"),
        pricing: resolve(__dirname, "pricing/index.html"),
        "model-list": resolve(__dirname, "model-list/index.html"),
        faq: resolve(__dirname, "faq/index.html"),
        security: resolve(__dirname, "security/index.html"),
        download: resolve(__dirname, "download/index.html"),
      },
    },
  },
});
