const paths = require("react-scripts/config/paths");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const prebuildScript = require("./prebuild-script");
const postbuildScript = require("./postbuild-script");

const customOverrideDevServer = (configFunction) => {
  return function (proxy, allowedHost) {
    const config = configFunction(proxy, allowedHost);
    config.writeToDisk = true;
    config.inline = false;
    config.hot = false;

    return config;
  };
};

const customOverrideWebpack = (config, env) => {
  const isEnvProduction = env === "production";

  // Adding entries
  config.entry = {
    popup: paths.appSrc + "/popup",
    options: paths.appSrc + "/options",
    serviceworker: paths.appSrc + "/service-worker",
  };

  // Change output filename template to get rid of hash there
  config.output.filename = "static/js/[name].js";
  // Disable built-in SplitChunksPlugin
  config.optimization.splitChunks = {
    cacheGroups: { default: false },
  };
  // Disable runtime chunk addition for each entry point
  config.optimization.runtimeChunk = false;

  // Shared minify options to be used in HtmlWebpackPlugin constructor
  const minifyOpts = {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  };

  // Custom HtmlWebpackPlugin instance for index (popup) page
  const indexHtmlPlugin = new HtmlWebpackPlugin({
    inject: true,
    chunks: ["popup"],
    template: paths.appPublic + "/popup.html",
    filename: "popup.html",
    minify: isEnvProduction && minifyOpts,
  });
  // Replace original HtmlWebpackPlugin instance in config.plugins with the above one
  config.plugins = replacePlugin(
    config.plugins,
    (name) => /HtmlWebpackPlugin/i.test(name),
    indexHtmlPlugin
  );

  // Extra HtmlWebpackPlugin instance for options page
  const optionsHtmlPlugin = new HtmlWebpackPlugin({
    inject: true,
    chunks: ["options"],
    template: paths.appHtml,
    filename: "index.html",
    minify: isEnvProduction && minifyOpts,
  });
  // Add the above HtmlWebpackPlugin instance into config.plugins
  // Note: you may remove/comment the next line if you don't need an options page
  config.plugins.push(optionsHtmlPlugin);

  // Custom ManifestPlugin instance to cast asset-manifest.json back to old plain format
  const manifestPlugin = new ManifestPlugin({
    fileName: "asset-manifest.json",
  });
  // Replace original ManifestPlugin instance in config.plugins with the above one
  config.plugins = replacePlugin(
    config.plugins,
    (name) => /ManifestPlugin/i.test(name),
    manifestPlugin
  );

  // Custom MiniCssExtractPlugin instance to get rid of hash in filename template
  const miniCssExtractPlugin = new MiniCssExtractPlugin({
    filename: "static/css/[name].css",
  });
  // Replace original MiniCssExtractPlugin instance in config.plugins with the above one
  config.plugins = replacePlugin(
    config.plugins,
    (name) => /MiniCssExtractPlugin/i.test(name),
    miniCssExtractPlugin
  );

  // Remove GenerateSW plugin from config.plugins to disable service worker generation
  config.plugins = replacePlugin(config.plugins, (name) =>
    /GenerateSW/i.test(name)
  );

  // Remove HMR plugin from config.plugins to disable the Hot Module
  config.plugins = replacePlugin(config.plugins, (name) =>
    /HotModuleReplacementPlugin/i.test(name)
  );

  // Remove fast refresh plugin
  config.plugins = replacePlugin(config.plugins, (name) =>
    /ReactRefreshPlugin/i.test(name)
  );

  // Add prebuild and postbuild script
  config.plugins.push({
    apply: (compiler) => {
      compiler.hooks.afterEnvironment.tap("PreBuildScript", (compilation) => {
        try {
          prebuildScript(isEnvProduction);
          process.stdout.write("Success running pre-build script\n");
        } catch (error) {
          process.stderr.write(`Error running pre-build script: ${error}\n`);
        }
      });
      compiler.hooks.afterEmit.tap("PostBuildScript", (compilation) => {
        try {
          postbuildScript(isEnvProduction);
          process.stdout.write("Success running post-build script\n");
        } catch (error) {
          process.stderr.write(`Error running post-build script: ${error}\n`);
        }
      });
    },
  });

  return config;
};

module.exports = {
  webpack: customOverrideWebpack,
  devServer: customOverrideDevServer,
};

// Utility function to replace/remove specific plugin in a webpack config
function replacePlugin(plugins, nameMatcher, newPlugin) {
  const i = plugins.findIndex((plugin) => {
    return (
      plugin.constructor &&
      plugin.constructor.name &&
      nameMatcher(plugin.constructor.name)
    );
  });
  return i > -1
    ? plugins
        .slice(0, i)
        .concat(newPlugin || [])
        .concat(plugins.slice(i + 1))
    : plugins;
}
