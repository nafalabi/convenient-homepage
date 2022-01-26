import setOrGet from "./abstract";

export interface INoteSettings {
  integrateGithubGist: boolean;
  githubAccessToken: string;
  editable: boolean;
}

export const noteSettingsDefault: INoteSettings = {
  integrateGithubGist: false,
  githubAccessToken: "",
  editable: true,
};

const STORAGE_KEY = "noteSettings";

/**
 * Set or get\
 * if val is defined it will be set function\
 * if val is not defined it will be get function
 */
const noteSettings = (val?: INoteSettings) => {
  return setOrGet(STORAGE_KEY, noteSettingsDefault, val);
};

export default noteSettings;
