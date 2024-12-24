import { ASTNode } from '../../types/ASTNode';
import { extractText } from "./utils/extractTextForCases.ts";
import {CaseResult} from "../../types/CasesType.ts";

export function codeBlockCase(node: ASTNode): CaseResult {
    return {
        table: {
            dontBreakRows: true,
            widths: ['*'],
            body: [[{
                text: extractText(node),
                fontSize: 10,
                fillColor: '#ededed',
                margin: [20, 18, 20, 13],
                lineHeight: 1.4,
                font: 'Consolas',
                color: '#111111',
            }]],
        },
        layout: 'noBorders',
    };
}