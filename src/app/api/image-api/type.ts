export type GetURL = () => Promise<string>;

export interface AbstractImageAPI {
  apiUrl: string;
  parameters: object;
  getUrl: GetURL;
}
