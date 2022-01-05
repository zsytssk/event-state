import { Event } from './event';
import { genUseEventState, genUseEventSelector } from './hooks';
export class EventState extends Event {
    constructor(eventList, parent) {
        super(parent);
        this.eventList = [];
        this.eventList = eventList;
        this.useState = genUseEventState(this, eventList);
        this.useSelector = genUseEventSelector(this, eventList);
    }
    bind(fn, eventList) {
        const localEvent = eventList || this.eventList;
        for (const event of localEvent) {
            this.on(event, fn);
        }
        return () => {
            for (const event of localEvent) {
                this.off(event, fn);
            }
        };
    }
}
