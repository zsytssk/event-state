export const throttleFn = (fn, time) => {
    let timeout = 0;
    return (...params) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn(...params);
        }, time);
    };
};
