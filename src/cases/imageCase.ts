import {ASTNode} from '../../types/ASTNode';

export function imageCase(node: ASTNode): any {
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