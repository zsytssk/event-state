import { useEffect, useRef, useState } from 'react';
export function genUseEventState(state, oriEventList) {
    return (eventList) => {
        const localEventList = eventList || oriEventList;
        const ref = useRef();
        const [changeIndex, setChangeIndex] = useState(0);
        const changeIndexRef = useRef(changeIndex);
        useEffect(() => {
            ref.current = () => {
                changeIndexRef.current += 1;
                setChangeIndex(changeIndexRef.current);
            };
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
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [state, localEventList]);
        return [state, changeIndex];
    };
}
export function genUseEventSelector(state, oriEventList) {
    return (fn, eventList) => {
        const ref = useRef();
        const [localState, setLocalState] = useState(fn(state));
        const localEventList = eventList || oriEventList;
        useEffect(() => {
            ref.current = () => {
                setLocalState(fn(state));
            };
            return () => {
                ref.current = undefined;
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
