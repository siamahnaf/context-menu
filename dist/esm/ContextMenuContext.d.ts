import { UIEvent } from "react";
export type ContextMenuContextType = {
    contextMenuEvent: UIEvent | null;
    registerMenu: (menuItem: HTMLDivElement) => void;
    registerMenuItem: (menuItem: HTMLDivElement) => void;
};
export declare const ContextMenuContext: import("react").Context<ContextMenuContextType>;
