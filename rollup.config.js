import typescript from "@rollup/plugin-typescript";
import summary from "rollup-plugin-summary";
import terser from "@rollup/plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";

export default {
  input: "./index.html",
  output: {
    sourcemap: false,
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      sourceMap: true,
      inlineSources: true,
      noEmitOnError: true,
    }),
    replace({ preventAssignment: false, "Reflect.decorate": "undefined" }),
    resolve(),
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
