const { minifyDictionary } = require("style-dictionary").formatHelpers;

module.exports = {
  format: {
    "javascript/module/minify": ({ dictionary }) => {
      return `module.exports = ${JSON.stringify(
        minifyDictionary(dictionary.tokens)
      )}`;
    },
  },
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "src/tokens/build/css/",
      files: [
        {
          destination: "variables.css",
          format: "css/variables",
        },
      ],
    },
    js: {
      transforms: ["name/cti/camel"],
      transformGroup: "js",
      buildPath: "src/tokens/build/js/",
      files: [
        {
          destination: "module-minify.js",
          format: "javascript/module/minify",
        },
      ],
    },
    ts: {
      transforms: ["name/cti/camel"],
      transformGroup: "js",
      buildPath: "src/tokens/build/js/",
      files: [
        {
          destination: "es6.js",
          format: "javascript/es6",
        },
        {
          destination: "es6.d.ts",
          format: "typescript/es6-declarations",
        },
      ],
    },
  },
};
