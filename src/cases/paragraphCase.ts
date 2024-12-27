import {ASTNode} from '../../types/ASTNode';
import {ContentText} from "pdfmake/interfaces";
import {extractText} from "./utils/extractTextForCases.ts";
import {Config} from "../utils/config.ts";

export function paragraphCase(node: ASTNode): ContentText {
    const content = (node.content || []).map((item) =>
        item?.type === 'text' ? extractText(item) : undefined);
    return {
        text: content.filter((item) => item !== undefined),
        fontSize: Config.baseFontSize * 0.75,
        lineHeight: Config.baseLineHeight
    };
}