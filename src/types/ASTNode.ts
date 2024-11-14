export interface ASTNode {
    type: string;
    attrs?: {
        level?: number;
        id?: string | null;
        isCustomId?: boolean;
        [key: string]: any;
    };
    content?: ASTNode[];
    text?: string;
}
