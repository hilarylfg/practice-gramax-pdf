import pdfMake from 'pdfmake/build/pdfmake';
import vfs from 'pdfmake/build/vfs_fonts';
import { ASTNode } from './types/ASTNode';

pdfMake.vfs = vfs;

function parseASTToPDFContent(ast: ASTNode[]): any[] {
    const pdfContent: any[] = [];

    ast.forEach((node) => {
        switch (node.type) {
            case 'heading':
                const level = node.attrs?.level || 1;
                pdfContent.push({
                    text: extractTextContent(node),
                    style: level === 1 ? 'header1' : level === 2 ? 'header2' : 'header3',
                });
                break;

            case 'paragraph':
                pdfContent.push({
                    text: extractTextContent(node),
                    style: 'paragraph',
                });
                break;

            case 'bullet_list':
            case 'ordered_list':
                pdfContent.push({
                    [node.type === 'bullet_list' ? 'ul' : 'ol']: (node.content || []).map((item) => extractTextContent(item)),
                    style: 'list',
                });
                break;

            case 'table':
                pdfContent.push({
                    table: {
                        body: node.content?.map((row) => row.content?.map((cell) => ({
                            text: extractTextContent(cell),
                            style: 'tableCell',
                        }))) || [],
                    },
                    style: 'table',
                });
                break;

            case 'code_block':
                pdfContent.push({
                    text: extractTextContent(node),
                    style: 'code',
                });
                break;

            case 'quote':
                pdfContent.push({
                    text: extractTextContent(node),
                    style: 'quote',
                });
                break;

            case 'text':
                pdfContent.push({
                    text: node.text || '',
                    style: 'text',
                });
                break;

            case 'horizontal_rule':
                pdfContent.push({
                    canvas: [{ type: 'line', x1: 0, y1: 5, x2: 500, y2: 5, lineWidth: 1 }],
                    style: 'hr',
                });
                break;

            default:
                break;
        }
    });

    return pdfContent;
}

function extractTextContent(node: ASTNode): string {
    if (node.text) {
        return node.text;
    }

    if (node.content && node.content.length > 0) {
        return node.content.map(extractTextContent).join(' ');
    }

    return '';
}

export function generatePDF(ast: ASTNode[]): void {
    const docDefinition: any = {
        content: parseASTToPDFContent(ast),
        styles: {
            header2: { fontSize: 20, bold: true, margin: [0, 10, 0, 5] },
            header3: { fontSize: 18, bold: true, margin: [0, 8, 0, 4] },
            header4: { fontSize: 16, bold: true, margin: [0, 6, 0, 3] },
            paragraph: { fontSize: 12, margin: [0, 5, 0, 5], color: '#333' },
            bold: { bold: true },
            italic: { italics: true },
            link: { color: 'blue', decoration: 'underline' },
            inlineCode: { font: 'Courier', background: '#f2f2f2', fontSize: 11 },
            unorderedList: { fontSize: 12, margin: [10, 5, 0, 5], color: '#333' },
            orderedList: { fontSize: 12, margin: [10, 5, 0, 5], color: '#333' },
            table: { margin: [0, 10, 0, 10] },
            tableHeader: { fontSize: 12, bold: true, fillColor: '#eeeeee', margin: [5, 5, 5, 5] },
            tableCell: { fontSize: 12, margin: [5, 5, 5, 5] },
            codeBlock: { font: 'Courier', fontSize: 11, background: '#f2f2f2', margin: [0, 5, 0, 5] },
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