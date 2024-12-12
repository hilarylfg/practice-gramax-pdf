import {ASTNode} from '../../types/ASTNode';
import {errorCase} from "./errorCase.ts";

const notFoundImage = 'data:text/html;base64,';

export function imageCase(node: ASTNode): any {
    if (node.attrs?.src?.startsWith(notFoundImage) ) {
        return errorCase(node);
    }

    return {
        stack: [
            {
                image: node.attrs?.src,
                width: 400,
                margin: [0, 0, 0, 8],
            },
            {
                text: node.attrs?.title || '',
                margin: [0, -4, 0, 8],
                fontSize: 13,
                italics: true,
            },
        ],
        alignment: 'center',
    }
}