import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";

export function headingCase(node: ASTNode): any {
    return {
        text: extractText(node),
        style: `header${node.attrs?.level || 1}`,
        font: 'RobotoRegular',
    };
}