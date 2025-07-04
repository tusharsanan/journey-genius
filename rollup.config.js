/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
import typescript from "@rollup/plugin-typescript";

import summary from "rollup-plugin-summary";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

export default {
  input: "./src/journey-genius.app.ts",
  output: {
    dir: "./dist",
    format: "esm",
    sourcemap: true,
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({ preventAssignment: false, "Reflect.decorate": "undefined" }),
    resolve(),
    typescript(),
    /**
     * This minification setup serves the static site generation.
     * For bundling and minification, check the README.md file.
     */
    terser({
      ecma: 2021,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ],
};
