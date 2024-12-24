import {TableBody, TableRow} from "../src/cases/tableCase.ts";
import {ListItemResult} from "../src/cases/listsCase.ts";

export interface CaseText {
    text?: string;
    link?: string;
    color?: string;
    decoration?: 'underline' | 'lineThrough' | 'overline';
    margin?: [number, number, number, number];
    fontSize?: number;
    italics?: boolean;
    bold?: boolean;
    alignment?: 'left' | 'center' | 'right' | 'justify';
}

export interface CaseTableCell {
    margin?: [number, number, number, number];
    fillColor?: string;
    border?: [boolean, boolean, boolean, boolean];
    borderColor?: [string | boolean, string | boolean, string | boolean, string | boolean];
    text?: string;
    fontSize?: number;
    lineHeight?: number;
    font?: string;
    color?: string;
    bold?: boolean;
    stack?: Array<CaseTableCell | CaseTableColumn>;
    columns?: CaseTableColumn[];
    svg?: string;
    width?: number;
    height?: number;
}

interface CaseTable {
    dontBreakRows?: boolean;
    widths?: string[];
    body: CaseTableCell[][] | TableRow[];
}

interface CanvasElement {
    type: 'line' | 'rect' | 'ellipse' | 'polyline' | 'path';
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    lineWidth?: number;
    lineColor?: string;
    fillColor?: string;
    points?: { x: number; y: number }[];
    d?: string;
}

interface BaseCaseResult {
    text?: string | CaseText | CaseText[];
    lineHeight?: number;
    svg?: string;
    width?: number;
    table?: CaseTable;
    canvas?: CanvasElement[];
    columns?: CaseTableColumn[];
    margin?: [number, number, number, number];
    image?: string;
    stack?: BaseCaseResult[];
    alignment?: 'left' | 'center' | 'right' | 'justify';
    ul?: ListItemResult[];
    ol?: ListItemResult[];
    layout?: CustomLayout | 'noBorders' | 'headerLineOnly' | 'lightHorizontalLines';
    fontSize?: number;
    italics?: boolean;
    style?: string;
    font?: string;
    link?: string;
    color?: string;
    decoration?: 'underline' | 'lineThrough' | 'overline';
}

interface CustomLayout {
    hLineWidth?: (rowIndex: number, node: { table: { body: TableBody } }) => number;
    vLineWidth?: (colIndex: number, node: { table: { widths: string[] } }) => number;
    hLineColor?: (rowIndex: number, node: { table: { body: TableBody } }) => string;
    vLineColor?: (colIndex: number, node: { table: { widths: string[] } }) => string;
}

interface CaseTableColumn {
    svg?: string;
    width?: number;
    height?: number;
    text?: string | CaseText[];
    margin?: [number, number, number, number];
    lineHeight?: number;
    bold?: boolean;
    color?: string;
}

export type CaseResult = BaseCaseResult;