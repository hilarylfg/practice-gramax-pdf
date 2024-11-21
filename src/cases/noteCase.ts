import {ASTNode} from "../../types/ASTNode.ts";
import {parseASTToPDFContent} from "../utils/parseAST.ts";

const borderColors: { [key: string]: string } = {
    tip: '#00aaff',
    danger: '#ff8080',
    note: '#ec980c',
    quote: '#7b7b7b',
    lab: '#8f7ee7',
    info: '#8ca6d9',
    hotfixes: '#7b7b7b',
};

const bgColors: { [key: string]: string } = {
    tip: '#ecf4f9',
    danger: '#ffebeb',
    note: '#fff6e7',
    lab: '#f3f0ff',
    info: '#e6eeff',
    hotfixes: '#f4f4f4',
    quote: '#f4f4f4',
};

const extractNoteText = (node: ASTNode): string => {
    if (node.type === 'text') {
        return node.text || '';
    }
    return node.content?.map(extractNoteText).join('') || '';
};

export function noteCase(node: ASTNode, level = 0, parseContent = parseASTToPDFContent): any {
    const noteType = node.attrs?.type || 'note';
    const borderColor = borderColors[noteType] || '#7b7b7b'
    const bgColor = bgColors[noteType] || '';

    const contentStyle = {
        style: 'noteContent',
        margin: [10, 5, 10, 5],
    };

    const content = parseContent(node.content || [], level).map((item) => ({
        ...item,
        ...contentStyle,
    }));

    return {
        table: {
            widths: ['*'],
            body: [[{
                fillColor: bgColor,
                stack: [
                    {
                        text: node.attrs?.title || '',
                        style: 'noteTitle',
                        color: borderColor,
                        margin: [10, 5, 0, 0],
                    },
                    ...content,
                ],
                border: [true, false, false, false],
                borderColor: [borderColor, 0, 0, 0],
            }]],
        },
        margin: [0, 10, 0, 10],
    };
}