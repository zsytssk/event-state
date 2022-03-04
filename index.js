"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.EventState = void 0;
var event_1 = require("./event");
var EventState = /** @class */ (function (_super) {
    __extends(EventState, _super);
    function EventState(eventList, parent) {
        var _this = _super.call(this, parent) || this;
        _this.eventList = [];
        _this.eventList = eventList;
        return _this;
    }
    EventState.prototype.destroy = function () {
        this.eventList = [];
        _super.prototype.destroy.call(this);
    };
    return EventState;
}(event_1.Event));
exports.EventState = EventState;
