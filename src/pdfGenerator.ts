import pdfMake from 'pdfmake/build/pdfmake';
import vfs from 'pdfmake/build/vfs_fonts';
import {ASTNode} from './types/ASTNode';

pdfMake.vfs = vfs;

function parseASTToPDFContent(ast: ASTNode[], level = 0): any[] {
    return ast.flatMap((node) => {
        const content = node.content || [];
        switch (node.type) {
            case 'heading':
                return {text: extractText(node), style: `header${node.attrs?.level || 1}`};
            case 'paragraph':
                return {text: extractText(node), style: 'paragraph'};
            case 'bullet_list':
                return {ul: content.map((item) => parseListItem(item, level + 1))};
            case 'ordered_list':
                return {ol: content.map((item) => parseListItem(item, level + 1))};
            case 'table':
                return {
                    table: {
                        body: parseTable(content),
                    },
                    style: 'table',
                    layout: {
                        hLineWidth: (rowIndex: number, node: any) =>
                            rowIndex === 0 || rowIndex === node.table.body.length ? 0 : 1,
                        vLineWidth: (colIndex: number, node: any) =>
                            colIndex === 0 || colIndex === node.table.widths.length ? 0 : 1,
                        hLineColor: () => '#111',
                        vLineColor: () => '#111',
                    },
                };
            case 'code_block':
                return {
                    table: {
                        widths: ['*'],
                        body: [[{
                            text: extractText(node),
                            fontSize: 10,
                            fillColor: '#ededed',
                            margin: [20, 15, 20, 15],
                        },]],
                    },
                    layout: 'noBorders',
                };
            case 'horizontal_rule':
                return {canvas: [{type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1}], style: 'hr'};
            case 'note':
                const noteType = node.attrs?.type || 'note';
                const borderColor = {
                    tip: '#00aaff',
                    danger: '#ff8080',
                    note: '#ec980c',
                    quote: '#7b7b7b',
                    lab: '#8f7ee7',
                    info: '#8ca6d9',
                    hotfixes: '#7b7b7b',
                }[noteType] || '#7b7b7b';

                const bgColor = {
                    tip: '#ecf4f9',
                    danger: '#ffebeb',
                    note: '#fff6e7',
                    lab: '#f3f0ff',
                    info: '#e6eeff',
                }[noteType] || '';

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
                                {
                                    text: extractNoteText(node),
                                    style: 'noteContent',
                                    margin: [10, 5, 0, 10],
                                }
                            ],
                            border: [true, false, false, false],
                            borderColor: [borderColor, 0, 0, 0],
                        }]],
                    },
                    margin: [0, 10, 0, 10],
                };
            case 'video':
                return {
                    stack: [
                        {
                            text: 'Video',
                            link: node.attrs?.path,
                            color: '#007BFF',
                            decoration: 'underline',
                        },
                        { text: node.attrs?.title || '', margin: [0, 0, 0, 5] },
                    ],
                    margin: [0, 5, 0, 5],
                }
            default:
                return parseASTToPDFContent(content, level);
        }
    });
}

const parseListItem = (node: ASTNode, level: number) => ({
    stack: parseASTToPDFContent(node.content || [], level),
    margin: [2 * level, 5, 0, 0],
});

const parseTable = (rows: ASTNode[]) =>
    rows.map((row) => row.content?.map((cell) => ({
        stack: parseASTToPDFContent(cell.content || []),
        style: 'tableCell',
    })) || []);

const extractText = (node: ASTNode): any => {
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
            if (mark.type === 'code') Object.assign(text, {background: '#ededed', fontSize: 11});
        });
        return text;
    }
    return node.content?.map(extractText) || '';
};

const extractNoteText = (node: ASTNode): string => {
    if (node.type === 'text') {
        return node.text || '';
    }
    return node.content?.map(extractNoteText).join('') || '';
};

export function generatePDF(ast: ASTNode[]): void {
    const docDefinition: any = {
        content: parseASTToPDFContent(ast),
        styles: {
            header1: {fontSize: 24, bold: true, margin: [0, 10, 0, 5]},
            header2: {fontSize: 20, bold: true, margin: [0, 10, 0, 5]},
            header3: {fontSize: 18, bold: true, margin: [0, 8, 0, 4]},
            header4: {fontSize: 16, bold: true, margin: [0, 6, 0, 3]},
            paragraph: {fontSize: 12, margin: [0, 5, 0, 5], color: '#333'},
            unorderedList: {fontSize: 12, margin: [10, 5, 0, 5], color: '#333'},
            orderedList: {fontSize: 12, margin: [10, 5, 0, 5], color: '#333'},
            table: {margin: [0, 10, 0, 10]},
            tableHeader: {fontSize: 12, bold: true, fillColor: '#eeeeee', margin: [5, 5, 5, 5]},
            tableCell: {fontSize: 12, margin: [5, 5, 5, 5]},
            noteTitle: {fontSize: 14, bold: true, margin: [0, 5, 0, 5]},
            noteContent: {fontSize: 12, color: '#333'},
            hr: {margin: [0, 10, 0, 10]},
            inlineComponent: {fontSize: 12, bold: true, color: '#007BFF'},
            iconStyle: {fontSize: 14, bold: true},
        } as any,
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('output.pdf');
}