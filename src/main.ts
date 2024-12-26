import { generatePDF } from './utils/pdfGenerator.ts';
import { ASTNode } from '../types/ASTNode';
import { convertImagesToBase64 } from "./utils/convertImagesToBase64.ts";

async function processAndGeneratePDF(ast: ASTNode[]): Promise<void> {
    await convertImagesToBase64(ast);
    generatePDF(ast);
}

document.getElementById('generate-btn')?.addEventListener('click', async () => {
    const response = await fetch('/test.json');
    const data: { content: ASTNode[] } = await response.json();

    processAndGeneratePDF(data.content)
});
