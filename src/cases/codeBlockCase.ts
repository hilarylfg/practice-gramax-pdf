import {ASTNode} from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";
import {ContentTable} from "pdfmake/interfaces";
import {Config} from "../utils/config.ts";

export function codeBlockCase(node: ASTNode): ContentTable {
    return {
        table: {
            dontBreakRows: true,
            widths: ['*'],
            body: [[{
                text: extractText(node),
                fontSize: Config.baseFontSize * 0.625,
                fillColor: '#ededed',
                margin: [Config.baseFontSize * 1.25, Config.baseFontSize * 1.25, Config.baseFontSize * 1.25, (Config.baseFontSize * 1.25) - Config.baseLineHeightMargin],
                lineHeight: Config.baseLineHeight,
                font: 'Consolas',
                color: '#111111',
            }]],
        },
        layout: 'noBorders',
    };
}