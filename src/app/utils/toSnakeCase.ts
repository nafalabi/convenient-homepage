const toSnakeCase = (text?: string) => {
  if (!text) return;

  return (
    text.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) ?? ([] as string[])
  )
    .map((x) => x.toLowerCase())
    .join("_");
};

export default toSnakeCase;
