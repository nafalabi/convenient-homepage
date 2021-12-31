class PopupWindow {
  url: string;
  params: chrome.windows.CreateData;
  _ipoll?: ReturnType<typeof setInterval>;

  constructor({
    url,
    type = "popup",
    height = 500,
    width = 500,
    ...params
  }: chrome.windows.CreateData & { url: string }) {
    this.url = url;
    this.params = Object.assign({ type, height, width }, params);
  }

  async open() {
    const window = await chrome.windows.create({
      url: this.url,
      ...this.params,
    });
    return await this.poll(window.id ?? 0);
  }

  async poll(id: number) {
    return new Promise<{ [k: string]: string } | null>((resolve, reject) => {
      const cancel = () => {
        if (this._ipoll) clearInterval(this._ipoll);
        resolve(null);
      };

      this._ipoll = setInterval(async () => {
        try {
          const window = await chrome.windows.get(id, { populate: true });
          const popup = window.tabs ? window.tabs[0] : undefined;

          if (!popup) {
            cancel();
            return;
          }

          if (popup.url === undefined) return;

          const oriUrl = this.url.replace(/\?.*$/, "");
          const curUrl = popup.url.replace(/\?.*$/, "");

          if (oriUrl === curUrl) return;

          const qs = popup.url?.replace(/^.*\?/, "");
          const usp = new URLSearchParams(qs);
          const result = Object.fromEntries(usp.entries());

          chrome.windows.remove(id);

          resolve(result);
        } catch (error) {
          cancel();
        }
      }, 500);
    });
  }
}

export default PopupWindow;
