import {ASTNode} from "../../../types/ASTNode.ts";

const marginConfig: { [key: string]: { top?: number; bottom?: number } } = {
    heading: { top: 24, bottom: 12 },
    paragraph: {bottom: 8},
    bullet_list: {bottom: 11.8},
    ordered_list: {bottom: 11.8},
    table: {top: 16, bottom: 16},
    code_block: {top: 28.8, bottom: 28.8},
    horizontal_rule: {top: 32, bottom: 32},
    note: {top: 16, bottom: 16},
    video: {top: 8, bottom: 8},
    image: {top: 8, bottom: 8},
    drawio: {top: 16, bottom: 16},
    code: { top: 26, bottom: 26 },
};

const headingMargins: { [key: number]: { top: number; bottom: number } } = {
    2: { top: 25.6, bottom: 12.8 },
    3: { top: 20.8, bottom: 10.4 },
    4: { top: 17.6, bottom: 8.8 },
};


export function addMargin(prevType: string | null, currentType: string, currentNode?: ASTNode): any | null {
    if (!prevType) {
        return null;
    }
    let currentMargin = marginConfig[currentType] || {};
    if (currentType === 'heading' && currentNode?.attrs?.level) {
        const level = currentNode.attrs.level;
        currentMargin = headingMargins[level] || marginConfig.heading;
    }

    const prevMargin = marginConfig[prevType] || {};
    const prevBottom = prevMargin.bottom || 0;
    const currentTop = currentMargin.top || 0;

    const topMargin = Math.max(prevBottom, currentTop);

    return {
        text: '',
        margin: [0, topMargin, 0, 0],
    };
}