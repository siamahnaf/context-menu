import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "../utils/classNames";
export function ContextMenuCategory({ children, className, style, }) {
    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (_jsx("div", { className: classNames("useContextMenu_ContextMenuCategory", className), "data-context-menu-category": true, onClick: onClick, style: style, children: children }));
}
//# sourceMappingURL=ContextMenuCategory.js.map