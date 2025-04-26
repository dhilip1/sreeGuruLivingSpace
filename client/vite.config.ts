import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  root: "./client",  // 👈 Very Important
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "https://sreegurulivingspace.onrender.com",
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),  // 👈 Fix alias for @
    },
  },
});
