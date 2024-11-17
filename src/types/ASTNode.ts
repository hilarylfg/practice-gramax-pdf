export interface ASTNode {
    type: string;
    attrs?: {
        level?: number;
        id?: string | null;
        isCustomId?: boolean;
        href?: string;
        src?: string;
        width?: number;
        height?: number;
    };
    content?: ASTNode[];
    text?: string;
    marks?: { type: 'strong' | 'em' | 'link' | 'code'; attrs?: { href?: string } }[];
}
