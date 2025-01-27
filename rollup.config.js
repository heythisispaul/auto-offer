import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/styles/main.tailwind.css",
    output: [{ file: "dist/index.css", format: "es" }],
    plugins: [
      postcss({
        extract: true,
        minimize: true,
        plugins: [],
      }),
    ],
  },
  {
    input: "src/background.ts",
    output: {
      file: "dist/background.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
  {
    input: "src/content.ts",
    output: {
      file: "dist/content.js",
      format: "iife",
    },
    plugins: [typescript(), resolve(), commonjs()],
  },
  {
    input: "src/popup/popup.tsx",
    output: {
      file: "dist/popup.js",
      format: "iife",
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      copy({
        targets: [
          { src: "src/popup/popup.html", dest: "dist" },
          { src: "./manifest.json", dest: "dist" },
        ],
      }),
    ],
  },
];
