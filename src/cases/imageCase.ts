import {ASTNode} from '../../types/ASTNode';
import {errorCase} from "./errorCase.ts";
import {ContentStack, ContentTable} from "pdfmake/interfaces";
import {Config} from "../utils/config.ts";

const notFoundImage = 'data:text/html;base64,';

export function imageCase(node: ASTNode): ContentStack | ContentTable {
    if (node.attrs?.src !== "") {
        if (node.attrs?.src?.startsWith(notFoundImage)) {
            return {
                stack: [
                    {
                        image: node.attrs.src,
                        width: 400,
                        margin: [0, 0, 0, Config.baseFontSize * 0.5],
                    },
                    {
                        text: node.attrs?.title || '',
                        margin: [0, -Config.baseFontSize * 0.25, 0, Config.baseFontSize * 0.5],
                        fontSize: Config.baseFontSize * 0.625,
                        italics: true,
                    },
                ],
                alignment: 'center',
            }
        }
    }
    return errorCase(node) as never;
}