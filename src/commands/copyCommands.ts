import * as vscode from 'vscode';
import { getRelativePath } from '../utils/pathUtils';

export async function copyRefer(document: vscode.TextDocument, range: vscode.Range) {
    const relativePath = getRelativePath(document.uri);
    const startLine = range.start.line + 1;
    const endLine = range.end.line + 1;

    // Format: path/to/file#L10 or path/to/file#L10-L20
    const lineSuffix = startLine === endLine ? `#L${startLine}` : `#L${startLine}-L${endLine}`;
    const textToCopy = `${relativePath}${lineSuffix}`;

    await vscode.env.clipboard.writeText(textToCopy);
    vscode.window.setStatusBarMessage(`$(check) Reference copied: ${textToCopy}`, 3000);
}

export async function copyBlock(document: vscode.TextDocument, range: vscode.Range) {
    const relativePath = getRelativePath(document.uri);
    const startLine = range.start.line + 1;
    const endLine = range.end.line + 1;
    
    // Format: path/to/file#L10 or path/to/file#L10-L20
    const lineSuffix = startLine === endLine ? `#L${startLine}` : `#L${startLine}-L${endLine}`;
    
    const codeContent = document.getText(range);
    const languageId = document.languageId;

    // Format: path + markdown block
    const textToCopy = `${relativePath}${lineSuffix}\n\`\`\`${languageId}\n${codeContent}\n\`\`\``;

    await vscode.env.clipboard.writeText(textToCopy);
    vscode.window.setStatusBarMessage(`$(check) Block copied!`, 3000);
}
