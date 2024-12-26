import pdfMake from 'pdfmake/build/pdfmake';
import {ASTNode} from '../../types/ASTNode.ts';
import {parseASTToPDFContent} from "./parseAST.ts";
import {vfs} from "../fonts/vfs_fonts.ts";
import {Content, Style} from "pdfmake/interfaces";

interface PDFDocDefinition {
    content: Content;
    footer?: (currentPage: number, pageCount: number) => Content | string;
    header?: (currentPage: number, pageCount: number) => Content | string;
    styles?: Record<string, Style>;
}

pdfMake.vfs = vfs;
pdfMake.fonts = {
    Roboto: {
        normal: 'Roboto-Light.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-LightItalic.ttf',
        bolditalics: 'Roboto-Italic.ttf',
    },
    RobotoRegular: {
        normal: 'Roboto-Regular.ttf',
    },
    RobotoMono: {
        normal: 'RobotoMono-Thin.ttf',
    },
    Consolas: {
        normal: 'Consolas.ttf',
    }
};

export function generatePDF(ast: ASTNode[]): void {
    const docDefinition: PDFDocDefinition = {
        content: parseASTToPDFContent(ast),
        header: () => {
            return {
                text: "Название каталога",
                fontSize: 10,
                margin: [3, 3, 0, 0]
            };
        },
        footer: (currentPage: number, pageCount: number) => {
            return {
                text: `Страница ${currentPage} из ${pageCount}`,
                alignment: 'center',
                fontSize: 10,
                margin: [0, 10, 0, 0]
            };
        },
        styles: {
            header1: {fontSize: 24},
            header2: {fontSize: 21},
            header3: {fontSize: 18},
            header4: {fontSize: 14},
        }
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('output.pdf');
}