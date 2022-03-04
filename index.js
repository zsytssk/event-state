import { Event } from './event';
export class EventState extends Event {
    constructor(eventList, parent) {
        super(parent);
        this.eventList = [];
        this.eventList = eventList;
    }
    destroy() {
        this.eventList = [];
        super.destroy();
    }
}
