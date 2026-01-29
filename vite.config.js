import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // default Vite port
  },
  build: {
    outDir: "dist",
  },
  optimizeDeps: {
    include: ["axios", "react", "react-dom", "react-router-dom"],
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
