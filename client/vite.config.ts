import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";  // 👈 Add this!

export default defineConfig({
  plugins: [react()],
  root: ".", // 👈 Make sure root is current folder
  build: {
    rollupOptions: {
      input: resolve(__dirname, "index.html"),  // 👈 Tell Vite exactly where index.html is
    },
    outDir: "dist",
    emptyOutDir: true,
  },
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
      "@": "/src",
    },
  },
});
