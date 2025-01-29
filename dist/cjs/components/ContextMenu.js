"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenu = ContextMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
const ContextMenuContext_1 = require("../ContextMenuContext");
const useModalDismissSignal_1 = require("../hooks/useModalDismissSignal");
const calculateContextMenuStyle_1 = require("../utils/calculateContextMenuStyle");
const classNames_1 = __importDefault(require("../utils/classNames"));
function ContextMenu({ alignTo, children, className, clientX, clientY, targetRect, dataTestId, dataTestName = "ContextMenu", hide, style: styleFromProps, }) {
    const { contextMenuEvent, registerMenu } = (0, react_1.useContext)(ContextMenuContext_1.ContextMenuContext);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        registerMenu(ref.current);
    }, [registerMenu]);
    const styleRef = (0, react_1.useRef)({
        left: 0,
        top: 0,
        width: undefined,
    });
    (0, useModalDismissSignal_1.useModalDismissSignal)(ref, hide, true);
    const eventType = contextMenuEvent === null || contextMenuEvent === void 0 ? void 0 : contextMenuEvent.type;
    // Optimally position the popup within the viewport
    (0, react_1.useLayoutEffect)(() => {
        const contextMenu = ref.current;
        const menuRect = contextMenu.getBoundingClientRect();
        const isKeyboardEvent = eventType === null || eventType === void 0 ? void 0 : eventType.startsWith("key");
        const { left, top, width } = (0, calculateContextMenuStyle_1.calculateContextMenuStyle)({
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
    return (0, react_dom_1.createPortal)((0, jsx_runtime_1.jsx)("div", { className: "useContextMenu_Backdrop", onClick: onClick, onMouseMove: onMouseMove, children: (0, jsx_runtime_1.jsx)("div", { className: (0, classNames_1.default)("useContextMenu_ContextMenu", className), "data-context-menu": true, "data-test-id": dataTestId, "data-test-name": dataTestName, ref: ref, style: style, tabIndex: 0, children: children }) }), document.body);
}
//# sourceMappingURL=ContextMenu.js.map