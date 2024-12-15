import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";

export function codeBlockCase(node: ASTNode): any {
    return {
        table: {
            widths: ['*'],
            body: [[{
                text: extractText(node),
                fontSize: 10,
                fillColor: '#ededed',
                margin: [24, 20, 24, 20],
                font: 'Conolas',
                color: '#111111'
            },]],
        },
        layout: 'noBorders',
    };
}