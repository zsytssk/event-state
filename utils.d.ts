export declare const throttleFn: <T extends (...params: any[]) => any>(fn: T, time: number) => (...params: Parameters<T>) => void;
