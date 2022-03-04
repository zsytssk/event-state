import { EventState } from './index';
export declare function useEventState<T extends EventState>(state: T, eventList?: string[]): [T, number];
export declare function useThrottleEventState<T extends EventState>(state: T, time?: number, eventList?: string[]): [T, number];
export declare function useEventSelector<T extends EventState, U extends (state: T) => any>(state: T, fn: U, eventList?: string[]): (number | ReturnType<U>)[];
export declare function useThrottleEventSelector<T extends EventState, U extends (state: T) => any>(state: T, fn: U, time?: number, eventList?: string[]): (number | ReturnType<U>)[];
