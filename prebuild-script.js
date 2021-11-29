const fse = require("fs-extra");
const { resolve } = require("path");
const paths = require("react-scripts/config/paths");

module.exports = function prebuildScript(isEnvProduction) {
  const outputDir = isEnvProduction
    ? paths.appBuild
    : resolve(__dirname, "dist");

  // Copy static files to dist folder
  if (!isEnvProduction) {
    fse.copySync(paths.appPublic, outputDir);
  }
};
