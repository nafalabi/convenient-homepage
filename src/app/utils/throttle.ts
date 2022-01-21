export default function throttle(func: any, timeFrame: number) {
  var lastTime = 0;
  return function (...args: any) {
    var now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
