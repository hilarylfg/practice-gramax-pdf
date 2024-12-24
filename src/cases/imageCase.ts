import {ASTNode} from '../../types/ASTNode';
import {errorCase} from "./errorCase.ts";
import {ContentStack, ContentTable} from "pdfmake/interfaces";

const notFoundImage = 'data:text/html;base64,';

export function imageCase(node: ASTNode): ContentStack | ContentTable {
    if (node.attrs?.src?.startsWith(notFoundImage)) {
        return errorCase(node);
    }

    try {
        return {
            stack: [
                {
                    image: node.attrs?.src ?? notFoundImage,
                    width: 400,
                    margin: [0, 0, 0, 8],
                },
                {
                    text: node.attrs?.title || '',
                    margin: [0, -4, 0, 8],
                    fontSize: 12,
                    italics: true,
                },
            ],
            alignment: 'center',
        }
    }
    catch (e) {
        return errorCase(node) as never;
    }
}