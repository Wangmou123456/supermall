export function debounce(func, delay) {
  let timer = null;
  return function(...arg) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arg);
    }, delay);
  };
}
