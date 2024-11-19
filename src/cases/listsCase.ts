import {ASTNode} from "../../types/ASTNode.ts";
import {parseASTToPDFContent} from "../parseAST.ts";

export const parseListItem = (node: ASTNode, level: number) => ({
    stack: parseASTToPDFContent(node.content || [], level),
    margin: [2 * level, 5, 0, 0],
});

export function bulletListCase(node: ASTNode, level = 0): any {
    const content = node.content || [];
    return {
        ul: content.map((item) => parseListItem(item, level + 1))
    };
}

export function orderedListCase(node: ASTNode, level = 0): any {
    const content = node.content || [];
    return {
        ol: content.map((item) => parseListItem(item, level + 1))
    };
}
