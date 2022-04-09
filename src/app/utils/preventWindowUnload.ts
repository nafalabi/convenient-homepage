const beforeUnloadListener = (event: BeforeUnloadEvent) => {
  event.preventDefault();
  return (event.returnValue = "Are you sure you want to exit?");
};

export const setPreventWindowUnload = () => {
  window.addEventListener("beforeunload", beforeUnloadListener, {
    capture: true,
  });
};

export const unsetPreventWindowUnload = () => {
  window.removeEventListener("beforeunload", beforeUnloadListener, {
    capture: true,
  });
};
