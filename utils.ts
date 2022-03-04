export const throttleFn = <T extends (...params: any[]) => any>(fn: T, time: number) => {
  let timeout = null;
  return (...params: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...params);
    }, time);
  };
};
