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
                    table: {
                        body: [[{
                            text: extractText(text.text),
                            fontSize: 10,
                            fillColor: '#ededed',
                            margin: [24, 20, 24, 20],
                        }]],
                    },
                    layout: 'noBorders',
                });
            }
        });
        return text;
    }
    return node.content?.map(extractText) || '';
};