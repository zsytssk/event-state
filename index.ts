import { Event } from './event';
import { genUseEventState, genUseEventSelector, BindFn } from './hooks';

export abstract class EventState extends Event {
  protected eventList: string[] = [];
  public useState: (eventList?: string[], bindFn?: BindFn) => [this, number];
  public useSelector: <U extends (state: this) => any>(fn: U, eventList?: string[], bindFn?: BindFn) => ReturnType<U>;
  constructor(eventList: string[]) {
    super();
    this.eventList = eventList;
    this.useState = genUseEventState(this, eventList);
    this.useSelector = genUseEventSelector(this, eventList);
  }
  public bind(fn: () => void, eventList?: string[]) {
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
