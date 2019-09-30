const path = require("path");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const resolve = dir => {
  return path.join(__dirname, dir);
};

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const isPro = process.env.NODE_ENV === "production";
const BASE_URL = isPro ? "support-static/" : "./";
console.log("isPro="+isPro)
module.exports = {
  publicPath: BASE_URL,
  // baseUrl: BASE_URL,
  assetsDir: "static",
  // assetsDir:isPro?'support-static': './',
  productionSourceMap: false, // 打包时不生成.map文件
  configureWebpack: {
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 20000, // 依赖包超过20k将被单独打包
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name (module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
              return `npm.${packageName.replace("@", "")}`;
            }
          }
        }
      },
      minimizer: [
        // new UglifyJsPlugin({
        //   uglifyOptions: {
        //     compress: {
        //       warnings: false,
        //       drop_console: isPro ? true : false,
        //       drop_debugger: false,
        //       pure_funcs: ["console.log"]//移除console
        //     }
        //   }
        // })
      ]
    }
  },
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    proxy: {
      "/api": {
        target: "localhost",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/"
        }
      }
    },
    disableHostCheck: true
  }
};
