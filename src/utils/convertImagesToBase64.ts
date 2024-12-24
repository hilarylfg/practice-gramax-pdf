import {ASTNode} from "../../types/ASTNode.ts";

export async function convertImagesToBase64(nodes: ASTNode[]): Promise<void> {
    const processImageNode = async (node: ASTNode): Promise<void> => {
        if (node.type === 'image' && node.attrs?.src) {
            try {
                const response = await fetch(node.attrs.src);
                const blob = await response.blob();

                node.attrs.src = await new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.error('Ошибка обработки изображения:', error);
                node.attrs.src = "data:text/html;base64";
            }
        }

        if (node.type === "drawio" && node.attrs?.src) {
            try {
                node.attrs.src = await getFileContent(node.attrs.src);
            } catch (error) {
                console.error(`Ошибка при загрузке SVG: ${error}`);
                node.attrs.src = "data:text/html;base64";
            }
        }

        if (node.content) {
            await Promise.all(node.content.map(processImageNode));
        }
    };

    await Promise.all(nodes.map(processImageNode));
}

async function getFileContent(url: string): Promise<string> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            new Error(`Ошибка: ${response.status}`);
        }
        return await response.text();
    } catch (error) {
        throw new Error(`Ошибка при загрузке файла: ${error}`);
    }
}