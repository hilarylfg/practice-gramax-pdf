import {ASTNode} from '../../types/ASTNode';
import {extractText} from "./utils/extractTextForCases.ts";
import {ContentText} from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";

export function headingCase(node: ASTNode): ContentText {
    const level = node.attrs?.level;

    if (!level || level < 1 || level > 4) {
        return errorCase(node) as never;
    }

    return {
        text: extractText(node),
        style: `header${level}`,
        font: 'RobotoRegular',
        lineHeight: 1.4,
    };
}
