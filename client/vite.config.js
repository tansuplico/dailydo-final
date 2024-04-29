import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      allow: [
        "C:/Users/Tristan/Desktop/Dailydo/server",
        "C:/Users/Tristan/Desktop/Dailydo/client",
      ],
    },
  },
  plugins: [
    react(),
    nodePolyfills({
      overrides: {
        fs: "memfs",
      },

      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      "fs/promises": "memfs",
    },
  },
});
