import {ASTNode} from "../../types/ASTNode.ts";
import {ContentStack} from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";

export function videoCase(node: ASTNode): ContentStack {
    try {
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
                    fontSize: 12,
                    italics: true,
                },
            ],
            alignment: 'center'
        }
    }
    catch (e) {
        return errorCase(node) as never;
    }
}