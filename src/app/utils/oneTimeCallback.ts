/**
 * Produce a callback that will only run one time, if given its args did not changed
 */
const oneTimeCallback = <TFunc extends (...args: any[]) => any>(
  func: TFunc
) => {
  let oldDeps = "";
  let oldRes: any = null;

  var callback = (...args: Parameters<TFunc>) => {
    const serializeDeps = JSON.stringify([...args]);
    if (oldDeps === serializeDeps) {
      return oldRes;
    }

    const result = func(...args);
    oldRes = result;
    oldDeps = serializeDeps;

    return result;
  };

  return callback;
};

export default oneTimeCallback;
