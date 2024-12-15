import {ASTNode} from "../../types/ASTNode.ts";
import {parseASTToPDFContent} from "../utils/parseAST.ts";

const parseListItem = (node: ASTNode, level: number): any => {
    if (node.type === "bullet_list" || node.type === "ordered_list") {
        return parseListCase(node, level + 1);
    }

    return {
        stack: parseASTToPDFContent(node.content || [], level),
        margin: [2 * level, 5, 0, 0],
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

    return {
        text: "Invalid list structure",
        style: "error",
    };
};

export function bulletListCase(node: ASTNode, level = 0): any {
    return parseListCase(node, level);
}

export function orderedListCase(node: ASTNode, level = 0): any {
    return parseListCase(node, level);
}