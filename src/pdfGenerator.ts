import pdfMake from 'pdfmake/build/pdfmake';
import vfs from 'pdfmake/build/vfs_fonts';
import { ASTNode } from './types/ASTNode';

pdfMake.vfs = vfs;

function parseASTToPDFContent(ast: ASTNode[], level = 0): any[] {
    return ast.flatMap((node) => {
        const content = node.content || [];
        switch (node.type) {
            case 'heading':
                return { text: extractText(node), style: `header${node.attrs?.level || 1}` };
            case 'paragraph':
                return { text: extractText(node), style: 'paragraph' };
            case 'bullet_list':
                return { ul: content.map((item) => parseListItem(item, level + 1)) };
            case 'ordered_list':
                return { ol: content.map((item) => parseListItem(item, level + 1)) };
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
                                style: 'codeBlock',
                                fillColor: '#aaa',
                                margin: [20, 15, 20, 15],
                            },
                        ]],
                    },
                    layout: 'noBorders',
                };
            case 'quote':
                return { text: extractText(node), style: 'quote' };
            case 'horizontal_rule':
                return { canvas: [{ type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1 }], style: 'hr' };
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
        const text: any = { text: node.text || '' };
        node.marks?.forEach((mark) => {
            if (mark.type === 'strong') text.bold = true;
            if (mark.type === 'em') text.italics = true;
            if (mark.type === 'link') Object.assign(text, {
                color: 'blue',
                decoration: 'underline',
                link: mark.attrs?.href || '#',
            });
            if (mark.type === 'code') Object.assign(text, { background: '#aaa', fontSize: 11 });
        });
        return text;
    }
    return node.content?.map(extractText) || '';
};

export function generatePDF(ast: ASTNode[]): void {
    const docDefinition: any = {
        content: parseASTToPDFContent(ast),
        styles: {
            header1: { fontSize: 24, bold: true, margin: [0, 10, 0, 5] },
            header2: { fontSize: 20, bold: true, margin: [0, 10, 0, 5] },
            header3: { fontSize: 18, bold: true, margin: [0, 8, 0, 4] },
            header4: { fontSize: 16, bold: true, margin: [0, 6, 0, 3] },
            paragraph: { fontSize: 12, margin: [0, 5, 0, 5], color: '#333' },
            unorderedList: { fontSize: 12, margin: [10, 5, 0, 5], color: '#333' },
            orderedList: { fontSize: 12, margin: [10, 5, 0, 5], color: '#333' },
            table: { margin: [0, 10, 0, 10] },
            tableHeader: { fontSize: 12, bold: true, fillColor: '#eeeeee', margin: [5, 5, 5, 5] },
            tableCell: { fontSize: 12, margin: [5, 5, 5, 5] },
            codeBlock: { fontSize: 11, background: '#aaa', width: '100%', padding: 20 },
            quote: { fontSize: 12, italics: true, color: '#555', margin: [10, 5, 10, 5] },
            note: { fontSize: 12, bold: true, color: '#00529B', margin: [0, 5, 0, 5] },
            tip: { fontSize: 12, color: '#4CAF50', margin: [0, 5, 0, 5], bold: true },
            danger: { fontSize: 12, color: '#D8000C', margin: [0, 5, 0, 5], bold: true },
            hr: { margin: [0, 10, 0, 10] },
            image: { alignment: 'center', margin: [0, 10, 0, 10] },
        } as any,
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('output.pdf');
}