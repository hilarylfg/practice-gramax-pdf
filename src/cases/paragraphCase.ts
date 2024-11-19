import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./extractTextForCases.ts";

export function paragraphCase(node: ASTNode): any {
    (node.content || []).map((item) => {
        if (item.marks?.some((mark) => mark.type === 'code')) {
            return {
                text: extractText(node) || '',
                style: 'inlineCodeBlock',
                background: '#f5f5f5',
            };
        }
        return { text: item.text || '' };
    });

    return { text: extractText(node), style: 'paragraph', margin: [0, 5, 0, 5] };
}