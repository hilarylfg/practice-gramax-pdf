import {ASTNode} from '../../types/ASTNode';

export function imageCase(node : ASTNode): any {
    return {
        image: node.attrs?.src,
        width: 200,
        margin: [0, 10, 0, 10],
    };
}