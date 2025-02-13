import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import copy from "rollup-plugin-copy";
import postcss from "rollup-plugin-postcss";

export default [
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
    input: "src/components/popup.tsx",
    output: {
      file: "dist/popup.js",
      format: "iife",
    },
    plugins: [
      typescript(),
      resolve(),
      commonjs(),
      postcss({
        extract: true,
        config: {
          path: './postcss.config.js',
        },
      }),
      copy({
        targets: [
          { src: "src/html/popup.html", dest: "dist" },
          { src: "./manifest.json", dest: "dist" },
        ],
      }),
    ],
  },
];
