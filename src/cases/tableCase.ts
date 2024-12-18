import { ASTNode } from "../../types/ASTNode.ts";
import { parseASTToPDFContent } from "../utils/parseAST.ts";

const parseTable = (rows: ASTNode[], parseContent = parseASTToPDFContent) =>
    rows.map((row) =>
        row.content?.map((cell) => {
            const isHeader = cell.type === "tableHeader";
            return {
                stack: parseContent(cell.content || []),
                bold: isHeader,
                margin: [6, 6, 6, 6],
            };
        }) || []
    );

export function tableCase(node: ASTNode): any {
    const content = node.content || [];
    return {
        table: {
            dontBreakRows: true,
            body: parseTable(content),
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
}