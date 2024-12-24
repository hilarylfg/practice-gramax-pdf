import {ASTNode} from "../../types/ASTNode.ts";
import {CaseResult} from "../../types/CasesType.ts";

export function videoCase(node: ASTNode): CaseResult {
    return {
        stack: [
            {
                text: 'Video',
                link: node.attrs?.path,
                color: '#007BFF',
                decoration: 'underline',
                margin: [0, 0, 0, 8],
            },
            {
                text: node.attrs?.title || '',
                margin: [0, -4, 0, 8],
                fontSize: 13,
                italics: true,
            },
        ],
        alignment: 'center'
    }
}