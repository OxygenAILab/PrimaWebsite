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
      },
    },
  },
});
