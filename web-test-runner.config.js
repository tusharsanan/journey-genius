/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { legacyPlugin } from "@web/dev-server-legacy";
import { playwrightLauncher } from "@web/test-runner-playwright";

const mode = process.env.MODE || "dev";
if (!["dev", "prod"].includes(mode)) {
  throw new Error(`MODE must be "dev" or "prod", was "${mode}"`);
}

const browsers = {
  chromium: playwrightLauncher({ product: "chromium" }),
  firefox: playwrightLauncher({ product: "firefox" }),
  webkit: playwrightLauncher({ product: "webkit" }),
};

const noBrowser = (b) => {
  throw new Error(`No browser configured named '${b}'; using defaults`);
};
let commandLineBrowsers;
try {
  commandLineBrowsers = process.env.BROWSERS?.split(",").map(
    (b) => browsers[b] ?? noBrowser(b)
  );
} catch (e) {
  console.warn(e);
}

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: ".",
  files: ["./dist/**/*.test.js"],
  nodeResolve: { exportConditions: mode === "dev" ? ["development"] : [] },
  preserveSymlinks: true,
  browsers: commandLineBrowsers ?? Object.values(browsers),
  testFramework: {
    // https://mochajs.org/api/mocha
    config: {
      ui: "bdd",
      timeout: "60000",
    },
  },
  plugins: [
    // Detect browsers without modules (e.g. IE11) and transform to SystemJS
    // (https://modern-web.dev/docs/dev-server/plugins/legacy/).
    legacyPlugin({
      polyfills: {
        webcomponents: true,
        // Inject lit's polyfill-support module into test files, which is required
        // for interfacing with the webcomponents polyfills
        custom: [
          {
            name: "lit-polyfill-support",
            path: "node_modules/lit/polyfill-support.js",
            test: "!('attachShadow' in Element.prototype) || !('getRootNode' in Element.prototype) || window.ShadyDOM && window.ShadyDOM.force",
            module: false,
          },
        ],
      },
    }),
  ],
};
