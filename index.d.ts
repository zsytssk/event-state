import { Event } from './event';
export declare abstract class EventState extends Event {
    protected eventList: string[];
    useState: (eventList?: string[]) => [this, number];
    useSelector: <U extends (state: this) => any>(fn: U, eventList?: string[]) => ReturnType<U>;
    constructor(eventList: string[], parent?: EventState);
    bind(fn: () => void, eventList?: string[]): () => void;
}
