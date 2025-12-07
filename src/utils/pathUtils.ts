import * as vscode from 'vscode';

/**
 * Returns the path relative to the workspace root.
 * If no workspace is open, returns the file name.
 */
export function getRelativePath(uri: vscode.Uri): string {
    const relativePath = vscode.workspace.asRelativePath(uri, false);
    return relativePath;
}
