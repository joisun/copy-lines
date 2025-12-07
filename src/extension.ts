import * as vscode from 'vscode';
import { SelectionCodeLensProvider } from './providers/SelectionCodeLensProvider';
import { copyRefer, copyBlock } from './commands/copyCommands';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Copy Lines" is now active!');

    // 1. Register the CodeLens Provider
    const lensProvider = new SelectionCodeLensProvider();
    context.subscriptions.push(
        vscode.languages.registerCodeLensProvider('*', lensProvider)
    );

    // 2. Register Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('copy-lines.copyRefer', async (doc: vscode.TextDocument, range: vscode.Range) => {
            await copyRefer(doc, range);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('copy-lines.copyBlock', async (doc: vscode.TextDocument, range: vscode.Range) => {
            await copyBlock(doc, range);
        })
    );
}

export function deactivate() {}
