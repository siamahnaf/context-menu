"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuItem = ContextMenuItem;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ContextMenuContext_1 = require("../ContextMenuContext");
const classNames_1 = __importDefault(require("../utils/classNames"));
function ContextMenuItem({ children, className, dataTestId, dataTestName = "ContextMenuItem", dataTestState, disabled = false, onSelect, style, }) {
    const { registerMenuItem } = (0, react_1.useContext)(ContextMenuContext_1.ContextMenuContext);
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useLayoutEffect)(() => {
        registerMenuItem(ref.current);
    }, [registerMenuItem]);
    const onClick = (event) => {
        if (event.defaultPrevented) {
            return;
        }
        if (!disabled) {
            if (onSelect) {
                onSelect(event);
            }
        }
    };
    const onKeyDown = (event) => {
        if (event.defaultPrevented) {
            return;
        }
        if (!disabled) {
            if (onSelect) {
                switch (event.key) {
                    case "ArrowDown":
                    case "ArrowUp":
                    case "Enter":
                    case " ":
                        onSelect(event);
                        break;
                }
            }
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, classNames_1.default)(disabled
            ? "useContextMenu_ContextMenuItemDisabled"
            : "useContextMenu_ContextMenuItem", className), "data-context-menu-item": true, "data-disabled": disabled, "data-test-id": dataTestId, "data-test-name": dataTestName, "data-test-state": dataTestState, onClick: onClick, onKeyDown: onKeyDown, ref: ref, style: style, tabIndex: disabled ? -1 : 0, children: children }));
}
//# sourceMappingURL=ContextMenuItem.js.map