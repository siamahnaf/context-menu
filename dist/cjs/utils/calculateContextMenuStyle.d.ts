import { AlignTo, ContextMenuStyle, Rect } from "../types";
export declare function calculateContextMenuStyle({ alignTo, cursorX, cursorY, menuRect, targetRect, viewportHeight, viewportWidth, }: {
    alignTo: AlignTo;
    cursorX?: number | undefined;
    cursorY?: number | undefined;
    menuRect: Rect;
    targetRect: Rect;
    viewportHeight: number;
    viewportWidth: number;
}): ContextMenuStyle;
