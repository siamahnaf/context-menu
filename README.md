<br/>
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780157/Personal%20Logo/logo-white_e6fujz.png">
  <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png">
  <img alt="Siam Ahnaf" src="https://res.cloudinary.com/dub0dpenl/image/upload/v1731780152/Personal%20Logo/logo-dark_qqwrqu.png" height="auto" width="240">
</picture> 
<br/> <br/>

# @siamf/context-menu
React hook and components for displaying fully UI controlled context menu.

This is project is fork of [use-context-menu](https://github.com/bvaughn/use-context-menu) with react 19 support.

# Installation

```bash
$ npm i @siamf/context-menu
```

# Usage

### `ImageUpload`

```javascript
"use client"
import { ContextMenuItem, useContextMenu } from "@siamf/context-menu";
import "@siamf/context-menu/styles.css";

const Page = ({ className }: { className: string }) => {
  const { contextMenu, onContextMenu, onKeyDown } = useContextMenu(
    <>
      <ContextMenuItem onSelect={selectOne}>One</ContextMenuItem>
      <ContextMenuItem onSelect={selectTwo}>Two</ContextMenuItem>
      <ContextMenuItem onSelect={selectThree}>Three</ContextMenuItem>
    </>
  );

  return (
    <>
      <button onContextMenu={onContextMenu} onKeyDown={onKeyDown} tabIndex={0}>
        right-click me
      </button>
      {contextMenu}
    </>
  );
}

export default Page;
```

# Stay in touch

- Author - [Siam Ahnaf](https://www.siamahnaf.com/)
- Website - [https://www.siamahnaf.com/](https://www.siamahnaf.com/)
- LinkedIn - [https://www.linkedin.com/in/siamahnaf/](https://www.linkedin.com/in/siamahnaf/)
- Github - [https://github.com/siamahnaf](https://github.com/siamahnaf)