import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "../utils/classNames";
export function ContextMenuDivider({ className, style, }) {
    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (_jsx("div", { className: classNames("useContextMenu_Divider", className), "data-context-menu-divider": true, onClick: onClick, style: style }));
}
//# sourceMappingURL=ContextMenuDivider.js.map