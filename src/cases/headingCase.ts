import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";
import {CaseResult} from "../../types/CasesType.ts";

export function headingCase(node: ASTNode): CaseResult {
    return {
        text: extractText(node),
        style: `header${node.attrs?.level || 1}`,
        font: 'RobotoRegular',
        lineHeight: 1.4,
    };
}