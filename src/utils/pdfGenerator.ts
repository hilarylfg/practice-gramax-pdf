import pdfMake from 'pdfmake/build/pdfmake';
import {ASTNode} from '../../types/ASTNode.ts';
import {parseASTToPDFContent} from "./parseAST.ts";
import {styles} from "../styles/styles.ts";
import {vfs} from "../fonts/vfs_fonts.ts";

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
    const docDefinition: any = {
        content: parseASTToPDFContent(ast),
        styles,
    };

    const pdfDoc = pdfMake.createPdf(docDefinition);
    pdfDoc.download('output.pdf');
}