import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";

export function paragraphCase(node: ASTNode): any {
    return {
        text: extractText(node),
        style: `paragraph`,
    };
}