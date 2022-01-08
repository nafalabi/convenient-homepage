class QueryString {
  static parse(qstring: string) {
    const usp = new URLSearchParams(qstring);
    const result = Object.fromEntries(usp.entries());
    return result;
  }

  static stringify(obj: { [key: string]: any }) {
    const usp = new URLSearchParams(obj);
    return usp.toString();
  }
}

export default QueryString;
