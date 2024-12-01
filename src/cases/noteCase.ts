import {ASTNode} from "../../types/ASTNode.ts";
import {parseASTToPDFContent} from "../utils/parseAST.ts";
import {icons} from "../utils/icons.ts";

const borderColors: { [key: string]: string } = {
    tip: '#00aaff',
    danger: '#ff8080',
    note: '#ec980c',
    quote: '#7b7b7b',
    lab: '#8f7ee7',
    info: '#4366ad',
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

const noteIcons: { [key: string]: string } = {
    tip: 'tip',
    danger: 'danger',
    note: 'note',
    quote: 'quote',
    lab: 'lab',
    info: 'info',
    hotfixes: 'hotfixes',
};

const extractNoteText = (node: ASTNode): string => {
    if (node.type === 'text') {
        return node.text || '';
    }
    return node.content?.map(extractNoteText).join('') || '';
};

export function noteCase(node: ASTNode, level = 0, parseContent = parseASTToPDFContent): any {
    const noteType = node.attrs?.type || 'note';
    const borderColor = borderColors[noteType] || '#7b7b7b';
    const bgColor = bgColors[noteType] || '';
    let icon = noteIcons[noteType] || '';

    if (node.attrs?.title === "Подробнее" && 'chevron-down') icon = 'chevron-down';

    const contentStyle = {
        style: 'noteContent',
    };

    const content = parseContent(node.content || [], level).map((item) => ({
        ...item,
        ...contentStyle,
    }));

    const titleOrContent = node.attrs?.title
        ? { text: node.attrs?.title, style: 'noteTitle', color: borderColor }
        : content[0];

    return {
        table: {
            widths: ['*'],
            body: [[{
                margin: 16,
                fillColor: bgColor,
                stack: [
                    {
                        columns: [
                            {
                                svg: icons[icon],
                                width: 14,
                                height: 14,
                            },
                            {
                                ...titleOrContent,
                                margin: node.attrs?.title ? [8, 0, 0, 12] : [8, 0, 0, 0],
                            },
                        ],
                    },
                    ...(!node.attrs?.title ? content.slice(1) : content),
                ],
                border: [true, false, false, false],
                borderColor: [borderColor, 0, 0, 0],
            }]],
        },
        margin: [0, 10, 0, 10],
    };
}