import { useEffect, useRef, useState } from 'react';
import { throttleFn } from './utils';
export function useEventState(state, eventList) {
    const localEventList = eventList || state.eventList;
    const ref = useRef();
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
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref);
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
    return [state, changeIndex];
}
export function useThrottleEventState(state, time = 300, eventList) {
    const localEventList = eventList || state.eventList;
    const ref = useRef();
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
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref);
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
    return [state, changeIndex];
}
export function useEventSelector(state, fn, eventList) {
    const localEventList = eventList || state.eventList;
    const bindFnRef = useRef();
    const fnRef = useRef();
    const subStateRef = useRef(fn(state));
    const [changeIndex, setChangeIndex] = useState(0);
    fnRef.current = fn;
    useEffect(() => {
        const refFn = () => {
            var _a;
            const subState = (_a = fnRef.current) === null || _a === void 0 ? void 0 : _a.call(fnRef, state);
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
            var _a;
            (_a = bindFnRef.current) === null || _a === void 0 ? void 0 : _a.call(bindFnRef);
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
    return [subStateRef.current, changeIndex];
}
export function useThrottleEventSelector(state, fn, time = 300, eventList) {
    const localEventList = eventList || state.eventList;
    const bindFnRef = useRef();
    const fnRef = useRef();
    const subStateRef = useRef(fn(state));
    const [changeIndex, setChangeIndex] = useState(0);
    fnRef.current = fn;
    useEffect(() => {
        const refFn = () => {
            var _a;
            const subState = (_a = fnRef.current) === null || _a === void 0 ? void 0 : _a.call(fnRef, state);
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
            var _a;
            (_a = bindFnRef.current) === null || _a === void 0 ? void 0 : _a.call(bindFnRef);
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
    return [subStateRef.current, changeIndex];
}
