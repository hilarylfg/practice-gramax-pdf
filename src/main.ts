import * as pdfMake from 'pdfmake/build/pdfmake';
import * as vfs from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = vfs;

function htmlToPdfMake(content: string) {
    const docDefinition: any = {
        content: [],
        styles: {
            heading1: {
                fontSize: 18,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            heading2: {
                fontSize: 16,
                bold: true,
                margin: [0, 5, 0, 5],
            },
            normal: {
                fontSize: 12,
                margin: [0, 5, 0, 5],
            },
            list: {
                fontSize: 12,
                margin: [0, 5, 0, 5],
            },
            code: {
                fontSize: 10,
                italics: true,
                margin: [0, 5, 0, 5],
                background: '#313548',
                padding: [5, 10],
            },
            blockquote: {
                fontSize: 12,
                italics: true,
                margin: [0, 5, 0, 5],
            }
        }
    };

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');

    doc.body.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            switch (element.tagName.toLowerCase()) {
                case 'h1':
                    docDefinition.content.push({ text: element.innerText, style: 'heading1' });
                    break;
                case 'h2':
                    docDefinition.content.push({ text: element.innerText, style: 'heading2' });
                    break;
                case 'p':
                    docDefinition.content.push({ text: element.innerText, style: 'normal' });
                    break;
                case 'ul':
                    const listItems: Array<{ text: string, style: string }> = [];
                    element.querySelectorAll('li').forEach((li) => {
                        listItems.push({ text: `- ${li.innerText}`, style: 'list' });
                    });
                    docDefinition.content.push(...listItems);
                    break;
                case 'pre':
                    docDefinition.content.push({ text: element.innerText, style: 'code' });
                    break;
                case 'blockquote':
                    docDefinition.content.push({ text: `> ${element.innerText}`, style: 'blockquote' });
                    break;
                default:
                    docDefinition.content.push({ text: element.innerText, style: 'normal' });
                    break;
            }
        }
    });

    return docDefinition;
}

document.getElementById("generate-btn")?.addEventListener("click", () => {
    const htmlContent = `
        <h1>Заголовок 1</h1>
        <p>Это обычный текст с кириллицей.</p>
        <h2>Заголовок 2</h2>
        <p>Элемент списка:</p>
        <ul>
            <li>Элемент 1</li>
            <li>Элемент 2</li>
        </ul>
        <pre><code class="language-javascript">console.log('Hello, world!');</code></pre>
        <blockquote>Это заметка.</blockquote>
    `;

    const docDefinition = htmlToPdfMake(htmlContent);

    pdfMake.createPdf(docDefinition).download('example.pdf');
});
