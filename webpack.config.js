const path = require("path");
const fs = require("fs").promises;
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const marked = require("marked");
const ejs = require("ejs");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const siteConfig = require("./siteConfig");

const renderer = {
  image: function (href, title, text) {
    var urlParts = href.split('/');
    href = urlParts.length > 1 ? '/' + urlParts[urlParts.length - 1] : href;
    var out = '<img class="testar_lite" src="' + href + '" alt="' + text + '"';
    if (title) {
      out += ' title="' + title + '"';
    }
    out += this.options.xhtml ? '/>' : '>';
    return out;
  }
}
marked.use({ renderer });

module.exports = async (env) => {
  const devMode = env !== "production";

  const htmlWebpackPlugins = await Promise.all(siteConfig.pages.map(async (page) => {
    let content;
    if (page.template === "ejs") {
      const data = (await fs.readFile(`${__dirname}/src/render/${path.basename(page.url, '.html') || 'index'}.ejs`))
        .toString("utf-8");
      content = ejs.compile(data);
    } else {
      const md = (await fs.readFile(`${__dirname}/src/render/${path.basename(page.url, '.html') || 'index'}.md`))
        .toString("utf-8");
      content = marked(md);
    }
    return new HtmlWebpackPlugin({
      ...page,
      template: `src/layouts/${page.layout || "default.ejs"}`,
      title: page.title,
      content
    })
  }));

  return {
    mode: devMode ? "development" : "production",
    devtool: "source-map",
    entry: {
      main: [
        "./src/render/scripts/script.js",
      ],
    },
    resolve: {
      extensions: [ ".js" ],
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.join(__dirname, "./out"),
      publicPath: "/"
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: [
            "babel-loader",
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(scss)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              // Interprets `@import` and `url()` like `import/require()` and will resolve them
              loader: "css-loader",
            },
            {
              // Loader for webpack to process CSS with PostCSS
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "postcss-preset-env",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
            {
              loader: "sass-loader",
            },
          ],
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "src/files",
            to: ".",
          },{
            from: "src/render/**.jpg",
            to: "."
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: devMode ? "[name].css" : "[name].[contenthash].css",
        chunkFilename: devMode ? "[id].css" : "[id].[contenthash].css",
      }),
      ...htmlWebpackPlugins
    ],
  };
};
