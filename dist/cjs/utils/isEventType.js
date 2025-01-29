"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isKeyboardEvent = isKeyboardEvent;
exports.isMouseEvent = isMouseEvent;
function isKeyboardEvent(event) {
    return event.type.startsWith("key");
}
function isMouseEvent(event) {
    return (event.type === "click" ||
        event.type === "contextmenu" ||
        event.type.startsWith("mouse"));
}
//# sourceMappingURL=isEventType.js.map