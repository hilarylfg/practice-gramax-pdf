import { ASTNode } from '../../types/ASTNode';
import { extractText } from "./utils/extractTextForCases.ts";
import {ContentTable} from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";

export function codeBlockCase(node: ASTNode): ContentTable {
    try {
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
    catch (e) {
        return errorCase(node) as never;
    }
}