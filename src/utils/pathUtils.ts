import * as vscode from 'vscode';

/**
 * Returns the path based on user configuration (Relative or Absolute).
 */
export function getRelativePath(uri: vscode.Uri): string {
    const config = vscode.workspace.getConfiguration('copy-lines');
    const useAbsolute = config.get<boolean>('useAbsolutePath', false);

    if (useAbsolute) {
        return uri.fsPath;
    }

    // vscode.workspace.asRelativePath returns the relative path if the file is inside the workspace.
    // If includeWorkspaceFolder is false (default), it returns 'src/utils/file.ts'.
    // If the file is NOT in the workspace, it returns the path as is (or filename depending on context).
    return vscode.workspace.asRelativePath(uri, false);
}