export interface ASTNode {
    type: string;
    attrs?: {
        level?: number; // Для заголовков
        id?: string | null; // Уникальный идентификатор
        isCustomId?: boolean; // Индивидуальный идентификатор
        href?: string; // Ссылка
        src?: string; // Источник
        width?: number; // Ширина
        height?: number; // Высота
        type?: string; // Тип
        title?: string; // Заголовок
        path?: string; // Путь
        text?: string; // Текстовое содержимое
        colspan?: number; // Объединение ячеек по столбцам
        rowspan?: number; // Объединение ячеек по строкам
        colwidth?: number[] | null; // Ширина столбца
    };
    content?: ASTNode[]; // Вложенные элементы
    text?: string; // Текстовое содержимое узла
    marks?: { // Форматирование текста
        type: 'strong' | 'em' | 'link' | 'code'; // Типы форматирования
        attrs?: {
            href?: string; // Ссылка для типа link
        };
    }[];
}
