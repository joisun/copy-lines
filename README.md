# Copy Lines for VS Code

A lightweight extension designed to help you quickly copy code context for AI chats (like ChatGPT, Claude, or Cursor).

## Features

When you select any text in the editor, two **CodeLens** buttons appear instantly above your selection:

1.  **$(copy) Copy Refer**
    *   Copies the file path and line numbers.
    *   Example: `src/utils/helper.ts:10-20`
2.  **$(copy) Copy Block**
    *   Copies the file path reference followed by the code block wrapped in Markdown.
    *   Example:
        ```text
        src/utils/helper.ts:10-20
        ```typescript
        export function example() {
            // ...
        }
        ```
        ```

## Configuration

This extension provides the following setting:

*   `copy-lines.useAbsolutePath` (Default: `false`)
    *   **false**: Uses path relative to the workspace root (e.g., `src/main.ts`).
    *   **true**: Uses the full absolute path (e.g., `/Users/name/project/src/main.ts`).

## Usage

1.  Open any file.
2.  Select lines of code.
3.  Click the **Copy Refer** or **Copy Block** button appearing above the selection.
4.  Paste into your AI tool.

---
**Enjoy efficient coding!**
