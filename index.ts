import { Event } from './event';

export abstract class EventState extends Event {
  public eventList: string[] = [];
  constructor(eventList: string[], parent?: EventState) {
    super(parent);
    this.eventList = eventList;
  }
  public destroy() {
    this.eventList = [];
    super.destroy();
  }
}
