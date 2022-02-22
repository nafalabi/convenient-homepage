const getFaviconFromUrl = (url: string) => {
  return `https://www.google.com/s2/favicons?sz=32&domain=${
    new URL(url).hostname
  }`;
};

export default getFaviconFromUrl;
