const {
  override,
  overrideDevServer,
  addWebpackPlugin,
} = require("customize-cra");
const CopyPlugin = require("copy-webpack-plugin");

// Extension entries / pages
const multipleEntry = require("react-app-rewire-multiple-entry")([
  {
    // points to the popup entry point
    name: "popup",
    entry: "src/popup/index.js",
    template: "public/popup.html",
    outPath: "/popup.html",
  },
  {
    // points to the options page entry point
    entry: "src/index.js",
    template: "public/index.html",
    outPath: "/index.html",
  },
  {
    // points to the options page entry point
    entry: "src/background/index.js",
    template: "public/background.html",
    outPath: "/background.html",
  },
]);

// Custom function to override webpack dev server config
const customOverrideDevServer = (config) => {
  return {
    ...config,
    // webpackDevService doesn't write the files to desk
    // so we need to tell it to do so so we can load the
    // extension with chrome
    writeToDisk: true,
    inline: false,
    hot: false,
    liveReload: false,
  };
};

// Custom function to override webpack config
const customOverrideWebpack = (config) => {
  // Copy all assets to output folder
  config = addWebpackPlugin(
    new CopyPlugin({
      patterns: [{ from: "public", to: "" }],
    })
  )(config);

  // Adding multiple entries
  config = multipleEntry.addMultiEntry(config);

  // set output file names to be the same regardless of the NODE_ENV
  config.output.filename = "static/js/[name].js";
  config.output.chunkFilename = "static/js/[name].chunk.js";

  return config;
};

module.exports = {
  webpack: override(customOverrideWebpack),
  devServer: overrideDevServer(customOverrideDevServer),
};
