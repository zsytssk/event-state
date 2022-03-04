import { Event } from './event';
export declare abstract class EventState extends Event {
    eventList: string[];
    constructor(eventList: string[], parent?: EventState);
    destroy(): void;
}
