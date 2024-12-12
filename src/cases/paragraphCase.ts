import { ASTNode } from '../../types/ASTNode';
import { extractText } from "./utils/extractTextForCases.ts";
import { inlineMdComponentCase } from "./inlineMdComponentCase.ts";

export function paragraphCase(node: ASTNode): any {
    const content = (node.content || []).map((item) => {
        if (item.type === "inlineMd_component") {
            console.log('inlineMd_component', item);
            return inlineMdComponentCase(item);
        }
        if (item.type === 'text') {
            return extractText(item);
        }
        return null; // Если тип не распознан, возвращаем null
    }).filter(Boolean); // Убираем null из массива

    // Проверяем, есть ли в контенте таблицы или другие сложные структуры
    const isTableContent = content.some((item) => item.table || item.stack);

    if (isTableContent) {
        // Если есть таблицы или сложные структуры, используем stack
        return {
            stack: content,
            margin: [0, 5, 0, 5],
        };
    }

    // Если контент состоит только из текста и inlineMd_component, объединяем их в одну строку
    return {
        text: content.reduce((acc, item) => {
            if (item.text) {
                // Если это текст, добавляем его к аккумулятору
                acc.push(item.text);
            } else if (item.stack) {
                // Если это stack, добавляем его к аккумулятору
                acc.push(...item.stack);
            } else {
                // Возвращаем остальные элементы
                acc.push(item);
            }
            return acc;
        }, []), // Сглаживаем массив, чтобы избежать вложенности
        margin: [0, 5, 0, 5],
    };
}