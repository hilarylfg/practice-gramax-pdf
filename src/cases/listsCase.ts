import { ASTNode } from "../../types/ASTNode.ts";
import { parseASTToPDFContent } from "../utils/parseAST.ts";
import { ContentOrderedList, ContentStack, ContentUnorderedList } from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";
import {Config} from "../utils/config.ts";

const parseListItem = (node: ASTNode, level: number, isFirstItem: boolean): ContentOrderedList | ContentUnorderedList | ContentStack => {
    if (node.type === "bulletList" || node.type === "orderedList") {
        return parseListCase(node, level + 1);
    }
    const marginTop = isFirstItem ? 0 : Config.baseFontSize * 0.25;
    return {
        stack: parseASTToPDFContent(node.content || [], level),
        margin: [(Config.baseFontSize * 0.125) * level, marginTop, 0, 0],
    };
};

const parseListCase = (node: ASTNode, level = 0): ContentOrderedList | ContentUnorderedList => {
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
    return errorCase(node) as never;
};

export function bulletListCase(node: ASTNode, level = 0): ContentUnorderedList {
    return parseListCase(node, level) as ContentUnorderedList;
}

export function orderedListCase(node: ASTNode, level = 0): ContentOrderedList {
    return parseListCase(node, level) as ContentOrderedList;
}