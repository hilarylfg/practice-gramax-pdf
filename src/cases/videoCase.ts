import {ASTNode} from "../../types/ASTNode.ts";
import {ContentStack} from "pdfmake/interfaces";
import {errorCase} from "./errorCase.ts";
import {Config} from "../utils/config.ts";

export function videoCase(node: ASTNode): ContentStack {
    if (node.attrs?.path === undefined || node.attrs?.path === "") {
        return errorCase(node) as never;
    }

    return {
        stack: [
            {
                text: 'Video',
                link: node.attrs?.path,
                color: '#007BFF',
                decoration: 'underline',
                fontSize: Config.baseFontSize * 0.75,
                margin: [0, 0, 0, Config.baseFontSize * 0.5],
            },
            {
                text: node.attrs?.title || '',
                margin: [0, -Config.baseFontSize * 0.25, 0, Config.baseFontSize * 0.5],
                fontSize: Config.baseFontSize * 0.625,
                italics: true,
            },
        ],
        alignment: 'center'
    }
}