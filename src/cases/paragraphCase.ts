import { ASTNode } from '../../types/ASTNode';
import { extractText } from "./utils/extractTextForCases.ts";
import {CaseResult} from "../../types/CasesType.ts";

export function paragraphCase(node: ASTNode): CaseResult {
    const content = (node.content || []).map((item) => {
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
        lineHeight: 1.4
    };
}