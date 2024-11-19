import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./extractTextForCases.ts";

export function codeBlockCase(node: ASTNode): any {
    return {
        table: {
            widths: ['*'],
            body: [[{
                text: extractText(node),
                fontSize: 10,
                fillColor: '#ededed',
                margin: [20, 15, 20, 15],
            },]],
        },
        layout: 'noBorders',
    };
}