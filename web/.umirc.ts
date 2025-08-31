import { defineConfig } from "umi";
import dotenv from "dotenv"


if (process.env.UMI_ENV) {
  dotenv.config({ path: ".env" + "." + process.env.UMI_ENV, override: true })
} else {
  dotenv.config({ path: ".env", override: true })
}

export default defineConfig({
  // base: "/aigc/",
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/", // electron打包必备配置
  title: "gin-react-template",
  history: {
    type: process.env.HISTORY_MODE as ("browser" | "hash") || "browser"
  }, // electron打包必备配置
  define: {
    // "process.env.OS_DEVICE": process.env.OS_DEVICE,
  },
  routes: [
    // { path: "/attachment", component: "./Attachment" },
    // { path: "/business_attachment", component: "./Attachment" },
    // { path: "/login", component: "./Login", layout: false },
    // { path: "/bid_audit", component: "./BidAudit" },
    //  { path: "/company_manage", component: "./BusinessManage" },
    // { path: "/agreement", component: "./Agreement", layout: false },
    // { path: "/viewer", component: "./FileViewer", layout: false },
    {path: "/", component: "./init"},
    {
      path: "",
      routes: [
        {
          path: "/login",
          component: "./app/login"
        }
      ]
    },
    {
      path: "/admin",
      routes: [
        {
          path: "/admin/login",
          component: "./admin/login"
        }
      ]
    },
    {
      path: '/',
      redirect: '/login',
    },

    {
      path: '*',
      layout: false,
      component: './404',
    },
  ],
  npmClient: "yarn",
  outputPath: "build",
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  extraPostCSSPlugins: [
    require("@tailwindcss/postcss")
  ],
  esbuildMinifyIIFE: true

});
