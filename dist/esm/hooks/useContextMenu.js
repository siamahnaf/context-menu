import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState, } from "react";
import { ContextMenuContext, } from "../ContextMenuContext";
import { ContextMenu } from "../components/ContextMenu";
export function useContextMenu(contextMenuItems, options = {}) {
    const { alignTo = "auto-cursor", className, dataTestId, dataTestName, onHide, onShow, requireClickToShow = false, style, } = options;
    const [state, setState] = useState(null);
    const menuRef = useRef(null);
    const menuItemsRef = useRef([]);
    const registerMenu = useCallback((menu) => {
        menuRef.current = menu;
    }, []);
    const registerMenuItem = useCallback((menuItem) => {
        const menuItems = menuItemsRef.current;
        menuItems.push(menuItem);
    }, []);
    useEffect(() => {
        if (state == null) {
            return;
        }
        const target = state.event.target;
        const menu = menuRef.current;
        const menuItems = menuItemsRef.current;
        const enabledMenuItems = menuItems.reduce((reduced, menuItem, index) => {
            if (menuItem.getAttribute("data-disabled") !== "true") {
                reduced.push(index);
            }
            return reduced;
        }, []);
        const isMouseEvent = state.event.type === "contextmenu" || state.event.type === "click";
        let focusIndex = isMouseEvent ? -1 : 0;
        if (focusIndex >= 0) {
            menuItems[0].focus();
        }
        else {
            target.blur();
            menu.focus();
        }
        const focus = () => {
            const index = enabledMenuItems[focusIndex];
            const menuItem = menuItems[index];
            menuItem.focus();
        };
        const onKeyDown = (event) => {
            switch (event.key) {
                case "ArrowDown": {
                    focusIndex =
                        focusIndex + 1 < enabledMenuItems.length ? focusIndex + 1 : 0;
                    focus();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
                case "ArrowUp": {
                    focusIndex =
                        focusIndex - 1 >= 0 ? focusIndex - 1 : enabledMenuItems.length - 1;
                    focus();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
                case "Enter": {
                    const index = enabledMenuItems[focusIndex];
                    const menuItem = menuItems[index];
                    menuItem.click();
                    break;
                }
                case "Tab": {
                    if (event.shiftKey) {
                        focusIndex =
                            focusIndex - 1 >= 0
                                ? focusIndex - 1
                                : enabledMenuItems.length - 1;
                    }
                    else {
                        focusIndex =
                            focusIndex + 1 < enabledMenuItems.length ? focusIndex + 1 : 0;
                    }
                    focus();
                    event.preventDefault();
                    event.stopPropagation();
                    break;
                }
            }
        };
        menu.addEventListener("keydown", onKeyDown);
        return () => {
            menu.removeEventListener("keydown", onKeyDown);
            menuItems.splice(0, menuItems.length);
            // Return focus to the target element that triggered the context menu.
            target.focus();
        };
    }, [requireClickToShow, state]);
    const committedValuesRef = useRef({ onHide, onShow, state });
    useEffect(() => {
        committedValuesRef.current.onHide = onHide;
        committedValuesRef.current.onShow = onShow;
        committedValuesRef.current.state = state;
    });
    const context = useMemo(() => {
        var _a;
        return ({
            contextMenuEvent: (_a = state === null || state === void 0 ? void 0 : state.event) !== null && _a !== void 0 ? _a : null,
            registerMenu,
            registerMenuItem,
        });
    }, [registerMenu, registerMenuItem, state === null || state === void 0 ? void 0 : state.event]);
    const showMenu = (event) => {
        if (event.defaultPrevented) {
            // Support nested context menus
            return;
        }
        event.preventDefault();
        if (typeof onShow === "function") {
            onShow(event);
        }
        const { currentTarget } = event;
        const targetRect = currentTarget.getBoundingClientRect();
        const clientX = isMouseEvent(event) ? event.clientX : targetRect.x;
        const clientY = isMouseEvent(event) ? event.clientY : targetRect.y;
        setState({
            clientX,
            clientY,
            event,
            targetRect,
        });
    };
    const onContextMenu = showMenu;
    const onKeyDown = (event) => {
        if (state !== null) {
            return;
        }
        else if (requireClickToShow) {
            return;
        }
        switch (event.key) {
            case "ArrowDown":
            case "ArrowUp":
            case "ContextMenu":
            case "Enter":
            case " ": {
                showMenu(event);
                break;
            }
        }
    };
    const hideMenu = useCallback(() => {
        const { onHide, state } = committedValuesRef.current;
        if (state == null) {
            return;
        }
        setState(null);
        if (typeof onHide === "function") {
            onHide();
        }
    }, []);
    let contextMenu = null;
    if (state) {
        contextMenu = (_jsx(ContextMenuContext.Provider, { value: context, children: _jsx(ContextMenu, { alignTo: alignTo, className: className, clientX: state.clientX, clientY: state.clientY, dataTestId: dataTestId, dataTestName: dataTestName, hide: hideMenu, style: style, targetRect: state.targetRect, children: contextMenuItems }) }));
    }
    return {
        contextMenu,
        hideMenu,
        onContextMenu,
        onKeyDown,
    };
}
function isMouseEvent(event) {
    return event.pageX != null && event.pageY != null;
}
//# sourceMappingURL=useContextMenu.js.map