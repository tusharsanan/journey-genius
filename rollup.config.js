/**
 * @license
 * Copyright (c) 2020 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import copy from "rollup-plugin-copy";
import minifyHTML from "rollup-plugin-minify-html-literals";
import resolve from "@rollup/plugin-node-resolve";

import merge from "deepmerge";
import { createSpaConfig } from "@open-wc/building-rollup";

const baseConfig = createSpaConfig({
  injectServiceWorker: true,
});

const copyConfig = {
  targets: [
    { src: "node_modules/@webcomponents", dest: "dist/node_modules" },
    { src: "node_modules/systemjs", dest: "dist/node_modules" },
    { src: "node_modules/lit", dest: "dist/node_modules" },
  ],
};

export default merge(baseConfig, {
  input: "./index.html",
  output: {
    sourcemap: false,
  },
  plugins: [
    copy(copyConfig),
    minifyHTML(),
    resolve({
      customResolveOptions: {
        moduleDirectory: "packages",
      },
    }),
  ],
  preserveEntrySignatures: false,
});
