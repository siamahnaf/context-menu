import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useLayoutEffect, useRef, } from "react";
import { ContextMenuContext } from "../ContextMenuContext";
import classNames from "../utils/classNames";
export function ContextMenuItem({ children, className, dataTestId, dataTestName = "ContextMenuItem", dataTestState, disabled = false, onSelect, style, }) {
    const { registerMenuItem } = useContext(ContextMenuContext);
    const ref = useRef(null);
    useLayoutEffect(() => {
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
    return (_jsx("div", { className: classNames(disabled
            ? "useContextMenu_ContextMenuItemDisabled"
            : "useContextMenu_ContextMenuItem", className), "data-context-menu-item": true, "data-disabled": disabled, "data-test-id": dataTestId, "data-test-name": dataTestName, "data-test-state": dataTestState, onClick: onClick, onKeyDown: onKeyDown, ref: ref, style: style, tabIndex: disabled ? -1 : 0, children: children }));
}
//# sourceMappingURL=ContextMenuItem.js.map