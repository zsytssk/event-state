import { useEffect, useRef, useState } from 'react';

import { EventState } from './index';

export type BindFn = (triggerFn?: () => void) => (() => void) | undefined;
export function genUseEventState<T extends EventState>(state: T, oriEventList: string[]) {
  return (eventList?: string[], bindFn?: BindFn) => {
    const localEventList = eventList || oriEventList;
    const ref = useRef<() => void>();
    const bindOff = useRef<() => void>();
    const [changeIndex, setChangeIndex] = useState(0);
    const changeIndexRef = useRef(changeIndex);

    useEffect(() => {
      ref.current = () => {
        changeIndexRef.current += 1;
        setChangeIndex(changeIndexRef.current);

        bindOff.current?.();
        bindOff.current = bindFn?.(() => {
          changeIndexRef.current += 1;
          setChangeIndex(changeIndexRef.current);
        });
      };

      return () => {
        ref.current = undefined;
        bindOff.current?.();
        bindOff.current = undefined;
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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, localEventList]);

    return [state, changeIndex] as [T, number];
  };
}

export function genUseEventSelector<T extends EventState>(state: T, oriEventList: string[]) {
  return <U extends (state: T) => any>(fn: U, eventList?: string[], bindFn?: BindFn) => {
    const ref = useRef<() => void>();
    const bindOff = useRef<() => void>();
    const [localState, setLocalState] = useState<ReturnType<U>>(fn(state));
    const localEventList = eventList || oriEventList;

    useEffect(() => {
      ref.current = () => {
        setLocalState(fn(state));

        bindOff.current?.();
        bindOff.current = bindFn?.(() => {
          setLocalState(fn(state));
        });
      };
      return () => {
        ref.current = undefined;
        bindOff.current?.();
        bindOff.current = undefined;
      };
    }, [fn]);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state, localEventList]);

    return localState;
  };
}
