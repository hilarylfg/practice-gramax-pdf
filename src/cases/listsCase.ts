import { ASTNode } from "../../types/ASTNode.ts";
import { parseASTToPDFContent } from "../utils/parseAST.ts";
import { errorCase } from "./errorCase.ts";

const parseListItem = (node: ASTNode, level: number, isFirstItem: boolean): any => {
    if (node.type === "bulletList" || node.type === "orderedList") {
        return parseListCase(node, level + 1);
    }

    const marginTop = isFirstItem ? 0 : 4;

    return {
        stack: parseASTToPDFContent(node.content || [], level),
        margin: [2 * level, marginTop, 0, 0],
    };
};

const parseListCase = (node: ASTNode, level = 0): any => {
    const content = node.content || [];

    if (node.type === "bulletList") {
        return {
            ul: content.map((item, index) => parseListItem(item, level, index === 0)),
        };
    } else if (node.type === "orderedList") {
        return {
            ol: content.map((item, index) => parseListItem(item, level, index === 0)),
        };
    }

    return errorCase(node);
};

export function bulletListCase(node: ASTNode, level = 0): any {
    return parseListCase(node, level);
}

export function orderedListCase(node: ASTNode, level = 0): any {
    return parseListCase(node, level);
}