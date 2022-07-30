const readAsBase64 = (url: string): Promise<string> => {
  return new Promise(async (resolve) => {
    const blob = await fetch(url).then((res) => res.blob());
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string ?? "");
    };
    reader.readAsDataURL(blob);
  });
};

export default readAsBase64;
