import { ASTNode } from "../../types/ASTNode.ts";
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
    errorCase,
    svgCase,
} from "../cases";
import {addMargin} from "../cases/utils/addMargin.ts";

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
    let prevType: string | null = null;

    return ast.flatMap((node) => {
        try {
            const caseHandler = casesMap[node.type];
            if (caseHandler) {
                const content = caseHandler(node, level);
                const margin = addMargin(prevType, node.type, node);

                prevType = node.type;
                return margin ? [margin, content] : [content];
            }

            return parseASTToPDFContent(node.content || [], level);
        } catch (error) {
            console.error(`Error rendering node of type '${node.type}':`, error);
            return errorCase(node);
        }
    });
}