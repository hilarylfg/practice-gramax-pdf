import {ASTNode} from "../../../types/ASTNode.ts";

const marginConfig: { [key: string]: { top?: number; bottom?: number } } = {
    heading: { top: 24, bottom: 12 },
    paragraph: {bottom: 10},
    bullet_list: {bottom: 12},
    ordered_list: {bottom: 12},
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
    2: { top: 20, bottom: 10 },
    3: { top: 16, bottom: 8 },
    4: { top: 12, bottom: 6 },
};

const LINE_HEIGHT_CORRECTION = 5;

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
    const prevBottom = (prevMargin.bottom || 0) - LINE_HEIGHT_CORRECTION;
    const currentTop = currentMargin.top || 0;

    const topMargin = Math.max(prevBottom, currentTop);

    return {
        text: '',
        margin: [0, topMargin, 0, 0],
    };
}