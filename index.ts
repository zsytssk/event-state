import { Event } from './event';
import { genUseEventState, genUseEventSelector } from './hooks';

export abstract class EventState extends Event {
  protected eventList: string[] = [];
  public useState?: (eventList?: string[]) => [this, number];
  public useSelector?: <U extends (state: this) => any>(fn: U, eventList?: string[]) => ReturnType<U>;
  constructor(eventList: string[], parent?: EventState) {
    super(parent);
    this.eventList = eventList;
    this.useState = genUseEventState(this, eventList);
    this.useSelector = genUseEventSelector(this, eventList);
  }
  public destroy() {
    this.eventList = [];
    this.useState = undefined;
    this.useSelector = undefined;
    super.destroy();
  }
}
