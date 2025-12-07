import * as vscode from 'vscode';
// debounce is removed as per request for instant feedback

export class SelectionCodeLensProvider implements vscode.CodeLensProvider {
    private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
    public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

    constructor() {
        // Listen for selection changes and trigger update IMMEDIATELY
        vscode.window.onDidChangeTextEditorSelection((e) => {
             // Only fire if the active editor matches the event
            if (e.textEditor === vscode.window.activeTextEditor) {
                this._onDidChangeCodeLenses.fire();
            }
        });
    }

    public provideCodeLenses(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.CodeLens[] {
        const editor = vscode.window.activeTextEditor;

        // Validation: Ensure we are looking at the active editor
        if (!editor || editor.document !== document) {
            return [];
        }

        const selection = editor.selection;
        
        // Only show CodeLens if text is strictly selected (non-empty)
        if (selection.isEmpty) {
            return [];
        }

        const range = selection;

        // Position the CodeLens at the top of the selection/line
        // We create a zero-length range at the start so it sits above
        const lensRange = new vscode.Range(range.start.line, 0, range.start.line, 0);

        // 1. Command: Refer
        const referCommand: vscode.Command = {
            title: "$(copy) Copy Refer",
            tooltip: "Copy path and line reference",
            command: "copy-lines.copyRefer",
            arguments: [document, range]
        };

        // 2. Command: Block
        const blockCommand: vscode.Command = {
            title: "$(copy) Copy Block",
            tooltip: "Copy path, lines, and code block",
            command: "copy-lines.copyBlock",
            arguments: [document, range]
        };

        return [
            new vscode.CodeLens(lensRange, referCommand),
            new vscode.CodeLens(lensRange, blockCommand)
        ];
    }
}
