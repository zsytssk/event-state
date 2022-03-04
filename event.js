"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.Event = void 0;
/**
 * 事件订阅发布构造函数
 */
var Event = /** @class */ (function () {
    function Event(parent) {
        this.parent = parent;
        this.events = new Map();
        this.destroyed = false;
    }
    /**
     * 注册监听
     * @param event
     * @param callback
     * @param caller
     */
    Event.prototype.on = function (event, callback, caller, once) {
        var _this = this;
        var events;
        if (this.events.has(event)) {
            events = this.events.get(event);
        }
        else {
            events = new Set();
            this.events.set(event, events);
        }
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var temp = events_1[_i];
            if (caller === temp.caller && callback === temp.callback) {
                return;
            }
        }
        var off = function () {
            _this.off(event, callback, caller);
        };
        events.add({ caller: caller, callback: callback, once: once, off: off });
    };
    Event.prototype.once = function (event, callback, caller) {
        return this.on(event, callback, caller, true);
    };
    Event.prototype.getBind = function (event) {
        return this.events.get(event);
    };
    /**
     * 取消监听，如果没有传 callback 或 caller，那么就删除所对应的所有监听
     * @param event
     * @param callback
     * @param caller
     */
    Event.prototype.off = function (event, callback, caller) {
        if (!this.events.has(event)) {
            return;
        }
        var events = this.events.get(event);
        for (var _i = 0, _a = __spreadArray([], events); _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.callback === callback && item.caller === caller) {
                events["delete"](item);
                break;
            }
        }
    };
    Event.prototype.offAllCaller = function (caller) {
        for (var _i = 0, _a = this.events.values(); _i < _a.length; _i++) {
            var events = _a[_i];
            for (var _b = 0, _c = __spreadArray([], events); _b < _c.length; _b++) {
                var item = _c[_b];
                if (item.caller === caller) {
                    events["delete"](item);
                }
            }
        }
    };
    /**
     * 发布消息
     * @param event
     * @param data
     */
    Event.prototype.emit = function (event) {
        var _a;
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        (_a = this.parent) === null || _a === void 0 ? void 0 : _a.emit.apply(_a, __spreadArray([event], params));
        if (!this.events.has(event)) {
            return;
        }
        var events = this.events.get(event);
        for (var _b = 0, _c = __spreadArray([], events); _b < _c.length; _b++) {
            var item = _c[_b];
            var callback = item.callback, once = item.once, off = item.off;
            if (typeof callback === 'function') {
                callback.apply(void 0, params);
            }
            if (once) {
                off();
            }
        }
    };
    Event.prototype.destroy = function () {
        this.destroyed = true;
        this.parent = undefined;
        this.events.clear();
    };
    return Event;
}());
exports.Event = Event;
