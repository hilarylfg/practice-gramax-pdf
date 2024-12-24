import { ASTNode } from "../../types/ASTNode.ts";
import {addMargin} from "../cases/utils/addMargin.ts";
import {Content} from "pdfmake/interfaces";
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

const casesMap: Record<string, (node: ASTNode, level?: number) => Content> = {
    heading: headingCase,
    paragraph: paragraphCase,
    bulletList: bulletListCase,
    orderedList: orderedListCase,
    table: tableCase,
    code_block: codeBlockCase,
    horizontal_rule: hrCase,
    note: noteCase,
    video: videoCase,
    image: imageCase,
    drawio: svgCase,
};

export function parseASTToPDFContent(ast: ASTNode[], level = 0): Content[] {
    let prevNode: ASTNode | null;
    return ast.flatMap((node) => {
        try {
            const caseHandler = casesMap[node.type];
            if (caseHandler) {
                const content = caseHandler(node, level);
                const margin = addMargin(prevNode, node.type, node);
                prevNode = node;
                return margin ? [margin, content] : [content];
            }
            return parseASTToPDFContent(node.content || [], level);
        } catch (error) {
            return errorCase(node);
        }
    });
}