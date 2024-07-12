const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require("html-inline-script-webpack-plugin");
const HtmlWebpackInlineSVGPlugin = require("html-webpack-inline-svg-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");

const path = require("path");
const variables = require("./src/variables.js");

module.exports = (env) => {
  const plugins = [
    new HtmlWebpackPlugin({
      title: "My App",
      filename: "index.html",
      template: "./src/index.ejs",
      templateParameters: {
        foo: variables.foo,
      },
    }),
    // new WebpackCdnPlugin({
    //   modules: [
    //     {
    //       name: "some-package",
    //       var: "some-package",
    //       path: "dist/some-package.min.js",
    //     },
    //   ],
    //   publicPath: "/node_modules",
    // }),
    new HtmlWebpackInlineSVGPlugin({
      /**
       * runPreEmit: true so it'll run "before" the html
       * template is parsed by html-webpack-plugin
       */
      runPreEmit: true,
    }),
  ];
  if (env.ENV !== "local") {
    // since it causes reloading issues when doing "serve"
    plugins.push(new HtmlInlineScriptPlugin());
  }

  return {
    target: "web",
    entry: ["./src/index.js"],
    plugins: plugins,
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      compress: true,
      port: 3001,
    },
    resolve: {
      extensions: [".ts", ".js", ".svg"],
      alias: {
        config: path.join(__dirname, "config", env.ENV),
      },
    },
    watchOptions: {
      ignored: ["**/node_modules"],
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.svg$/,
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            emitFile: false,
          },
        },
      ],
    },
  };
};
