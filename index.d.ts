import { Event } from './event';
import { BindFn } from './hooks';
export declare abstract class EventState extends Event {
    protected eventList: string[];
    useState: (eventList?: string[]) => [this, number];
    useSelector: <U extends (state: this) => any>(fn: U, eventList?: string[], bindFn?: BindFn) => ReturnType<U>;
    constructor(eventList: string[]);
}
