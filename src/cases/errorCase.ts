import {ASTNode} from "../../types/ASTNode.ts";
import {icons} from "../utils/icons.ts";
import {ContentTable} from "pdfmake/interfaces";
import {Config} from "../utils/config.ts";

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

export function errorCase(node: ASTNode): ContentTable {
    return {
        table: {
            dontBreakRows: true,
            widths: ['*'],
            body: [
                [
                    {
                        margin: [Config.baseFontSize * 0.75, Config.baseFontSize * 0.75, Config.baseFontSize * 0.75, (Config.baseFontSize * 0.75) - Config.baseLineHeightMargin],
                        fillColor: "#ffebeb",
                        border: [true, true, true, true],
                        borderColor: ["#ffc7c7", "#ffc7c7", "#ffc7c7", "#ffc7c7"],
                        stack: [
                            {
                                columns: [
                                    {
                                        svg: icons.error,
                                        width: Config.baseFontSize * 0.875,
                                        height: Config.baseFontSize * 0.875,
                                    },
                                    {
                                        text: `Не удалось обработать компонент: ${titleErrors[node.type] || node.type}`,
                                        lineHeight: Config.baseLineHeight,
                                        fontSize: Config.baseFontSize * 0.75,
                                        bold: true,
                                        color: "#ba1c1c",
                                        margin: [Config.baseFontSize * 0.5, 0, 0, 0],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            ],
        },
        margin: [0, 0, 0, Config.baseFontSize * 0.5],
    };
}