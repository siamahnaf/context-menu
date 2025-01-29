"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useContextMenu = useContextMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ContextMenuContext_1 = require("../ContextMenuContext");
const ContextMenu_1 = require("../components/ContextMenu");
function useContextMenu(contextMenuItems, options = {}) {
    const { alignTo = "auto-cursor", className, dataTestId, dataTestName, onHide, onShow, requireClickToShow = false, style, } = options;
    const [state, setState] = (0, react_1.useState)(null);
    const menuRef = (0, react_1.useRef)(null);
    const menuItemsRef = (0, react_1.useRef)([]);
    const registerMenu = (0, react_1.useCallback)((menu) => {
        menuRef.current = menu;
    }, []);
    const registerMenuItem = (0, react_1.useCallback)((menuItem) => {
        const menuItems = menuItemsRef.current;
        menuItems.push(menuItem);
    }, []);
    (0, react_1.useEffect)(() => {
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
    const committedValuesRef = (0, react_1.useRef)({ onHide, onShow, state });
    (0, react_1.useEffect)(() => {
        committedValuesRef.current.onHide = onHide;
        committedValuesRef.current.onShow = onShow;
        committedValuesRef.current.state = state;
    });
    const context = (0, react_1.useMemo)(() => {
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
    const hideMenu = (0, react_1.useCallback)(() => {
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
        contextMenu = ((0, jsx_runtime_1.jsx)(ContextMenuContext_1.ContextMenuContext.Provider, { value: context, children: (0, jsx_runtime_1.jsx)(ContextMenu_1.ContextMenu, { alignTo: alignTo, className: className, clientX: state.clientX, clientY: state.clientY, dataTestId: dataTestId, dataTestName: dataTestName, hide: hideMenu, style: style, targetRect: state.targetRect, children: contextMenuItems }) }));
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