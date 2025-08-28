import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/chefAnette/", // 👈 repo name, must match exactly (case-sensitive)
});
