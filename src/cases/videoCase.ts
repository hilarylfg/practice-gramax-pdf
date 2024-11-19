import {ASTNode} from "../../types/ASTNode.ts";

export function videoCase(node: ASTNode): any {
    return {
        stack: [
            {
                text: 'Video',
                link: node.attrs?.path,
                color: '#007BFF',
                decoration: 'underline',
            },
            {text: node.attrs?.title || '', margin: [0, 0, 0, 5]},
        ],
        margin: [0, 5, 0, 5],
    }
}