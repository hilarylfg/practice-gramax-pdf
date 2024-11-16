export interface ASTNode {
    type: string;
    attrs?: {
        level?: number;
        id?: string | null;
        isCustomId?: boolean;
        href?: string;
    };
    content?: ASTNode[];
    text?: string;
    marks?: { type: 'strong' | 'em' | 'link'; attrs?: { href?: string } }[];
}
