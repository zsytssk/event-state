import { EventState } from './index';
export declare function genUseEventState<T extends EventState>(state: T, oriEventList: string[]): (eventList?: string[] | undefined) => [T, number];
export declare type BindFn = (triggerFn: () => void) => () => void;
export declare function genUseEventSelector<T extends EventState>(state: T, oriEventList: string[]): <U extends (state: T) => any>(fn: U, eventList?: string[] | undefined, bindFn?: BindFn | undefined) => ReturnType<U>;
