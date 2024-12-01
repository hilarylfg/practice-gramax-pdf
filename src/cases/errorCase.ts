import {ASTNode} from "../../types/ASTNode.ts";

const titleErrors: { [key: string]: string } = {
    'drawio': 'диаграмма',
    'image': 'изображение',
    'video': 'видео',
    'note': 'заметка',
    'table': 'таблица',
    'bullet_list': 'список',
    'ordered_list': 'список',
    'heading': 'заголовок',
    'code_block': 'код',
    'horizontal_rule': 'горизонтальная линия',
    'paragraph': 'параграф',
};

export function errorCase(node: ASTNode): any {
    return {
        table: {
            widths: ['*'],
            body: [[{
                fillColor: "#ffebeb",
                stack: [
                    {
                        text: `Не удалось обработать компонент: ${titleErrors[node.type]}` || '',
                        style: 'noteTitle',
                        color: '#ff8080',
                        margin: [10, 5, 0, 0],
                    },
                ],
                border: true,
                borderColor: '#ff8080',
            }]],
        },
        margin: [0, 10, 0, 10],
    };
}