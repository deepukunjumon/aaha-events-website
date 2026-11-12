import { cloudflare } from "@cloudflare/vite-plugin";
import base44 from "@base44/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [base44(), cloudflare({ viteEnvironment: { name: "ssr" } }), tanstackStart(), react()],
});
