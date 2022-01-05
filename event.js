/**
 * 事件订阅发布构造函数
 */
export class Event {
    constructor(parent) {
        this.parent = parent;
        this.events = new Map();
    }
    /**
     * 注册监听
     * @param event
     * @param callback
     * @param caller
     */
    on(event, callback, caller, once) {
        let events;
        if (this.events.has(event)) {
            events = this.events.get(event);
        }
        else {
            events = new Set();
            this.events.set(event, events);
        }
        for (const temp of events) {
            if (caller === temp.caller && callback === temp.callback) {
                return;
            }
        }
        const off = () => {
            this.off(event, callback, caller);
        };
        events.add({ caller, callback, once, off });
    }
    once(event, callback, caller) {
        return this.on(event, callback, caller, true);
    }
    getBind(event) {
        return this.events.get(event);
    }
    /**
     * 取消监听，如果没有传 callback 或 caller，那么就删除所对应的所有监听
     * @param event
     * @param callback
     * @param caller
     */
    off(event, callback, caller) {
        if (!this.events.has(event)) {
            return;
        }
        const events = this.events.get(event);
        for (const item of [...events]) {
            if (item.callback === callback && item.caller === caller) {
                events.delete(item);
                break;
            }
        }
    }
    offAllCaller(caller) {
        for (const events of this.events.values()) {
            for (const item of [...events]) {
                if (item.caller === caller) {
                    events.delete(item);
                }
            }
        }
    }
    /**
     * 发布消息
     * @param event
     * @param data
     */
    emit(event, ...params) {
        var _a;
        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.emit(event, ...params);
        if (!this.events.has(event)) {
            return;
        }
        const events = this.events.get(event);
        for (const item of [...events]) {
            const { callback, once, off } = item;
            if (typeof callback === 'function') {
                callback(...params);
            }
            if (once) {
                off();
            }
        }
    }
    destroy() {
        this.events.clear();
    }
}
