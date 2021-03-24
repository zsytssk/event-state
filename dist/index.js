import { Event } from './event';
import { genUseEventState, genUseEventSelector } from './hooks';
export class EventState extends Event {
    constructor(eventList) {
        super();
        this.eventList = [];
        this.eventList = eventList;
        this.useState = genUseEventState(this, eventList);
        this.useSelector = genUseEventSelector(this, eventList);
    }
}
