/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly CHROME_EXTENSION_PUBLIC_KEY: string;
    readonly GOOGLEAPI_OAUTH2_CLIENTID: string;

    // GITHUB CREDS
    readonly REACT_APP_GITHUB_OAUTH_CLIENT_ID: string;
    readonly REACT_APP_GITHUB_OAUTH_CLIENT_SECRET: string;

    // IMAGE PROVIDER CREDS
    readonly REACT_APP_UNSPLASH_CLIENT_ID: string;
    readonly REACT_APP_PIXABAY_API_KEY: string;
  }
}
