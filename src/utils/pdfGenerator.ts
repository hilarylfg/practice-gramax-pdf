import pdfMake from 'pdfmake/build/pdfmake';
import {ASTNode} from '../../types/ASTNode.ts';
import {parseASTToPDFContent} from "./parseAST.ts";
import {vfs} from "../fonts/vfs_fonts.ts";
import {Content, Style} from "pdfmake/interfaces";
import {Config} from "./config.ts";

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
                fontSize: Config.baseFontSize * 0.625,
                margin: [3, 3, 0, 0]
            };
        },
        footer: (currentPage: number, pageCount: number) => {
            return {
                text: `Страница ${currentPage} из ${pageCount}`,
                alignment: 'center',
                fontSize: Config.baseFontSize * 0.625,
                margin: [0, 10, 0, 0]
            };
        },
        styles: {
            header1: {fontSize: Config.baseFontSize * 1.5},
            header2: {fontSize: Config.baseFontSize * 1.3125},
            header3: {fontSize: Config.baseFontSize * 1.125},
            header4: {fontSize: Config.baseFontSize * 0.875},
        }
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('output.pdf');
}