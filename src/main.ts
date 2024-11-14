import { generatePDF } from './pdfGenerator';
import { ASTNode } from './types/ASTNode';

document.getElementById('generate-btn')?.addEventListener('click', async () => {
    const response = await fetch('/content.json');
    const data: { content: ASTNode[] } = await response.json();

    generatePDF(data.content);
});
