import { isKeyboardEvent, isMouseEvent } from "./isEventType";
export function assert(expectedCondition, message = "Assertion failed") {
    if (!expectedCondition) {
        console.error(message);
        throw Error(message);
    }
}
export function assertKeyboardEvent(event, message = "KeyboardEvent expected") {
    if (isKeyboardEvent(event)) {
        return true;
    }
    console.error(message);
    throw Error(message);
}
export function assertMouseEvent(event, message = "MouseEvent expected") {
    if (isMouseEvent(event)) {
        return true;
    }
    console.error(message);
    throw Error(message);
}
//# sourceMappingURL=assert.js.map