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
                width: 200,
                margin: [0, 10, 0, 0],
                alignment: 'center',
            },
            {
                text: node.attrs?.title || '',
                margin: [0, 5, 0, 5],
                alignment: 'center',
            },
        ],
    }
}