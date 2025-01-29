import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useLayoutEffect, useRef, } from "react";
import { createPortal } from "react-dom";
import { ContextMenuContext } from "../ContextMenuContext";
import { useModalDismissSignal } from "../hooks/useModalDismissSignal";
import { calculateContextMenuStyle } from "../utils/calculateContextMenuStyle";
import classNames from "../utils/classNames";
export function ContextMenu({ alignTo, children, className, clientX, clientY, targetRect, dataTestId, dataTestName = "ContextMenu", hide, style: styleFromProps, }) {
    const { contextMenuEvent, registerMenu } = useContext(ContextMenuContext);
    const ref = useRef(null);
    useLayoutEffect(() => {
        registerMenu(ref.current);
    }, [registerMenu]);
    const styleRef = useRef({
        left: 0,
        top: 0,
        width: undefined,
    });
    useModalDismissSignal(ref, hide, true);
    const eventType = contextMenuEvent === null || contextMenuEvent === void 0 ? void 0 : contextMenuEvent.type;
    // Optimally position the popup within the viewport
    useLayoutEffect(() => {
        const contextMenu = ref.current;
        const menuRect = contextMenu.getBoundingClientRect();
        const isKeyboardEvent = eventType === null || eventType === void 0 ? void 0 : eventType.startsWith("key");
        const { left, top, width } = calculateContextMenuStyle({
            alignTo,
            cursorX: isKeyboardEvent ? undefined : clientX,
            cursorY: isKeyboardEvent ? undefined : clientY,
            menuRect,
            targetRect,
            viewportHeight: window.innerHeight,
            viewportWidth: window.innerWidth,
        });
        contextMenu.style.left = `${left}px`;
        contextMenu.style.top = `${top}px`;
        if (width) {
            contextMenu.style.width = `${width}px`;
        }
        // Stash in ref for subsequent renders
        styleRef.current = {
            left,
            top,
            width,
        };
    }, [alignTo, clientX, clientY, eventType, targetRect]);
    const onClick = (event) => {
        if (event.defaultPrevented) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        hide();
    };
    const onMouseMove = (event) => {
        event.stopPropagation();
    };
    const { left, top, width } = styleRef.current;
    let style = {
        left: `${left}px`,
        top: `${top}px`,
        width: width ? `${width}px` : undefined,
    };
    if (styleFromProps) {
        style = Object.assign(style, styleFromProps);
    }
    return createPortal(_jsx("div", { className: "useContextMenu_Backdrop", onClick: onClick, onMouseMove: onMouseMove, children: _jsx("div", { className: classNames("useContextMenu_ContextMenu", className), "data-context-menu": true, "data-test-id": dataTestId, "data-test-name": dataTestName, ref: ref, style: style, tabIndex: 0, children: children }) }), document.body);
}
//# sourceMappingURL=ContextMenu.js.map