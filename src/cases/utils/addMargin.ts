import {ASTNode} from "../../../types/ASTNode.ts";
import {ContentText} from "pdfmake/interfaces";

const marginConfig: { [key: string]: { top?: number; bottom?: number } } = {
    heading: {top: 24, bottom: 12},
    paragraph: {bottom: 10},
    bulletList: {bottom: 12},
    orderedList: {bottom: 12},
    table: {top: 16, bottom: 16},
    code_block: {top: 12, bottom: 12},
    horizontal_rule: {top: 32, bottom: 32},
    note: {top: 16, bottom: 16},
    video: {top: 8, bottom: 8},
    image: {top: 8, bottom: 8},
    drawio: {top: 16, bottom: 16},
    code: {top: 26, bottom: 26},
};

const headingMargins: { [key: number]: { top?: number; bottom?: number } } = {
    1: {bottom: 12},
    2: {top: 24, bottom: 12},
    3: {top: 20, bottom: 10},
    4: {top: 16, bottom: 8},
};

const LINE_HEIGHT_CORRECTION = 5;

export function addMargin(prevNode: ASTNode | null, currentType: string, currentNode?: ASTNode): ContentText | null {
    if (!prevNode) {
        return null;
    }
    let currentMargin = marginConfig[currentType] || {top: 0, bottom: 0};
    let prevMargin = marginConfig[prevNode.type] || {top: 0, bottom: 0};

    if (currentType === 'heading' && currentNode?.attrs?.level) {
        const level = currentNode.attrs.level;
        currentMargin = headingMargins[level];
    }

    if (prevNode.type === "heading") {
        prevMargin = headingMargins[prevNode.attrs?.level || 1] || {top: 0, bottom: 0};
    }

    const prevBottom = prevMargin.bottom || 0;
    const currentTop = currentMargin.top || 0;

    let topMargin = Math.max(prevBottom, currentTop) - LINE_HEIGHT_CORRECTION;

    return {
        text: '',
        margin: [0, topMargin, 0, 0],
    };
}