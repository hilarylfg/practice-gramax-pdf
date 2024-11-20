import {ASTNode} from "../../types/ASTNode.ts";

export function errorCase(node: ASTNode): any {
    return {
        table: {
            widths: ['*'],
            body: [[{
                fillColor: "#ffebeb",
                stack: [
                    {
                        text: `Error rendering content of type: ${node.type}` || '',
                        style: 'noteTitle',
                        color: '#ff8080',
                        margin: [10, 5, 0, 0],
                    },
                ],
                border: true,
                borderColor: '#ff8080',
            }]],
        },
        margin: [0, 10, 0, 10],
    };
}