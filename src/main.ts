import { generatePDF } from './pdfGenerator';
import { ASTNode } from '../types/ASTNode';
import { convertImagesToBase64 } from "./cases/convertImagesToBase64";

async function processAndGeneratePDF(ast: ASTNode[]): Promise<void> {
    await convertImagesToBase64(ast);
    generatePDF(ast);
}

document.getElementById('generate-btn')?.addEventListener('click', async () => {
    const response = await fetch('/content.json');
    const data: { content: ASTNode[] } = await response.json();

    processAndGeneratePDF(data.content)
});
