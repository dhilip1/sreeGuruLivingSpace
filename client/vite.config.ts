import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Export default config
export default defineConfig(async () => {
  return {
    plugins: [
      react(),
      runtimeErrorOverlay(),
      themePlugin(),
      ...(process.env.NODE_ENV !== "production" &&
      process.env.REPL_ID !== undefined
        ? [(await import("@replit/vite-plugin-cartographer")).cartographer()]
        : []),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    root: path.resolve(__dirname, "client"), // Still okay to use absolute for root
    build: {
      outDir: "../dist", // ⚠️ relative to root ("client"), NOT absolute!
      emptyOutDir: true,
    },
  };
});
