import { EventState } from './index';
export declare type BindFn = (triggerFn?: () => void) => (() => void) | undefined;
export declare function genUseEventState<T extends EventState>(state: T, oriEventList: string[]): (eventList?: string[] | undefined, bindFn?: BindFn | undefined) => [T, number];
export declare function genUseEventSelector<T extends EventState>(state: T, oriEventList: string[]): <U extends (state: T) => any>(fn: U, eventList?: string[] | undefined, bindFn?: BindFn | undefined) => ReturnType<U>;
