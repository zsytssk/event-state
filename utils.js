"use strict";
exports.__esModule = true;
exports.throttleFn = void 0;
var throttleFn = function (fn, time) {
    var timeout = null;
    return function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            fn.apply(void 0, params);
        }, time);
    };
};
exports.throttleFn = throttleFn;
