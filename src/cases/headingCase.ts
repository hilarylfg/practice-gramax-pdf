import { ASTNode } from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";
import {ContentText} from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";

export function headingCase(node: ASTNode): ContentText {
    try {
        return {
            text: extractText(node),
            style: `header${node.attrs?.level || 1}`,
            font: 'RobotoRegular',
            lineHeight: 1.4,
        };
    }
    catch (e) {
        return errorCase(node) as never;
    }
}