import {ASTNode} from "../../types/ASTNode.ts";

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
        });
        return text;
    }
    return node.content?.map(extractText) || '';
};