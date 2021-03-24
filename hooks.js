import { useEffect, useRef, useState } from 'react';
export function genUseEventState(state, oriEventList) {
    return (eventList, bindFn) => {
        const localEventList = eventList || oriEventList;
        const ref = useRef();
        const bindOff = useRef();
        const [changeIndex, setChangeIndex] = useState(0);
        const changeIndexRef = useRef(changeIndex);
        useEffect(() => {
            ref.current = () => {
                var _a;
                changeIndexRef.current += 1;
                setChangeIndex(changeIndexRef.current);
                (_a = bindOff.current) === null || _a === void 0 ? void 0 : _a.call(bindOff);
                bindOff.current = bindFn === null || bindFn === void 0 ? void 0 : bindFn(() => {
                    changeIndexRef.current += 1;
                    setChangeIndex(changeIndexRef.current);
                });
            };
            return () => {
                var _a;
                ref.current = undefined;
                (_a = bindOff.current) === null || _a === void 0 ? void 0 : _a.call(bindOff);
                bindOff.current = undefined;
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [state, localEventList]);
        return [state, changeIndex];
    };
}
export function genUseEventSelector(state, oriEventList) {
    return (fn, eventList, bindFn) => {
        const ref = useRef();
        const bindOff = useRef();
        const [localState, setLocalState] = useState(fn(state));
        const localEventList = eventList || oriEventList;
        useEffect(() => {
            ref.current = () => {
                var _a;
                setLocalState(fn(state));
                (_a = bindOff.current) === null || _a === void 0 ? void 0 : _a.call(bindOff);
                bindOff.current = bindFn === null || bindFn === void 0 ? void 0 : bindFn(() => {
                    setLocalState(fn(state));
                });
            };
            return () => {
                var _a;
                ref.current = undefined;
                (_a = bindOff.current) === null || _a === void 0 ? void 0 : _a.call(bindOff);
                bindOff.current = undefined;
            };
        }, [fn]);
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [state, localEventList]);
        return localState;
    };
}
