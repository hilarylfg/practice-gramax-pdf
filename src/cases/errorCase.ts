import { ASTNode } from "../../types/ASTNode.ts";
import { icons } from "../utils/icons.ts";

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
            body: [
                [
                    {
                        margin: 16,
                        fillColor: "#ffebeb",
                        border: true,
                        borderColor: "#ffc7c7",
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
                                        bold: true,
                                        color: "#ba1c1c",
                                        margin: [8, 0, 0, 0],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            ],
        },
    };
}