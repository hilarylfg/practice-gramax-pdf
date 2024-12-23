import { ASTNode } from "../../types/ASTNode.ts";
import { parseASTToPDFContent } from "../utils/parseAST.ts";
import {errorCase} from "./errorCase.ts";

const parseTable = (rows: ASTNode[], parseContent = parseASTToPDFContent) => {
    const tableBody: any[][] = [];
    const occupiedCells: boolean[][] = [];

    rows.forEach((row, rowIndex) => {
        const tableRow: any[] = [];
        occupiedCells[rowIndex] = occupiedCells[rowIndex] || [];
        row.content?.forEach((cell) => {
            if (!cell) {
                return;
            }

            let colIndex = 0;
            while (occupiedCells[rowIndex][colIndex]) {
                colIndex++;
            }

            const isHeader = cell.type === "tableHeader";

            const cellObject: any = {
                stack: parseContent(cell.content || []),
                bold: isHeader,
                margin: [6, 6, 6, 1],
            };

            const colspan = cell.attrs?.colspan || 1;
            const rowspan = cell.attrs?.rowspan || 1;

            if (colspan > 1) cellObject.colSpan = colspan;
            if (rowspan > 1) cellObject.rowSpan = rowspan;

            for (let rowOffset = 0; rowOffset < rowspan; rowOffset++) {
                occupiedCells[rowIndex + rowOffset] = occupiedCells[rowIndex + rowOffset] || [];
                for (let colOffset = 0; colOffset < colspan; colOffset++) {
                    occupiedCells[rowIndex + rowOffset][colIndex + colOffset] = true;
                }
            }
            tableRow[colIndex] = cellObject;
        });

        for (let colIndex = 0; colIndex < occupiedCells[rowIndex].length; colIndex++) {
            if (!tableRow[colIndex]) {
                tableRow[colIndex] = { text: " ", margin: [6, 6, 6, 1] };
            }
        }

        tableBody.push(tableRow);
    });
    return tableBody;
};

export function tableCase(node: ASTNode): any {
    try {
        const content = node.content || [];
        const body = parseTable(content);
        const maxColumns = Math.max(...body.map(row => row.length));
        const normalizedBody = body.map(row => {
            while (row.length < maxColumns) {
                row.push({ text: " ", margin: [6, 6, 6, 1] });
            }
            return row;
        });

        return {
            table: {
                dontBreakRows: true,
                body: normalizedBody,
            },
            layout: {
                hLineWidth: (rowIndex: number, node: any) =>
                    rowIndex === 0 || rowIndex === node.table.body.length ? 0 : 0.1,
                vLineWidth: (colIndex: number, node: any) =>
                    colIndex === 0 || colIndex === node.table.widths.length ? 0 : 0.1,
                hLineColor: () => '#a4a4a4',
                vLineColor: () => '#a4a4a4',
            },
        };
    } catch (error) {
        return errorCase(node);
    }
}