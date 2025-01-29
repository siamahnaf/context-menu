export function isKeyboardEvent(event) {
    return event.type.startsWith("key");
}
export function isMouseEvent(event) {
    return (event.type === "click" ||
        event.type === "contextmenu" ||
        event.type.startsWith("mouse"));
}
//# sourceMappingURL=isEventType.js.map