import { ASTNode } from "../../types/ASTNode.ts";

export function inlineMdComponentCase(node: ASTNode): any {
    if (!node.attrs?.tag) {
        return { text: node.attrs?.text || '', style: 'paragraph' };
    }

    const tag = node.attrs.tag[0];

    const attributes = tag.attributes || {};
    const text = attributes.text || node.attrs?.text || '';

    return {
        table: {
            widths: ['*'],
            body: [
                [
                    {
                        text: text,
                        fontSize: 10,
                        fillColor: '#e7e7e7',
                        margin: [5, 2, 5, 2],
                        alignment: 'center',
                    },
                ],
            ],
        },
        layout: 'noBorders',
        margin: [0, 5, 0, 5],
    };
}
