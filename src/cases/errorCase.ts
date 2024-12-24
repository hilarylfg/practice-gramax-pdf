import { ASTNode } from "../../types/ASTNode.ts";
import { icons } from "../utils/icons.ts";
import {CaseResult} from "../../types/CasesType.ts";

const titleErrors: { [key: string]: string } = {
    'drawio': 'диаграмма',
    'image': 'изображение',
    'video': 'видео',
    'note': 'заметка',
    'table': 'таблица',
    'bulletList': 'список',
    'orderedList': 'список',
    'heading': 'заголовок',
    'code_block': 'код',
    'horizontal_rule': 'горизонтальная линия',
    'paragraph': 'параграф',
};

export function errorCase(node: ASTNode): CaseResult {
    return {
        table: {
            dontBreakRows: true,
            widths: ['*'],
            body: [
                [
                    {
                        margin: [12, 12, 12, 7],
                        fillColor: "#ffebeb",
                        border: [true, true, true, true],
                        borderColor: ["#ffc7c7", "#ffc7c7", "#ffc7c7", "#ffc7c7"],
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
                                        lineHeight: 1.4,
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