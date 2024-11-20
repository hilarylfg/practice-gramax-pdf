import {ASTNode} from "../types/ASTNode.ts";
import {
    bulletListCase,
    codeBlockCase,
    headingCase,
    hrCase,
    imageCase,
    noteCase,
    orderedListCase,
    paragraphCase,
    tableCase,
    videoCase
} from "./cases";

export function parseASTToPDFContent(ast: ASTNode[], level = 0): any[] {
    return ast.flatMap((node) => {
        switch (node.type) {
            case 'heading':
                return headingCase(node);
            case 'paragraph':
                return paragraphCase(node);
            case 'bullet_list':
                return bulletListCase(node, level);
            case 'ordered_list':
                return orderedListCase(node, level);
            case 'table':
                return tableCase(node);
            case 'code_block':
                return codeBlockCase(node);
            case 'horizontal_rule':
                return hrCase();
            case 'note':
                return noteCase(node);
            case 'video':
                return videoCase(node);
            case 'image':
                return imageCase(node);
            default:
                return parseASTToPDFContent(node.content || [], level);
        }
    });
}