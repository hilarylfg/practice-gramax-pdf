import {ASTNode} from "../../types/ASTNode.ts";
import {icons} from "../utils/icons.ts";

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
                margin: 10,
                fillColor: "#ffebeb",
                stack: [
                    {
                        columns: [
                            {
                                svg: icons.error,
                                width: 14,
                                height: 14,
                            },
                            {
                                text: `Не удалось обработать компонент: ${titleErrors[node.type] || node.type}`,
                                style: 'noteTitle',
                                color: '#ff8080',
                                margin: [8, 0, 0, 0],
                            },
                        ],
                    },
                ],
                border: true,
                borderColor: '#ff8080',
            }]],
        },
        margin: [0, 10, 0, 10],
    };
}