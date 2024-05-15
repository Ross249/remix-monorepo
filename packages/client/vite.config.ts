import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
  resolve: {
    alias: {
      "@monorepo": path.resolve(import.meta.dirname, "../../"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
