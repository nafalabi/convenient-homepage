const {
  override,
  overrideDevServer,
  addWebpackPlugin,
} = require("customize-cra");
const CopyPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const _ = require("./node_modules/lodash");

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

// To enable the reloading extension
const generateExtensionReloaderConfig = (config) => {
  const clonedConfig = _.cloneDeep(config);
  clonedConfig.output.filename = "";
  const { entry } = multipleEntry.addMultiEntry(clonedConfig);
  delete entry.main;
  let background = "";
  Object.entries(entry).forEach(([key, val]) => {
    if (val.includes("src/background")) {
      background = key;
      delete entry[key];
    }
  });
  const extensionPage = Object.keys(entry);

  return addWebpackPlugin(
    new ExtensionReloader({
      port: 9090, // Which port use to create the server
      reloadPage: true, // Force the reload of the page also
      entries: {
        // The entries used for the content/background scripts or extension pages
        // contentScript: "content-script",
        background: background,
        extensionPage: extensionPage,
      },
    })
  )(config);
};

// To modify the manifest.json file on compile time
const extensionManifestPlugin = (config) => {
  const clonedConfig = _.cloneDeep(config);
  clonedConfig.output.filename = "";
  const { entry } = multipleEntry.addMultiEntry(clonedConfig);
  // Getting background script entry name
  let backgroundScript = [];
  Object.entries(entry).forEach(([key, value]) => {
    if (typeof value[0] == "string")
      if (value[0].includes("src/background")) {
        backgroundScript = `static/js/${key}.chunk.js`;
      }
  });

  return addWebpackPlugin(
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
};

module.exports = {
  webpack: override(
    addWebpackPlugin(copyPlugin),
    multipleEntry.addMultiEntry,
    generateExtensionReloaderConfig,
    extensionManifestPlugin
  ),
  devServer: overrideDevServer(devServerConfig()),
};
