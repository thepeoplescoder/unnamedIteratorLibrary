import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@~main":      path.resolve(__dirname, "src", "main"),
      "@~arrays":    path.resolve(__dirname, "src", "main", "arrays"),
      "@~iterators": path.resolve(__dirname, "src", "main", "iterators"),
      "@~util":      path.resolve(__dirname, "src", "main", "util"),
      "@~types":     path.resolve(__dirname, "src", "main", "util", "types"),
      "@~lib":       path.resolve(__dirname, "src", "lib"),
    },
  },
});