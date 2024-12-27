import {ASTNode} from "../../../types/ASTNode.ts";
import {ContentText} from "pdfmake/interfaces";
import {Config} from "../../utils/config.ts";

export const extractText = (node: ASTNode): ContentText | ContentText[] => {
    if (node.type === 'text') {
        let text: ContentText = { text: node.text || '' };

        node.marks?.forEach((mark) => {
            if (mark.type === 'strong') text.bold = true;
            if (mark.type === 'em') text.italics = true;
            if (mark.type === 'link') {
                Object.assign(text, {
                    color: '#126199',
                    link: mark.attrs?.href || '#',
                });
            }
            if (mark.type === 'code') {
                Object.assign(text, {
                    background: '#ededed',
                    fontSize: Config.baseFontSize * 0.625,
                    margin: [0, Config.baseFontSize * 0.625, 0, Config.baseFontSize * 0.625],
                    lineHeight: 1,
                    font: 'Consolas',
                    color: '#111111'
                });
            }
        });
        return text;
    }
    return node.content?.map(extractText).flat() || [];
};