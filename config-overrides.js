const {
  override,
  overrideDevServer,
  addWebpackPlugin,
} = require("customize-cra");
const CopyPlugin = require("copy-webpack-plugin");
// const ExtensionReloader = require("webpack-extension-reloader");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

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
    // template: "public/index.html",
    // outPath: "/index.html",
  },
]);

const devServerConfig = () => (config) => {
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

const copyPlugin = new CopyPlugin({
  patterns: [
    // copy assets
    { from: "public", to: "" },
  ],
});

const customeOverrideFuction = (config) => {
  // Adding multiple entries
  config = multipleEntry.addMultiEntry(config);

  // Obtain background script
  let backgroundScript = [];
  let background = "";
  find_loop: for (const key in config.entry) {
    const val = config.entry[key];
    if (typeof val === "string")
      if (val.includes("src/background")) {
        backgroundScript = `static/js/${key}.chunk.js`;
        background = key;
        break;
      }
    if (typeof val === "object") {
      for (const i in val) {
        if (val[i].includes("src/background")) {
          backgroundScript = `static/js/${key}.chunk.js`;
          background = key;
          break find_loop;
        }
      }
    }
  }

  // Plugin to update manifest
  config = addWebpackPlugin(
    new WebpackExtensionManifestPlugin({
      config: {
        base: require("./public/manifest.json"),
        extend: {
          background: {
            scripts: [backgroundScript],
            persistent: true,
          },
        },
      },
    })
  )(config);

  // Disabled for now
  // // Extension Reloader
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  //   let extensionPage = Object.keys(config.entry);
  //   extensionPage = extensionPage.filter(
  //     (value) => !(value === "main" || value === background)
  //   );
  //   config = addWebpackPlugin(
  //     new ExtensionReloader({
  //       // port: 9090, // Which port use to create the server
  //       // reloadPage: true, // Force the reload of the page also
  //       entries: {
  //         // The entries used for the content/background scripts or extension pages
  //         // contentScript: "content-script",
  //         background: background,
  //         extensionPage: extensionPage,
  //       },
  //     })
  //   )(config);
  // }

  // set output file names to be the same regardless of the NODE_ENV
  config.output.filename = "static/js/[name].js";
  config.output.chunkFilename = "static/js/[name].chunk.js";

  return config;
};

module.exports = {
  webpack: override(addWebpackPlugin(copyPlugin), customeOverrideFuction),
  devServer: overrideDevServer(devServerConfig()),
};
