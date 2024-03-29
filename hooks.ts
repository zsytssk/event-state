import { useEffect, useRef, useState } from 'react';

import { EventState } from './index';
import { throttleFn } from './utils';

export function useEventState<T extends EventState>(
    state: T,
    eventList?: string[],
) {
    const localEventList = eventList || state.eventList;
    const ref = useRef<() => void>();
    const [changeIndex, setChangeIndex] = useState(0);

    useEffect(() => {
        const refFn = () => {
            setChangeIndex((i) => {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };

        ref.current = refFn;
        return () => {
            ref.current = undefined;
        };
    }, []);

    useEffect(() => {
        const fn = () => {
            ref.current?.();
        };
        for (const event of localEventList) {
            state.on(event, fn);
        }
        return () => {
            for (const event of localEventList) {
                state.off(event, fn);
            }
        };
    }, [state, localEventList]);

    return [state, changeIndex] as [T, number];
}
export function useThrottleEventState<T extends EventState>(
    state: T,
    time = 300,
    eventList?: string[],
) {
    const localEventList = eventList || state.eventList;
    const ref = useRef<() => void>();
    const [changeIndex, setChangeIndex] = useState(0);

    useEffect(() => {
        const refFn = () => {
            setChangeIndex((i) => {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };

        ref.current = throttleFn(refFn, time);
        return () => {
            ref.current = undefined;
        };
    }, []);

    useEffect(() => {
        const fn = () => {
            ref.current?.();
        };
        for (const event of localEventList) {
            state.on(event, fn);
        }
        return () => {
            for (const event of localEventList) {
                state.off(event, fn);
            }
        };
    }, [state, localEventList]);

    return [state, changeIndex] as [T, number];
}

export function useEventSelector<
    T extends EventState,
    U extends (state: T) => any,
>(state: T, fn: U, eventList?: string[]) {
    const localEventList = eventList || state.eventList;
    const bindFnRef = useRef<() => void>();
    const fnRef = useRef<U>();
    const subStateRef = useRef<ReturnType<U>>(fn(state));
    const [changeIndex, setChangeIndex] = useState(0);

    fnRef.current = fn;

    useEffect(() => {
        const refFn = () => {
            const subState = fnRef.current?.(state);
            subStateRef.current = subState;
            setChangeIndex((i) => {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };

        bindFnRef.current = refFn;
        return () => {
            bindFnRef.current = undefined;
        };
    }, [state]);

    useEffect(() => {
        const fn = () => {
            bindFnRef.current?.();
        };
        for (const event of localEventList) {
            state.on(event, fn);
        }
        return () => {
            for (const event of localEventList) {
                state.off(event, fn);
            }
        };
    }, [state, localEventList]);

    return [subStateRef.current, changeIndex] as [ReturnType<U>, number];
}

export function useThrottleEventSelector<
    T extends EventState,
    U extends (state: T) => any,
>(state: T, fn: U, time = 300, eventList?: string[]) {
    const localEventList = eventList || state.eventList;
    const bindFnRef = useRef<() => void>();
    const fnRef = useRef<U>();
    const subStateRef = useRef<ReturnType<U>>(fn(state));
    const [changeIndex, setChangeIndex] = useState(0);

    fnRef.current = fn;
    useEffect(() => {
        const refFn = () => {
            const subState = fnRef.current?.(state);
            subStateRef.current = subState;
            setChangeIndex((i) => {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };

        bindFnRef.current = throttleFn(refFn, time);
        return () => {
            bindFnRef.current = undefined;
        };
    }, [state, time]);

    useEffect(() => {
        const fn = () => {
            bindFnRef.current?.();
        };
        for (const event of localEventList) {
            state.on(event, fn);
        }
        return () => {
            for (const event of localEventList) {
                state.off(event, fn);
            }
        };
    }, [state, localEventList]);

    return [subStateRef.current, changeIndex] as [ReturnType<U>, number];
}
