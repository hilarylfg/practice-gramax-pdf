import {ASTNode} from "../../types/ASTNode.ts";
import {parseASTToPDFContent} from "../utils/parseAST.ts";
import {errorCase} from "./errorCase.ts";

const parseListItem = (node: ASTNode, level: number): any => {
    if (node.type === "bullet_list" || node.type === "ordered_list") {
        return parseListCase(node, level + 1);
    }

    return {
        stack: parseASTToPDFContent(node.content || [], level),
        margin: [2 * level, 0, 0, 0],
    };
};

const parseListCase = (node: ASTNode, level = 0): any => {
    const content = node.content || [];
    if (node.type === "bullet_list") {
        return {
            ul: content.map((item) => parseListItem(item, level)),
        };
    } else if (node.type === "ordered_list") {
        return {
            ol: content.map((item) => parseListItem(item, level)),
        };
    }

    return errorCase(node)
};

export function bulletListCase(node: ASTNode, level = 0): any {
    return parseListCase(node, level);
}

export function orderedListCase(node: ASTNode, level = 0): any {
    return parseListCase(node, level);
}