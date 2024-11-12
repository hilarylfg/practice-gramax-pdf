import { generatePDF } from './pdfGenerator';
import { ContentElement } from './types/ContentElement';

document.getElementById('generate-btn')?.addEventListener('click', () => {
    const content: ContentElement[] = [
        { elementType: 'heading1', content: 'Заголовок 1' },
        { elementType: 'paragraph', content: 'Это обычный текст с кириллицей.' },
        { elementType: 'list', content: ['Элемент 1', 'Элемент 2'] },
        { elementType: 'code', content: 'console.log("Hello, world!");' },
        { elementType: 'quote', content: 'Это заметка.' },
    ];
    generatePDF(content);
});
