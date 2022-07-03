const sleep = async <TCallback extends () => any>(
  time: number,
  callback?: TCallback
) => {
  const callbackResult = await new Promise((resolve) =>
    setTimeout(() => resolve(callback ? callback() : undefined), time)
  );
  return callbackResult as ReturnType<TCallback>;
};

export default sleep;
