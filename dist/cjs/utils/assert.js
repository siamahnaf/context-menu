"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = assert;
exports.assertKeyboardEvent = assertKeyboardEvent;
exports.assertMouseEvent = assertMouseEvent;
const isEventType_1 = require("./isEventType");
function assert(expectedCondition, message = "Assertion failed") {
    if (!expectedCondition) {
        console.error(message);
        throw Error(message);
    }
}
function assertKeyboardEvent(event, message = "KeyboardEvent expected") {
    if ((0, isEventType_1.isKeyboardEvent)(event)) {
        return true;
    }
    console.error(message);
    throw Error(message);
}
function assertMouseEvent(event, message = "MouseEvent expected") {
    if ((0, isEventType_1.isMouseEvent)(event)) {
        return true;
    }
    console.error(message);
    throw Error(message);
}
//# sourceMappingURL=assert.js.map