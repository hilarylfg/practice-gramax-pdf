import {ASTNode} from "../../types/ASTNode.ts";
import {icons} from "../utils/icons.ts";

export function inlineMdComponentCase(node: ASTNode): any {
    if (!node.attrs?.tag) {
        return {text: node.attrs?.text || '', style: 'paragraph'};
    }

    const tag = node.attrs.tag[0];
    const attributes = tag.attributes || {};
    const text = attributes.text || node.attrs?.text || '';

    switch (tag.name) {
        case 'Cmd':
            return {
                text: text,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };

        case 'Kbd':
            return {
                text: text,
                fontSize: 10,
                fillColor: '#f0f0f0',
                margin: [5, 2, 5, 2],
                decoration: 'underline',
            };

        case 'Alfa':
            return {
                text: text,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
                background: '#ff3131',
            };

        case 'Beta':
            return {
                text: text,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
                background: '#ffc833',
            };

        case 'Issue':
            return {
                stack: [
                    {
                        text: `Issue: ${attributes.id}`,
                        fontSize: 10,
                        fillColor: '#e7e7e7',
                        margin: [5, 2, 5, 2],
                    },
                    {
                        svg: icons.issue,
                        width: 16,
                        height: 16,
                        margin: [5, 2, 5, 2],
                    },
                ],
                margin: [0, 5, 0, 5],
            };

        case 'Module':
            return {
                text: `Module: ${attributes.id}`,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };

        case 'Who':
            return {
                text: `Who: ${text}`,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };

        case 'When':
            return {
                text: `When: ${text}`,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };

        case 'Formula':
            return {
                text: "",
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };

        case 'Term':
            return {
                text: `Term: ${attributes.title}`,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };

        case 'Color':
            return {
                text: text,
                fontSize: 10,
                color: attributes.color,
                margin: [5, 2, 5, 2],
            };

        default:
            return {
                text: text,
                fontSize: 10,
                fillColor: '#e7e7e7',
                margin: [5, 2, 5, 2],
            };
    }
}