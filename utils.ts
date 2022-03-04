export const throttleFn = <T extends (...params: any[]) => any>(fn: T, time: number) => {
  let timeout: number = 0;
  return (...params: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...params);
    }, time);
  };
};
