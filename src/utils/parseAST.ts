import {ASTNode} from "../../types/ASTNode.ts";
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
    videoCase,
    errorCase
} from "../cases";
import {svgCase} from "../cases/svgCase.ts";

const casesMap: Record<string, (node: ASTNode, level?: number) => any> = {
    heading: headingCase,
    paragraph: paragraphCase,
    bullet_list: bulletListCase,
    ordered_list: orderedListCase,
    table: tableCase,
    code_block: codeBlockCase,
    horizontal_rule: hrCase,
    note: noteCase,
    video: videoCase,
    image: imageCase,
    drawio: svgCase,
};

export function parseASTToPDFContent(ast: ASTNode[], level = 0): any[] {
    return ast.flatMap((node) => {
        try {
            const caseHandler = casesMap[node.type];
            if (caseHandler) return caseHandler(node, level);
            return parseASTToPDFContent(node.content || [], level);
        } catch (error) {
            console.error(`Error rendering node of type '${node.type}':`, error);
            return errorCase(node);
        }
    });
}