import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";
import {inlineMdComponentCase} from "./inlineMdComponentCase.ts";

export function paragraphCase(node: ASTNode): any {
    const content = (node.content || []).map((item) => {
        if (item.type === "inlineMd_component") {
            console.log('inlineMd_component', item);
            return inlineMdComponentCase(item);
        }
        if (item.type === 'text') {
            return extractText(item);
        }
    });
    const isTableContent = content.some((item) => item.table);

    if (isTableContent) {
        return {
            stack: content,
        };
    }

    return {
        text: content,
        margin: [0, 5, 0, 5],
    };
}