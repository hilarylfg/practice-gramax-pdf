import {ASTNode} from "../../types/ASTNode.ts";
import {parseASTToPDFContent} from "../parseAST.ts";

const parseTable = (rows: ASTNode[]) =>
    rows.map((row) => row.content?.map((cell) => ({
        stack: parseASTToPDFContent(cell.content || []),
        style: 'tableCell',
    })) || []);

export function tableCase(node: ASTNode): any {
    const content = node.content || [];
    return {
        table: {
            body: parseTable(content),
        },
        style: 'table',
        layout: {
            hLineWidth: (rowIndex: number, node: any) =>
                rowIndex === 0 || rowIndex === node.table.body.length ? 0 : 1,
            vLineWidth: (colIndex: number, node: any) =>
                colIndex === 0 || colIndex === node.table.widths.length ? 0 : 1,
            hLineColor: () => '#111',
            vLineColor: () => '#111',
        },
    };
}