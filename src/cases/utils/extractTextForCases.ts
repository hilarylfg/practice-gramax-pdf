import {ASTNode} from "../../../types/ASTNode.ts";

export const extractText = (node: ASTNode): any => {
    if (node.type === 'text') {
        let text: any = {text: node.text || ''};
        node.marks?.forEach((mark) => {
            if (mark.type === 'strong') text.bold = true;
            if (mark.type === 'em') text.italics = true;
            if (mark.type === 'link') Object.assign(text, {
                color: 'blue',
                decoration: 'underline',
                link: mark.attrs?.href || '#',
            });
            if (mark.type === 'code') {
                Object.assign(text, {
                    background: '#ededed',
                    fontSize: 10,
                    margin: [0, 10, 0, 15],
                    lineHeight: 1,
                    font: 'Consolas',
                    color: '#111111'
                });
            }
        });
        return text;
    }
    return node.content?.map(extractText) || '';
};