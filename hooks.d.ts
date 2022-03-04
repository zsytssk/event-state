import { EventState } from './index';
export declare function useEventState<T extends EventState>(state: T, eventList?: string[]): [T, number];
export declare function useEventSelector<T extends EventState, U extends (state: T) => any>(
  state: T,
  fn: U,
  eventList: string[],
): [ReturnType<U>];
export declare function useThrottleEventState<T extends EventState>(state: T, eventList?: string[]): [T, number];
export declare function useThrottleEventSelector<T extends EventState, U extends (state: T) => any>(
  state: T,
  fn: U,
  eventList: string[],
): [ReturnType<U>];
