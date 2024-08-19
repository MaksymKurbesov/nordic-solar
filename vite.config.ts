import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({}), tsconfigPaths()],
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "src/styles/variables.scss";` },
    },
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(new URL("./src/assets", import.meta.url)),
      },
      {
        find: "@SharedUI",
        replacement: fileURLToPath(new URL("./src/SharedUI", import.meta.url)),
      },
    ],
  },
});
