import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.PORTFOLIO_BASE_PATH || "/",
  build: {
    // Preserve the browser baseline used by Vite 6 when upgrading the build engine.
    target: ["chrome87", "edge88", "firefox78", "safari14"],
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
