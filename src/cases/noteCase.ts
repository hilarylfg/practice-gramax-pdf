import { ASTNode } from "../../types/ASTNode.ts";
import { parseASTToPDFContent } from "../utils/parseAST.ts";
import { icons } from "../utils/icons.ts";
import { ContentTable, Content } from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";

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

export function noteCase(node: ASTNode, level = 0, parseContent = parseASTToPDFContent): ContentTable {
    const noteType = node.attrs?.type || 'note';
    const borderColor = borderColors[noteType] || '#7b7b7b';
    const bgColor = bgColors[noteType] || '';
    let icon = noteIcons[noteType] || '';

    if (node.attrs?.title === "Подробнее" && 'chevron-down') icon = 'chevron-down';

    const parsedContent = parseContent(node.content || [], level);
    const contentArray: Content = Array.isArray(parsedContent) ? parsedContent : [parsedContent];
    const content = contentArray.map((item) => ({
        ...item as object,
    }));

    const titleOrContent = node.attrs?.title
        ? { text: node.attrs?.title, bold: true, color: borderColor }
        : content[0];

    try {
        return {
            table: {
                dontBreakRows: true,
                widths: ['*'],
                body: [[{
                    margin: [12, 12, 12, 7],
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
                    border: [true, true, true, false],
                    borderColor: [borderColor, bgColor, bgColor, false],
                }]],
            },
        };
    }
    catch (e) {
        return errorCase(node) as never;
    }
}