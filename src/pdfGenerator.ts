import pdfMake from 'pdfmake/build/pdfmake';
import vfs from 'pdfmake/build/vfs_fonts';
import { ContentElement } from './types/ContentElement';

pdfMake.vfs = vfs;

export function generatePDF(content: ContentElement[]): void {
    const docDefinition = {
        content: content.map((element) => {
            switch (element.elementType) {
                case 'heading1':
                    return { text: element.content as string, fontSize: 20, bold: true };
                case 'heading2':
                    return { text: element.content as string, fontSize: 16, bold: true };
                case 'paragraph':
                    return { text: element.content as string, fontSize: 12 };
                case 'list':
                    return { ul: element.content as string[] };
                case 'code':
                    return { text: element.content as string, background: '#66635c', padding: [5, 5, 5, 5] };
                case 'quote':
                    return { text: element.content as string, italics: true };
                default:
                    return { text: element.content as string };
            }
        }),
    };
    pdfMake.createPdf(docDefinition).download('output.pdf');
}
