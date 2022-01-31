const fse = require("fs-extra");
const { resolve } = require("path");
const paths = require("react-scripts/config/paths");

module.exports = function postbuildScript(isEnvProduction) {
  const outputDir = isEnvProduction
    ? paths.appBuild
    : resolve(__dirname, "dist");

  // Update manifest file (fill creds info)
  const manifestPath = resolve(outputDir, "manifest.json");
  const manifest = require(manifestPath);
  manifest.oauth2.client_id = process.env.GOOGLEAPI_OAUTH2_CLIENTID;
  manifest.key = isEnvProduction
    ? process.env.CHROME_EXTENSION_PUBLIC_KEY
    : undefined;
  const suffix = isEnvProduction ? "" : " (DEV)";
  manifest.name += suffix;
  fse.writeFileSync(manifestPath, JSON.stringify(manifest));
};
