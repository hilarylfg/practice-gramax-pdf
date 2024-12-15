import { ASTNode } from '../../types/ASTNode';
import { extractText } from "./utils/extractTextForCases.ts";
import { inlineMdComponentCase } from "./inlineMdComponentCase.ts";

export function paragraphCase(node: ASTNode): any {
    const content = (node.content || []).map((item) => {
        if (item.type === "inlineMd_component") {
            return inlineMdComponentCase(item);
        }
        if (item.type === 'text') {
            return extractText(item);
        }
    });

    const isTableContent = content.some((item) => item.table || item.stack);

    if (isTableContent) {
        return {
            stack: content,
        };
    }

    return {
        text: content,
        lineHeight: 1
    };
}