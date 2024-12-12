import {ASTNode} from "../../types/ASTNode.ts";
import {errorCase} from "./errorCase.ts";

const notFoundImage = 'data:text/html;base64,';

export function svgCase(node: ASTNode): any {
    if (node.attrs?.src?.startsWith(notFoundImage) || node.attrs?.src?.startsWith('<!doctype html>')) {
        return errorCase(node);
    }

    return {
        svg: node.attrs?.src,
        width: 200,
        alignment: 'center',
    };
}