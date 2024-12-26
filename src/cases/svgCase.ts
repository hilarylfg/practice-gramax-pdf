import {ASTNode} from "../../types/ASTNode.ts";
import {errorCase} from "./errorCase.ts";
import {ContentSvg} from "pdfmake/interfaces";

const notFoundImage = 'data:text/html;base64,';

export function svgCase(node: ASTNode): ContentSvg {
    if (!node.attrs?.src?.startsWith(notFoundImage) || !node.attrs?.src?.startsWith('<!doctype html>')) {
        return {
            svg: node.attrs?.src ?? notFoundImage,
            width: 200,
            alignment: 'center',
        };
    }
    return errorCase(node) as never;
}