import {ASTNode} from "../../../types/ASTNode.ts";
import {ContentText} from "pdfmake/interfaces";
import {Config} from "../../utils/config.ts";

const marginConfig: { [key: string]: { top?: number; bottom?: number } } = {
    heading:         {top: Config.baseFontSize * 1.5,   bottom: Config.baseFontSize * 0.75},
    paragraph:       {                                  bottom: Config.baseFontSize * 0.625},
    bulletList:      {                                  bottom: Config.baseFontSize * 0.75},
    orderedList:     {                                  bottom: Config.baseFontSize * 0.75},
    table:           {top: Config.baseFontSize,         bottom: Config.baseFontSize},
    code_block:      {top: Config.baseFontSize * 0.75,  bottom: Config.baseFontSize * 0.75},
    horizontal_rule: {top: Config.baseFontSize * 2,     bottom: Config.baseFontSize * 2},
    note:            {top: Config.baseFontSize,         bottom: Config.baseFontSize},
    video:           {top: Config.baseFontSize * 0.5,   bottom: Config.baseFontSize * 0.5},
    image:           {top: Config.baseFontSize * 0.5,   bottom: Config.baseFontSize * 0.5},
    drawio:          {top: Config.baseFontSize,         bottom: Config.baseFontSize},
    code:            {top: Config.baseFontSize * 1.625, bottom: Config.baseFontSize * 1.625},
};

const headingMargins: { [key: number]: { top?: number; bottom?: number } } = {
    1: {                                 bottom: Config.baseFontSize * 0.75},
    2: {top: Config.baseFontSize * 1.5,  bottom: Config.baseFontSize * 0.75},
    3: {top: Config.baseFontSize * 1.25, bottom: Config.baseFontSize * 0.625},
    4: {top: Config.baseFontSize,        bottom: Config.baseFontSize * 0.5},
};

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

    let topMargin = Math.max(prevBottom, currentTop) - Config.baseLineHeightMargin;

    return {
        text: '',
        margin: [0, topMargin, 0, 0],
    };
}