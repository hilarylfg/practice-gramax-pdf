export interface ContentElement {
    elementType: 'heading1' | 'heading2' | 'paragraph' | 'list' | 'code' | 'quote';
    content: string | string[];
}
