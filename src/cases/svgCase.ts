import {ASTNode} from "../../types/ASTNode.ts";

export function svgCase(node: ASTNode): any {
    return {
        svg: node.attrs?.src,
        width: 200,
        alignment: 'center',
        margin: [0, 10, 0, 10],
    };
}