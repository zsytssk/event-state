"use strict";
exports.__esModule = true;
exports.useThrottleEventSelector = exports.useEventSelector = exports.useThrottleEventState = exports.useEventState = void 0;
var react_1 = require("react");
var utils_1 = require("./utils");
function useEventState(state, eventList) {
    var localEventList = eventList || state.eventList;
    var ref = react_1.useRef();
    var _a = react_1.useState(0), changeIndex = _a[0], setChangeIndex = _a[1];
    react_1.useEffect(function () {
        var refFn = function () {
            setChangeIndex(function (i) {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };
        ref.current = refFn;
        return function () {
            ref.current = undefined;
        };
    }, []);
    react_1.useEffect(function () {
        var fn = function () {
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref);
        };
        for (var _i = 0, localEventList_1 = localEventList; _i < localEventList_1.length; _i++) {
            var event_1 = localEventList_1[_i];
            state.on(event_1, fn);
        }
        return function () {
            for (var _i = 0, localEventList_2 = localEventList; _i < localEventList_2.length; _i++) {
                var event_2 = localEventList_2[_i];
                state.off(event_2, fn);
            }
        };
    }, [state, localEventList]);
    return [state, changeIndex];
}
exports.useEventState = useEventState;
function useThrottleEventState(state, time, eventList) {
    if (time === void 0) { time = 300; }
    var localEventList = eventList || state.eventList;
    var ref = react_1.useRef();
    var _a = react_1.useState(0), changeIndex = _a[0], setChangeIndex = _a[1];
    react_1.useEffect(function () {
        var refFn = function () {
            setChangeIndex(function (i) {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };
        ref.current = utils_1.throttleFn(refFn, time);
        return function () {
            ref.current = undefined;
        };
    }, []);
    react_1.useEffect(function () {
        var fn = function () {
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref);
        };
        for (var _i = 0, localEventList_3 = localEventList; _i < localEventList_3.length; _i++) {
            var event_3 = localEventList_3[_i];
            state.on(event_3, fn);
        }
        return function () {
            for (var _i = 0, localEventList_4 = localEventList; _i < localEventList_4.length; _i++) {
                var event_4 = localEventList_4[_i];
                state.off(event_4, fn);
            }
        };
    }, [state, localEventList]);
    return [state, changeIndex];
}
exports.useThrottleEventState = useThrottleEventState;
function useEventSelector(state, fn, eventList) {
    var localEventList = eventList || state.eventList;
    var ref = react_1.useRef();
    var subStateRef = react_1.useRef(fn(state));
    var _a = react_1.useState(0), changeIndex = _a[0], setChangeIndex = _a[1];
    react_1.useEffect(function () {
        var refFn = function () {
            var subState = fn(state);
            subStateRef.current = subState;
            setChangeIndex(function (i) {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };
        ref.current = refFn;
        return function () {
            ref.current = undefined;
        };
    }, [fn]);
    react_1.useEffect(function () {
        var fn = function () {
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref);
        };
        for (var _i = 0, localEventList_5 = localEventList; _i < localEventList_5.length; _i++) {
            var event_5 = localEventList_5[_i];
            state.on(event_5, fn);
        }
        return function () {
            for (var _i = 0, localEventList_6 = localEventList; _i < localEventList_6.length; _i++) {
                var event_6 = localEventList_6[_i];
                state.off(event_6, fn);
            }
        };
    }, [state, localEventList]);
    return [subStateRef.current, changeIndex];
}
exports.useEventSelector = useEventSelector;
function useThrottleEventSelector(state, fn, time, eventList) {
    if (time === void 0) { time = 300; }
    var localEventList = eventList || state.eventList;
    var ref = react_1.useRef();
    var subStateRef = react_1.useRef(fn(state));
    var _a = react_1.useState(0), changeIndex = _a[0], setChangeIndex = _a[1];
    react_1.useEffect(function () {
        var refFn = function () {
            var subState = fn(state);
            subStateRef.current = subState;
            setChangeIndex(function (i) {
                if (i === 100) {
                    return 0;
                }
                return i + 1;
            });
        };
        ref.current = utils_1.throttleFn(refFn, time);
        return function () {
            ref.current = undefined;
        };
    }, [fn]);
    react_1.useEffect(function () {
        var fn = function () {
            var _a;
            (_a = ref.current) === null || _a === void 0 ? void 0 : _a.call(ref);
        };
        for (var _i = 0, localEventList_7 = localEventList; _i < localEventList_7.length; _i++) {
            var event_7 = localEventList_7[_i];
            state.on(event_7, fn);
        }
        return function () {
            for (var _i = 0, localEventList_8 = localEventList; _i < localEventList_8.length; _i++) {
                var event_8 = localEventList_8[_i];
                state.off(event_8, fn);
            }
        };
    }, [state, localEventList]);
    return [subStateRef.current, changeIndex];
}
exports.useThrottleEventSelector = useThrottleEventSelector;
