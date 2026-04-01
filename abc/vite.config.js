import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "./src",
  resolve: {
    // REMOVE THIS if you aren't using styled-components:
    // "@mui/styled-engine": "@mui/styled-engine-sc", 
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Keep this for better SSR/MUI compatibility
  ssr: {
    noExternal: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled']
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'gsap',
    ],
  },
});

