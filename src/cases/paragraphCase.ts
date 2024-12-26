import {ASTNode} from '../../types/ASTNode';
import {ContentText} from "pdfmake/interfaces";
import {extractText} from "./utils/extractTextForCases.ts";

export function paragraphCase(node: ASTNode): ContentText {
    const content = (node.content || []).map((item) =>
        item?.type === 'text' ? extractText(item) : undefined);
    return {
        text: content.filter((item) => item !== undefined),
        lineHeight: 1.4
    };
}