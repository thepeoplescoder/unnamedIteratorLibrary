import * as path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@~main": path.resolve(__dirname, "src", "main"),
      "@~util": path.resolve(__dirname, "src", "main", "util"),
      "@~types": path.resolve(__dirname, "src", "main", "util", "types"),
      "@~test": path.resolve(__dirname, "src", "test"),
      "@~arrays": path.resolve(__dirname, "src", "main", "arrays"),
      "@~iterators": path.resolve(__dirname, "src", "main", "iterators"),
    },
  },
});