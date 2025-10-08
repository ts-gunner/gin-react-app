import dotenv from "dotenv";
import { defineConfig } from "umi";

if (process.env.UMI_ENV) {
  dotenv.config({ path: ".env" + "." + process.env.UMI_ENV, override: true });
} else {
  dotenv.config({ path: ".env", override: true });
}

export default defineConfig({
  // base: "/aigc/",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // electron打包必备配置
  title: "gin-react-template",
  history: {
    type: (process.env.HISTORY_MODE as "browser" | "hash") || "browser",
  }, // electron打包必备配置
  proxy: {
    "/steins/go": {
      target: "http://127.0.0.1:18888",
    },
  },
  define: {
    // "process.env.API_PREFIX": process.env.API_PREFIX,
  },
  routes: [
    { path: "/init", component: "./init" },
    {
      path: "/login",
      component: "./login",
    },

    {
      path: "/",
      redirect: "/login",
    },

    {
      path: "*",
      layout: false,
      component: "./404",
    },
  ],
  npmClient: "yarn",
  outputPath: "build",
  codeSplitting: {
    jsStrategy: "granularChunks",
  },
  extraPostCSSPlugins: [require("@tailwindcss/postcss")],
  esbuildMinifyIIFE: true,
});
