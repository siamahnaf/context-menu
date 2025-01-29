"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextMenuCategory = ContextMenuCategory;
const jsx_runtime_1 = require("react/jsx-runtime");
const classNames_1 = __importDefault(require("../utils/classNames"));
function ContextMenuCategory({ children, className, style, }) {
    const onClick = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: (0, classNames_1.default)("useContextMenu_ContextMenuCategory", className), "data-context-menu-category": true, onClick: onClick, style: style, children: children }));
}
//# sourceMappingURL=ContextMenuCategory.js.map